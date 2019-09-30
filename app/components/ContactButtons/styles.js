const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';


export default {
  mainContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    color: '#444444',
    fontFamily: Fonts.RalewayBold,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 8
  },
  container: {
    flexDirection: 'row'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 95,
    width: '33%',
    marginRight: 4,
    elevation: 1,
    shadowOpacity: .1,
    shadowOffset:{ width: 0, height: 2},
  },
  icon: {
    color: '#67CACE'
  },
  content: {
    color: '#67CACE',
    fontFamily: Fonts.RalewayBold,
    fontSize: 16,
    lineHeight: 19
  }
}
