const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Fonts } from '../../config/fonts';

export default {
  container: {
          alignItems: 'center',
      },
      headerText: {
          color: '#fff8f8',
      },
      screenContainer: {
        paddingTop: 20,
        paddingHorizontal: 12,
        width: '100%',
      },
      gender: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#67CACE'
      },
      name: {
        color: 'white',
        fontFamily: Fonts.RalewayBold,
        fontSize: 24,
        lineHeight: 29,
      },
      status: {
        color: '#9B9B9B',
        fontFamily: Fonts.Raleway,
        fontSize: 14,
        lineHeight: 16,
      },
      screenStyle: {
          marginTop: 2,
          marginVertical: 16,
          flexDirection: 'row',

          alignItems: 'center',
          width: '100%'
      },
      screenTextStyle:{
          fontFamily: Fonts.Raleway,
          fontSize: 20,
          paddingVertical: 8,
          marginLeft: 8,
      },
      selectedTextStyle: {
          fontFamily: Fonts.RalewayBold,
          color: 'black'
      },
      activeBackgroundColor: {
          backgroundColor: '#F8F8F8'
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      drawerHeader: {
        backgroundColor: '#67CACE',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 8,
        paddingVertical: 20,
        paddingHorizontal: 16
      },
      headerBody: {
        marginTop: 20,
        backgroundColor: '#67CACE',
      },
      profilButton: {
        fontFamily: Fonts.Raleway,
        fontSize: 20,
        textDecorationLine: 'underline',
        textAlign: 'left',
        color: 'white',
      },
      drawerImage: {
        height: '100%',
        width: '100%',
      },
      footer: {
        backgroundColor: 'white'
      }
};
