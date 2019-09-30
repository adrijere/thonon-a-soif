import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

async function goBack(navigation, goBackPage, refresh) {
  navigation.navigate(goBackPage, {refresh: refresh});
}

const HeaderTop = (props) => {
  return (
      <Header
        containerStyle={styles.container}
        backgroundColor="#112854"
        leftComponent={
          <TouchableOpacity onPress={() => props.goBack && props.goBackPage ? goBack(props.navigation ,props.goBackPage, props.refresh) : props.navigation.openDrawer()} style={{padding: 8}}>
            <Icon name={props.goBack ? 'arrow-left' :'menu'} style={styles.icon} size={25} color="white" />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => props.map ? props.goToMapScreen() : null} style={{padding: 8}}>
            <Icon name={props.map ? 'map' : null} style={styles.icon} size={25} color="white" />
          </TouchableOpacity>
        }
        centerComponent={{ text: props.title, style: styles.centerComponent }}
      />
    );
};

HeaderTop.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object,
  goBack: PropTypes.boolean,
  goToMapScreen: PropTypes.func,
  refresh: PropTypes.boolean,
  map: PropTypes.boolean
};

export default HeaderTop;
