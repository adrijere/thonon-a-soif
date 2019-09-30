const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';

export default {
  card: {
    borderRadius: 8,
    justifyContent: 'center',
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#F4F4F4'
  },
  title: {
    color: '#000',
    fontFamily: Fonts.Raleway,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
  },
  image: {
    width: 35, height: 35
  }
};
