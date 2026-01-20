import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MenuFooterScreen from '../homeScreens/MenuFooterScreen';
import HeaderForecast from './HeaderForecast';
import LinearGradient from 'react-native-linear-gradient';

// const WrfVersion = () => {
class WrfVersion extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
       
          <HeaderForecast name={'WRF Version 4.2'} />
     
          <LinearGradient
          colors={['#92DFF3', '#fff', '#fc9732']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            marginBottom: 20,
            marginRight: 15,
          }}>

          {/* <View style={{width: '90%', margin: 5}}> */}

          <View style={{width: '48%', margin: 5}}>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('WRF45km')}>
              <Text style={styles.text}>
                WRF 45Km Short Range Forecast India
              </Text>
              <Image
                style={styles.image}
                source={require('../../images/wrfforecast/WRF45km_MainPage.png')}
              />
            </TouchableOpacity>
          </View>

          {/* <View style={{width: '90%', margin: 5}}> */}

          <View style={{width: '48%', margin: 5}}>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('WRF15km')}>
              <Text style={styles.text}>
                WRF 15Km Short Range Forecast India
              </Text>
              <Image
                style={styles.image}
                source={require('../../images/wrfforecast/WRF15km_MainPage.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <MenuFooterScreen
          onPressMembership={() =>
            this.props.navigation.navigate('MembershipScreen')
          }
          onPressBlog={() => this.props.navigation.navigate('NewsScreen')}
          onPressFaq={() => this.props.navigation.navigate('FaqScreen')}
          onPressAbout={() => this.props.navigation.navigate('AboutScreen')}
          onPressContact={() =>
            this.props.navigation.navigate('ContactUsScreen')
          }
        />
      </LinearGradient>
      </View>
    );
  }
}
// }

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
    marginLeft: 5,
    textAlign: 'center',
  },
  image: {

    // width: '48%',
    // height: 150,
    // margin: 5,
    // borderRadius:8,
    // alignSelf: 'center'

    width: '100%',
    height: 150,
    margin: 5,
    borderRadius:8

  },
});

export default WrfVersion;
