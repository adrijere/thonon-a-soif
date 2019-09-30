import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Bubbles } from 'react-native-loader';
import call from 'react-native-phone-call'
import styles from './styles';

function showCallButton(client){
  const args = {
    number: client.mobilePhone,
    prompt: false
  }
  return(
    <TouchableOpacity onPress={() => call(args).catch(console.error)} style={styles.button}>
      <Icon name='phone' style={styles.icon} size={30} />
      <Text style={styles.content}>Téléphone</Text>
    </TouchableOpacity>
  )
}

function openSms(number) {
  let url = `sms:${number}`;

  return Linking.openURL(url).catch((err) => console.error('An error occurred', err));
}

function showSmsButton(client){
  return(
    <TouchableOpacity onPress={() => openSms(client.mobilePhone)} style={styles.button}>
      <Icon name='message-processing' style={styles.icon} size={30} />
      <Text style={styles.content}>SMS</Text>
    </TouchableOpacity>
  )
}

function openEmail(email) {
  let url = `mailto:${email}`;

  return Linking.openURL(url).catch((err) => console.error('An error occurred', err));
}

function showEmailButton(client){
  return(
    <TouchableOpacity onPress={() => openEmail(client.email)} style={styles.button}>
      <Icon name='email' style={styles.icon} size={30} />
      <Text style={styles.content}>Email</Text>
    </TouchableOpacity>
  )
}

const ContactButtons = (props) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Contacter le client</Text>
      <View style={styles.container}>
        {showCallButton(props.detail.client.user)}
        {showSmsButton(props.detail.client.user)}
        {showEmailButton(props.detail.client.user)}
      </View>
    </View>
    );
};

ContactButtons.propTypes = {
  detail: PropTypes.object,
};

export default ContactButtons;
