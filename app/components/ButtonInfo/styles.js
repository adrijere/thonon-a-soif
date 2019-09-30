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
  buttonInfo: {
    margin: 8,
    backgroundColor: '#67CACE',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.Raleway,
    fontSize: 20,
    lineHeight: 24
  }
};