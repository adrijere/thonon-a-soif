import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Bubbles } from 'react-native-loader';
import styles from './styles';

const Loader = () => {
  return (
    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
      <Bubbles size={10} color="#112854" />
    </View>
    );
};

export default Loader;
