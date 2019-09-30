const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';

export default {
  card: {
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#F4F4F4'
  },
  cardHeader: {
    padding: 100
  },
  icon: {
    marginRight: 5,
    marginTop: 3
  },
  iconCard: {
    marginRight: 5,
  },
  image: {
    width: 50, height: 50
  },
  headerText: {
    color: 'white',
    fontFamily: Fonts.Raleway,
    fontSize: 16,
    lineHeight: 19
  },
  left:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontFamily: Fonts.RalewayBold,
    fontSize: 18,
    lineHeight: 21
  },
  price: {
    color: '#7b453a',
    fontFamily: Fonts.RalewayBold,
    fontSize: 16,
    lineHeight: 19
  },
  info: {
    color: '#787878',
    fontFamily: Fonts.Raleway,
    fontSize: 15,
    lineHeight: 18,
  }
};
