import { AsyncStorage } from "react-native";
import BackendRequest from '../utils/backendRequest'
import config from '../config/config';
import OneSignal from 'react-native-onesignal';

export const USER_KEY = "userToken";
export const USER_DECODED_KEY = "user";
export const LULU_ID = "luluId";

export const ConnectionService = {
  /**
   *  Login in the application
   *  @param {string} email
   *  @param {string} password
   *  @return {Promise}
  */
  async login(email, password) {
    const data = {
      email,
      password
    };

    const request = await new BackendRequest({
      method: 'post',
      route: 'lulu/authentication',
      withAuthorization: false,
      withAPIVersionMatching: false,
      data
    })
    await request.initialize()
    const response = await request.exec();
    if (response.token) {
      const jwtDecode = require('jwt-decode');
      const decodedToken = jwtDecode(response.token);
      await AsyncStorage.setItem('name', decodedToken.firstName);
      await AsyncStorage.setItem('gender', decodedToken.gender);
      await AsyncStorage.setItem(USER_KEY, 'Bearer ' + response.token);
      OneSignal.sendTags({user_type: 'lulu', lulu_name: decodedToken.firstName + ' ' + decodedToken.lastName,lulu_id: decodedToken.id});
    }
    return response;
  },

  /**
   *  Reset Password for lulu
   *  @param {array} data (email)
   *  @return {Promise}
  */
  async resetPassword(data) {
    const request = await new BackendRequest({
      method: 'patch',
      route: 'lulu/lulus/password/reset',
      withAuthorization: false,
      withAPIVersionMatching: false,
      data
    })
    await request.initialize()
    const update = await request.exec();

    return update;
  },

  /**
   *  Remove token from the async storage on signOut
   *
  */
  async onSignOut() {
    AsyncStorage.removeItem(USER_KEY);
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('status');
    AsyncStorage.removeItem('gender');
    await AsyncStorage.setItem('signOut', 'true');
  },

  /**
   *  Check if the user is signed in
   *
  */
  isSignedIn() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(USER_KEY)
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  },

  /**
   *  Get information about application (version, name, etc)
   *  @return {Promise}
  */
  async checkUpdate() {
    const request = await new BackendRequest({
      method: 'get',
      route: 'lulu/application',
      withAuthorization: true,
      withAPIVersionMatching: false,
    })
    await request.initialize()
    const data = await request.exec();

    return data;
  }
}
