import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';
import Reproducts_DryBulbTemperature2m from '../../../images/RenewableProducts/WRF_45km/Reproducts_DryBulbTemperature2m.png';
import Reproducts_DewPointTemperature2m from '../../../images/RenewableProducts/WRF_45km/Reproducts_DewPointTemperature2m.png';
import Reproducts_RelativeHumidity2m from '../../../images/RenewableProducts/WRF_45km/Reproducts_RelativeHumidity2m.png';
import Reproducts_MeanSeaLevelPressure from '../../../images/RenewableProducts/WRF_45km/Reproducts_MeanSeaLevelPressure.png';
import Reproducts_Past24hrRainfall from '../../../images/RenewableProducts/WRF_45km/Reproducts_Past24hrRainfall.png';
import Reproducts_WindsTemperature10m from '../../../images/RenewableProducts/WRF_45km/Reproducts_WindsTemperature10m.png';
import Reproducts_WindsTemperatures120m from '../../../images/RenewableProducts/WRF_45km/Reproducts_WindsTemperatures120m.png';
import Reproducts_GlobalHorizontalIrradiance from '../../../images/RenewableProducts/WRF_45km/Reproducts_GlobalHorizontalIrradiance.png';

const data = [
  {
    id: 256,
    heading: 'Rainfall 24hrs',
    src: require('../../../images/wrf15/rainfall.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 257,
    heading: 'Cloud 24hrs',
    src: require('../../../images/wrf15/cloud24.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 258,
    heading: 'Low Level Convergence',
    src: require('../../../images/wrf15/lowlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 259,
    heading: 'Upper Level Divergence',
    src: require('../../../images/wrf15/upperlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 260,
    heading: 'Winds at 200hPa',
    src: require('../../../images/wrf15/wind200.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 261,
    heading: 'Winds at 500hPa',
    src: require('../../../images/wrf15/wind500.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 262,
    heading: 'Winds at 700hPa',
    src: require('../../../images/wrf15/wind700.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 263,
    heading: 'Winds at 850hPa',
    src: require('../../../images/wrf15/wind850.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 264,
    heading: 'Mean sea level Pressure',
    src: require('../../../images/wrf15/measealevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 265,
    heading: 'Maximum Temperature',
    src: require('../../../images/wrf15/maxtemp.png'),
    navigateTo: 'NewestScreen'
  },
  {
    id: 266,
    heading: 'Minimum Temperature',
    src: require('../../../images/wrf15/mintemp.png'),
    navigateTo: 'NewestScreen'
  },
  {
    id: 267,
    heading: 'Renewable Energy Products',
    src: require('../../../images/RenewableProducts/App_Images/RenewableEnergy2.webp'),
    navigateTo: 'RenewableEnergyProducts15km'
  },
];


// const WRF9km = () => {
class WRF15km extends Component {

  // render() {
  //   return (
  //     <View style={{flex: 1}}>
  //       <HeaderForecast
  //         name={
  //           <Text style={{alignSelf: 'center', textAlign: 'center'}}>
  //             WRF15km: Short Range Forecast
  //           </Text>
  //         }
  //       />
  //       <ScrollView>
  //         <LinearGradient

  render() {


    return (
      <View style={{ flex: 1 }}>
        <HeaderForecast name={"WRF15km: Short Range Forecast"} />
        <ScrollView>
          <LinearGradient

            colors={['#fff', '#92DFF3', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}>

            <FlatList
              data={data}
              numColumns={3}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      flex: 1 / 3,
                      marginHorizontal: 4,
                    }}>
                    <View style={styles.textmain}>
                      <Text style={styles.text1}>{item.heading}</Text>
                    </View>
                    <View style={{ width: '100%' }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push(item.navigateTo, {
                            id: item.id,
                          })
                        }>
                        <Image style={styles.image} source={item.src} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={data.id}
            />

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
        </ScrollView>
      </View>
    );
    // }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 110,
    margin: 5,
    alignItems: 'center',
  },
  textmain: {
    flex: 1,
    maxHeight: 100,
    textAlignVertical: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    textAlign: 'center',
    marginRight: 17,
    textAlignVertical: 'center',
  },
  text1: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 8,
  },
  image1: {
    width: '85%',
    height: 110,
    marginLeft: 7,
    borderRadius: 8,
  },
});

export default WRF15km;

