const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';


export default {
  container: {
    elevation: 2,
    shadowOpacity: .5,
    shadowOffset:{ width: 0, height: 2 },
  },
  centerComponent: {
    color: '#fffff',
    fontSize: 18,
    lineHeight: 21,
    fontFamily: Fonts.Raleway
  }
};
