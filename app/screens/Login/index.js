import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, TouchableOpacity, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Text, Toast } from 'native-base';
import ActionButton from 'react-native-action-button';
import Loader from '../../components/Loader';
import { ConnectionService } from '../../services/ConnectionService';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles'

class Login extends Component {
  static propTypes = {
    alertWithType: PropTypes.func,
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      email : '',
      password: '',
      biometryType: null,
      optionalConfigObject:{
        unifiedErrors: false,// use unified error messages (default false)
        passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
      },
      emailSaved: '',
      passwordSaved: '',
      loading: false
    };
  }

  renderIcon = () => {
    return(
      <Icon name="chevron-right" size={30} color="#67CACE" />
    )
  }

  login = async () => {
    console.log("Test");
  }

  render() {
    return (
      <View style={styles.container}>
      {this.state.loading ?
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <Bubbles size={10} color="white" />
        </View>
        :
        <ScrollView>
            <View style={{alignItems: 'flex-end'}}>
              <Text onPress={() => this.props.navigation.navigate('PasswordReset')} style={{color: 'white', marginTop: 30, textAlign: 'right', padding: 8, borderWidth: 1, borderColor: 'white', borderRadius: 4}}> Mot de passe oublié ? </Text>
            </View>
            <Text style={styles.title}> Je me connecte </Text>
            <TextField
              label='Email'
              value={this.state.email}
              keyboardType="email-address"
              textColor="white"
              tintColor="white"
              baseColor="white"
              autoCapitalize="none"
              onChangeText={ (email) => this.setState({ email }) }
              />
              <View>
            <TextField
              label='Mot de passe'
              textColor="white"
              tintColor="white"
              baseColor="white"
              value={this.state.password}
              secureTextEntry = { true }
              autoCapitalize="none"
              onChangeText={ (password) => this.setState({ password }) }
            />
            </View>
            {this.state.biometryType &&
              <TouchableOpacity
                style={styles.signAutoBlock}
                onPress={() => this.clickHandler()}
                underlayColor="#0380BE"
                activeOpacity={1}
              >
              <Icon name={this.state.biometryType === 'FaceID' ? 'face' : 'fingerprint'} size={30} color="white" />
              <Text style={styles.buttonSignAuto}> Connectez-vous avec {this.state.biometryType === 'FaceID' ? 'Face ID': 'votre empreinte'}
              </Text>
            </TouchableOpacity>
            }
          </ScrollView>
      }
      <ActionButton
        buttonColor="white"
        onPress={() => {this.login()}}
        renderIcon={this.renderIcon}>
      </ActionButton>
      </View>
      );
    }

    clickHandler = () => {
      TouchID.isSupported()
        .then(this.authenticate())
        .catch(error => {
          AlertIOS.alert("Cette fonctionnalité n'est pas dipsonible sur votre téléphone");
        });
    }

    authenticate = async () => {
      return TouchID.authenticate()
        .then(async (success) => {
          if (!_.isEmpty(this.state.emailSaved) && !_.isEmpty(this.state.passwordSaved)) {
            this.setState({email: this.state.emailSaved, password: this.state.passwordSaved})
            this.login()
          } else {
            Toast.show({ text: "Vous devez vous connecter au moins une fois, avant de vous servir de cette fonctionalité", buttonText: "Ok", type: 'warning', duration: 4000});
          }
        })
        .catch(error => {
          AlertIOS.alert(error.message);
        });
    }
  }

export default Login;
