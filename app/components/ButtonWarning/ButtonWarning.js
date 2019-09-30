import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import  { Button, Text } from 'native-base';
import styles from './styles';

const ButtonWarning = (props) => {
  return (
    <View>
      <Button style={styles.buttonWarning} onPress={() => props.onPress()}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </Button>
    </View>
    );
};

ButtonWarning.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default ButtonWarning;
