import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import  { Button, Text } from 'native-base';
import styles from './styles';

const ButtonInfo = (props) => {
  return (
    <View>
      <Button style={styles.buttonInfo} onPress={() => props.onPress()}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </Button>
    </View>
    );
};

ButtonInfo.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default ButtonInfo;
