import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RepSouthAmerica_DryBulbTemperature2m from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_DryBulbTemperature2m.png"
import RepSouthAmerica_DewPointTemperature2m from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_DewPointTemperature2m.png"
import RepSouthAmerica_RelativeHumidity2m from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_RelativeHumidity2m.png"
import RepSouthAmerica_MeanSeaLevelPressure from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_MeanSeaLevelPressure.png"
import RepSouthAmerica_Past24hrRainfall from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_Past24hrRainfall.png"
import RepSouthAmerica_WindsTemperature10m from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_WindsTemperature10m.png"
import RepSouthAmerica_WindsTemperatures120m from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_WindsTemperatures120m.png"
import RepSouthAmerica_GlobalHorizontalIrradiance from "../../../images/RenewableProducts/SouthAmerica/RepSouthAmerica_GlobalHorizontalIrradiance.png"

// const getAllCategories = (state) => state.getCategories.getAllCategories

const data = [
  {
    id: 998,
    heading: 'Dry Bulb Temperature at 2m',
    src: RepSouthAmerica_DryBulbTemperature2m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 999,
    heading: 'Dew Point Temperature at 2m',
    src: RepSouthAmerica_DewPointTemperature2m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 1000,
    heading: 'Relative Humidity at 2m',
    src: RepSouthAmerica_RelativeHumidity2m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 1001,
    heading: 'Mean Sea Level Pressure',
    src: RepSouthAmerica_MeanSeaLevelPressure,
    navigateTo: 'NewestScreen',
  },
  {
    id: 1002,
    heading: 'Past 24hr Rainfall',
    src: RepSouthAmerica_Past24hrRainfall,
    navigateTo: 'NewestScreen',
  },
  {
    id: 1003,
    heading: 'Winds & Temperatures at 10m',
    src: RepSouthAmerica_WindsTemperature10m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 1004,
    heading: 'Winds & Temperatures at 120m',
    src: RepSouthAmerica_WindsTemperatures120m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 1005,
    heading: 'Global Horizontal Irradiance',
    src: RepSouthAmerica_GlobalHorizontalIrradiance,
    navigateTo: 'NewestScreen',
  },
];

class SouthAmericaProductScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}>


          <HeaderForecast name={'South America'} />
          <ScrollView>
            <FlatList
              data={data}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'center' }}
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
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    elevation: 8,
    borderRadius: 8
  },
  image1: {
    width: '85%',
    height: 110,
    marginLeft: 7,
    borderRadius: 8
  },
  box: {
    width: '100%',
    height: 120,
    backgroundColor: 'blue',
    margin: 5,
  },
});

export default SouthAmericaProductScreen;
