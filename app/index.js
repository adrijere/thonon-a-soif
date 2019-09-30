import React, { Component } from 'react';
import { AlertProvider } from './components/Alert';
import { createRootNavigator } from './routes';
import { ConnectionService } from "./services/ConnectionService";
import { Root } from 'native-base';
import { AsyncStorage, Platform, TouchableOpacity, View, Text } from "react-native";
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import KeyboardManager from 'react-native-keyboard-manager';

export const USER_KEY = "userToken";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
    console.disableYellowBox = true;
  }

  componentDidMount = async () => {
    await AsyncStorage.removeItem('signOut');
    await AsyncStorage.setItem(USER_KEY, 'Bearer ya29.Il-UB0G_CdEDouIl57JhqAXv67Zp-mxxU_6iYGCZWobKPxmOrHhgOXWHYAisAW2I51r4LehCW0jwxVDKFhV1oWwPaNLWTJjdhSWcKn4hDqaqDUwB10T95J5heHTY1q6n9Q');
    this.setState({ signedIn: true, checkedSignIn: true })
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return (
      <Root>
          <AlertProvider>
            <Layout />
          </AlertProvider>
      </Root>
    );
  }
}

export default App;
