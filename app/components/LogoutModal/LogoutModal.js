import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import  { Button, Text } from 'native-base';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Moment from 'moment/min/moment-with-locales';
import styles from './styles';


const LogoutModal = (props) => {
  return (
    <Dialog
      visible={props.showLogoutModal}
      onTouchOutside={props.closeModal()}
      dialogStyle={{width: '90%', borderRadius: 0, paddingVertical: 16}}
    >
      <DialogContent>
        <Text style={styles.title}>Déconnexion</Text>
        <View style={{marginVertical: 16}}>
          <Text style={styles.description}>Etes-vous sûr de vouloir vous déconnecter ?</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.cancel} onPress={props.closeModal()}>ANNULER</Text>
          <Text style={styles.accept} onPress={props.logout()}>VALIDER</Text>
        </View>
      </DialogContent>
    </Dialog>
    );
};

LogoutModal.propTypes = {
  showLogoutModal: PropTypes.boolean,
  logout: PropTypes.func,
  closeModal: PropTypes.func,
};

export default LogoutModal;
