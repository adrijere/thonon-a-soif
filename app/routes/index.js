/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import { Platform, StatusBar, Easing, Animated, View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, DrawerNavigator, HeaderBackButton, StackViewTransitionConfigs, DrawerItems} from 'react-navigation';
import { ConnectionService } from '../services/ConnectionService';
import { Container, Content, Header, Body, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from '../screens/Login';
import { Fonts } from '../config/fonts';
import CustomDrawerContentComponent from '../screens/CustomDrawerContentComponent'
import Home from '../screens/Home';

export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: () => null,
      }),
  }
}, {
  headerMode: 'screen',
  transitionConfig: () => ({
    transitionSpec: {
          duration: 1000,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps
            const toIndex = index
            const thisSceneIndex = scene.index
            const height = layout.initHeight
            const width = layout.initWidth

            const translateX = position.interpolate({
              inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
              outputRange: [width, 0, 0]
            })

            // Since we want the card to take the same amount of time
            // to animate downwards no matter if it's 3rd on the stack
            // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
            const translateY = position.interpolate({
              inputRange: [0, thisSceneIndex],
              outputRange: [height, 0]
            })

            const slideFromRight = { transform: [{ translateX }] }
            const slideFromBottom = { transform: [{ translateY }] }

            const lastSceneIndex = scenes[scenes.length - 1].index

            // Test whether we're skipping back more than one screen
            // and slide from bottom if true
            if (lastSceneIndex - toIndex > 1) {
              // Do not transoform the screen being navigated to
              if (scene.index === toIndex) return
              // Hide all screens in between
              if (scene.index !== lastSceneIndex) return { opacity: 0 }
              // Slide top screen down
              return slideFromBottom
            }
            // Otherwise slide from right
            return slideFromRight
          },
    }),
});

export const SignedInStack = createStackNavigator ({
  Home: {
    screen: Home,
    drawer: false,
    navigationOptions: ({ navigation }) => ({
      header: () => null,
      drawer: false
      }),
    },
},{
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    }
});


export const SignedIn = DrawerNavigator({
  Home: {
    screen: Home,
    drawer: false,
    navigationOptions: ({ navigation }) => ({
      header: () => null,
      drawer: false
      }),
    }
  },
  {
    initialRouteName: 'Home',
    mode: 'card',
    headerMode: 'none',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }, {
    headerMode: 'screen',
    transitionConfig: () => ({
      transitionSpec: {
            duration: 1000,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
          },
          screenInterpolator: sceneProps => {
              const { position, layout, scene, index, scenes } = sceneProps
              const toIndex = index
              const thisSceneIndex = scene.index
              const height = layout.initHeight
              const width = layout.initWidth

              const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
              })

              // Since we want the card to take the same amount of time
              // to animate downwards no matter if it's 3rd on the stack
              // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
              const translateY = position.interpolate({
                inputRange: [0, thisSceneIndex],
                outputRange: [height, 0]
              })

              const slideFromRight = { transform: [{ translateX }] }
              const slideFromBottom = { transform: [{ translateY }] }

              const lastSceneIndex = scenes[scenes.length - 1].index

              // Test whether we're skipping back more than one screen
              // and slide from bottom if true
              if (lastSceneIndex - toIndex > 1) {
                // Do not transoform the screen being navigated to
                if (scene.index === toIndex) return
                // Hide all screens in between
                if (scene.index !== lastSceneIndex) return { opacity: 0 }
                // Slide top screen down
                return slideFromBottom
              }
              // Otherwise slide from right
              return slideFromRight
            },
      }),
  });


  /* The screens you add to IOS_MODAL_ROUTES will have the modal transition.  */
  const IOS_MODAL_ROUTES = ['OptionsScreen'];

  let dynamicModalTransition = (transitionProps, prevTransitionProps) => {
    const isModal = IOS_MODAL_ROUTES.some(
      screenName =>
        screenName === transitionProps.scene.route.routeName ||
        (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    )
    return StackViewTransitionConfigs.defaultTransitionConfig(
      transitionProps,
      prevTransitionProps,
      isModal
    );
  };

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
