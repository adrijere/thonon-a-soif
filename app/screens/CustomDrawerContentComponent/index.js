import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, Image, AsyncStorage, TouchableOpacity, ScrollView, Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, DrawerNavigator, HeaderBackButton, StackViewTransitionConfigs, DrawerItems} from 'react-navigation';
import {Container, Text, Body, Header, Content, Footer} from 'native-base';
import Loader from '../../components/Loader';
import LogoutModal from '../../components/LogoutModal';
import { ConnectionService } from '../../services/ConnectionService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
import _ from 'lodash';
import { Fonts } from '../../config/fonts';
import styles from './styles'

class CustomDrawerContentComponent extends Component {
  static propTypes = {
    alertWithType: PropTypes.func,
    navigation: PropTypes.object,
  }

  static navigationOptions = {
    drawerLabel: 'Mon profil',
  };

  constructor(props) {
    super(props);
  }

  logout = async() => {
    await this.closeModal();
    await ConnectionService.onSignOut();
    this.props.navigation.navigate('Login');
  }


  render(props) {
    return (
        <Container style={{padding:0}}>
          <ScrollView>
            <View style={styles.screenContainer}>
                <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='Home') ? styles.activeBackgroundColor : null]} onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon name='bell-outline' size={22} />
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]}>Accueil</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
          <Footer style={styles.footer}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='logout' style={[styles.lock]} size={22} />
              <Text style={{fontSize: 18,  fontFamily: Fonts.Raleway}} onPress={() => this.showLogoutModal()}> Déconnexion </Text>
            </TouchableOpacity>
          </Footer>
        </Container>
      )
    }
  }

export default CustomDrawerContentComponent;
