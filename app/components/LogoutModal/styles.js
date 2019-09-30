const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';

export default {
  title: {
    color: '#444444',
    fontFamily: Fonts.RalewayBold,
    fontSize: 16,
    lineHeight: 19,
  },
  date: {
    color: '#6CB83A',
    fontFamily: Fonts.RalewayBold,
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8
  },
  description:{
    color: '#444444',
    fontFamily: Fonts.Raleway,
    fontSize: 16,
    lineHeight: 19,
  },
  cancel: {
    color: '#BBBDBF',
    fontFamily: Fonts.RalewayBold,
    fontSize: 14,
    lineHeight: 16,
    marginRight: 8
  },
  accept:{
    color: '#63CACE',
    fontFamily: Fonts.RalewayBold,
    fontSize: 14,
    lineHeight: 16,
  },
};
