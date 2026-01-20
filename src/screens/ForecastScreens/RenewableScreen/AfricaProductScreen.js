import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RepAfrica_DryBulbTemperature2m from "../../../images/RenewableProducts/Africa/RepAfrica_DryBulbTemperature2m.png"
import RepAfrica_DewPointTemperature2m from "../../../images/RenewableProducts/Africa/RepAfrica_DewPointTemperature2m.png"
import RepAfrica_RelativeHumidity2m from "../../../images/RenewableProducts/Africa/RepAfrica_RelativeHumidity2m.png"
import RepAfrica_MeanSeaLevelPressure from "../../../images/RenewableProducts/Africa/RepAfrica_MeanSeaLevelPressure.png"
import RepAfrica_Past24hrRainfall from "../../../images/RenewableProducts/Africa/RepAfrica_Past24hrRainfall.png"
import RepAfrica_WindsTemperature10m from "../../../images/RenewableProducts/Africa/RepAfrica_WindsTemperature10m.png"
import RepAfrica_WindsTemperatures120m from "../../../images/RenewableProducts/Africa/RepAfrica_WindsTemperatures120m.png"
import RepAfrica_GlobalHorizontalIrradiance from "../../../images/RenewableProducts/Africa/RepAfrica_GlobalHorizontalIrradiance.png"
// const getAllCategories = (state) => state.getCategories.getAllCategories
//images\africaforecast\%ct%Africa%ch%Clouds24Hr%ti%15NOV2023%pr%40%.png

const data = [
  {
    id: 934,
    heading: 'Dry Bulb Temperature at 2m',
    src: RepAfrica_DryBulbTemperature2m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 935,
    heading: 'Dew Point Temperature at 2m',
    src: RepAfrica_DewPointTemperature2m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 936,
    heading: 'Relative Humidity at 2m',
    src: RepAfrica_RelativeHumidity2m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 937,
    heading: 'Mean Sea Level Pressure',
    src: RepAfrica_MeanSeaLevelPressure,
    navigateTo: 'NewestScreen',
  },
  {
    id: 938,
    heading: 'Past 24hr Rainfall',
    src: RepAfrica_Past24hrRainfall,
    navigateTo: 'NewestScreen',
  },
  {
    id: 939,
    heading: 'Winds & Temperatures at 10m',
    src: RepAfrica_WindsTemperature10m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 940,
    heading: 'Winds & Temperatures at 120m',
    src: RepAfrica_WindsTemperatures120m,
    navigateTo: 'NewestScreen',
  },
  {
    id: 941,
    heading: 'Global Horizontal Irradiance',
    src: RepAfrica_GlobalHorizontalIrradiance,
    navigateTo: 'NewestScreen',
  },
];


class AfricaForecastScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderForecast name={'Africa'} />
        <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}>
          {/* <ImageBackground
              source={require('../../../images/launchScreen.jpg')}
              style={{flex: 1}}> */}

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
          {/* </ImageBackground> */}
        </LinearGradient>
      </View>
    );
  }
}

// const ForecastScreen = (props) => {
//     const getOneProduct = async (value) => {
//         props.navigation.navigate('ProductDetails');
//         // this.setState({ spinnerTemp: true })
//         // const formData = new FormData()
//         // formData.append('language_id', '1')
//         // formData.append('products_id', value)
//         // formData.append('currency_code', '1')
//         // const json2 = await postHttp(
//         //   getUrl() + '/api/' + 'getallproducts',
//         //   formData
//         // )
//         // if (json2.success !== '1') {
//         //   this.setState({ spinnerTemp: false })
//         //   this.refs.toast.show(
//         //     json2.message)
//         // } else {
//         //   this.setState({ spinnerTemp: false })
//         //   this.props.navigation.navigate('ProductDetails', {
//         //     objectArray: json2.product_data[0] //
//         //   })
//         // }
//         // this.setState({ spinnerTemp: false })
//     }

//     return (
//         <View style={{ flex: 1 }}>
//             <HeaderForecast
//                 name={'Africa'}
//             />
//             <ScrollView>
//                 <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginRight: 5, flexWrap: 'wrap' }}>
//                     <View style={{ width: '100%', height: 180, flexDirection: 'row' }}>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={() => getOneProduct('1')}>
//                                 <View style={styles.textmain}>

//                                     <Text style={styles.text1}>Rainfall 24hrs</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 {/* console.log(Props.data); */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}

//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>
//                                     <Text style={styles.text1}>Cloud 24hrs</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>
//                                     <Text style={styles.text1}>Low Level Convergence </Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <View style={{ width: '100%', height: 180, flexDirection: 'row' }}>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>

//                                     <Text style={styles.text1}>Upper Level Divergence</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>
//                                     <Text style={styles.text1}>Winds at 200hPa</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>
//                                     <Text style={styles.text1}>Winds at 500hPa</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <View style={{ width: '100%', height: 180, flexDirection: 'row' }}>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>
//                                     <Text style={styles.text1}>Winds at 700hPa</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>
//                                     <Text style={styles.text1}>Winds at 850hPa</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <View style={styles.textmain}>
//                                     <Text style={styles.text1}>Mean Sea Level Pressure</Text>
//                                 </View>
//                                 {/* <Text style={styles.box}></Text> */}
//                                 <Image
//                                     style={styles.image}
//                                     source={require('')}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Maximum Temperature</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                                 style={styles.image}
//                                 source={require('')}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Minimum Temperature</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                                 style={styles.image}
//                                 source={require('')}
//                             />
//                         </TouchableOpacity>
//                     </View>

//                 </View>

//                 <MenuFooterScreen />

//             </ScrollView>

//         </View>
//     );
// }

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
    borderRadius: 8,
    elevation: 8
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

// const styles = StyleSheet.create({
//     textmain: {

//         height: 50,
//         textAlignVertical: 'center'
//     },
//     text: {
//         fontSize: 12,
//         fontWeight: 'bold',
//         color: 'black',
//         padding: 10,
//         height: 50,
//         lineHeight: 50,
//         textAlign: 'center',
//         alignItems: 'center'
//     },
//     text1: {
//         fontSize: 11,
//         fontWeight: 'bold',
//         color: 'black',
//         padding: 10,
//         textAlign: 'center',
//         textAlignVertical: 'center',

//     },
//     image: {
//         width: '100%',
//         height: 110,
//         margin: 5,
//         alignItems: 'center',

//     },
//     box: {
//         width: '100%',
//         height: 120,
//         backgroundColor: 'blue',
//         margin: 5
//     }
// })

export default AfricaForecastScreen;
