const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';

export default {
  footer: { justifyContent: 'center', alignItems: 'center', verticalAlign:'center',
    elevation: 2,
    shadowOpacity: .5,
    shadowOffset:{ width: 0, height: 2 },
    backgroundColor: 'white'
  },
  buttonSuccess: {
    margin: 8,
    backgroundColor: '#6CB83A',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.Raleway,
    fontSize: 20,
    lineHeight: 24
  },
  disabledButton: {
    margin: 8,
    backgroundColor: 'grey',
  }
};