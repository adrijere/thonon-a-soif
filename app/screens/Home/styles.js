const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';


export default {
  imageContainer: {
  flex: 1,
  width: '100%',
  },
  stretchBg: {
    marginTop: deviceHeight / 3.4,
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
   },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: Fonts.RalewayBold,
    fontSize: 14,
    borderRadius: 40
  },
  suggestionText: {
    color: '#444444',
    fontFamily: Fonts.Raleway,
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'justify'
  },
  title: {
    color: '#000',
    fontFamily: Fonts.RalewayBold,
    fontSize: 28,
  },
  container: {
    backgroundColor: 'white'
  }
};
