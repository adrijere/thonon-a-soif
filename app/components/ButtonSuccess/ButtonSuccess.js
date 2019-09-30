import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import  { Button, Text } from 'native-base';
import styles from './styles';

const ButtonSuccess = (props) => {
  return (
    <View>
      <Button disabled={props.disabled} style={props.disabled ? styles.disabledButton : styles.buttonSuccess} onPress={() => props.onPress()}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </Button>
    </View>
    );
};

ButtonSuccess.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.boolean
};

export default ButtonSuccess;
