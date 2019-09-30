const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';


export default {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#67CACE'
  },
  title: {
    marginTop: 80,
    color: '#FFFFFF',
    fontFamily: Fonts.RalewayBold,
    fontSize: 24,
    lineHeight: 29
  },
  buttonSignAuto: {
    color: '#FFFFFF',
    fontFamily: Fonts.Raleway,
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 16
  },
  signAutoBlock: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
