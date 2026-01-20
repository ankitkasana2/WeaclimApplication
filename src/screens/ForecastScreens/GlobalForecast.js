import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import MenuFooterScreen from '../homeScreens/MenuFooterScreen';
import HeaderForecast from './HeaderForecast';
import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: 138,
    heading: 'Africa',
    src: require('../../images/globalforecast/Africa_Map_for_Mob_App.png'),
    navigateTo: 'AfricaForecastScreen',
  },
  {
    id: 136,
    heading: 'Australia',
    src: require('../../images/globalforecast/Australia_Map_for_Mob_App.png'),
    navigateTo: 'AustraliaForecastScreen',
  },
  {
    id: 135,
    heading: 'East Asia',
    src: require('../../images/globalforecast/East_Asia_Map_for_Mob_App.png'),
    navigateTo: 'EastAsiaForecastScreen',
  },
  {
    id: 137,
    heading: 'Eurasia',
    src: require('../../images/globalforecast/Eurasia_Map_for_Mob_App.png'),
    navigateTo: 'EurasiaForecastScreen',
  },
  {
    id: 139,
    heading: 'Europe',
    src: require('../../images/globalforecast/Europe_Map_for_Mob_App.png'),
    navigateTo: 'EuropeForecastScreen',
  },
  {
    id: 133,
    heading: 'North America',
    src: require('../../images/globalforecast/North_America_Map_for_Mob_App.png'),
    navigateTo: 'NorthAmericaForecastScreen',
  },
  // {
  //     id: 140,
  //     heading: 'South America',
  //     src: require('../../images/globalforecast/South_America_Map_for_Mob_App.png'),
  //     navigateTo: 'SouthAmericaForecastScreen'
  // },
  // {
  //     id: 142,
  //     heading: 'World Forecast',
  //     src: require('../../images/globalforecast/World_Map_for_Mob_App.png'),
  //     navigateTo: 'WorldForecastScreen'
  // },
];

class GlobalForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };
  }

  // componentDidMount() {
  //     this.getIpAddress();
  // }

  // getIpAddress = async () => {
  //     try {
  //         const response = await Axios.get('https://ipinfo.io?token=16c1c0cd3ab39f');
  //         const { city, region, country, loc } = response.data;
  //         const [latitude, longitude] = loc.split(',');

  //         this.setState({
  //             city: city,
  //         })
  //         console.log('City:', city);
  //         console.log('Region:', region);
  //         console.log('Country:', country);
  //         console.log('Latitude:', latitude);
  //         console.log('Longitude:', longitude);
  //         // alert(JSON.stringify(response));

  //         return { city, region, country, latitude, longitude };
  //     } catch (error) {
  //         console.error('Error fetching location:', error.message);

  //     }
  // };

  render() {
    return (
      <LinearGradient
        colors={['#92DFF3', '#fff', '#fc9732']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          {/* <LinearGradient
          colors={['#92DFF3', '#fff', '#92DFF3']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}> */}

          <HeaderForecast name={'Global Forecast'} />
          {/* </LinearGradient> */}
          <ScrollView>
            {/* <LinearGradient
              colors={['#92DFF3', '#fff', '#fc9732']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{flex: 1}}> */}
              {/* <ImageBackground
              source={require('../../images/launchScreen.jpg')}
              style={{flex: 1}}> */}
              <FlatList
                data={data}
                numColumns={3}
                renderItem={({item}) => {
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
                      <View style={{width: '100%'}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(item.navigateTo)
                          }>
                          <Image style={styles.image} source={item.src} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={data.id}
              />
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{margin: 5}}>
                    <View style={styles.textmain}>
                      <Text style={styles.text1}>South America</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate(
                          'SouthAmericaForecastScreen',
                        )
                      }>
                      <Image
                        style={styles.image}
                        source={require('../../images/globalforecast/South_America_Map_for_Mob_App.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{margin: 5}}>
                    <View style={styles.textmain}>
                      <Text style={styles.text1}>World Forecast</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('WorldForecastScreen')
                      }>
                      <Image
                        style={styles.image}
                        source={require('../../images/globalforecast/World_Map_for_Mob_App.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <MenuFooterScreen
                onPressMembership={() =>
                  this.props.navigation.navigate('MembershipScreen')
                }
                onPressBlog={() => this.props.navigation.navigate('NewsScreen')}
                onPressFaq={() => this.props.navigation.navigate('FaqScreen')}
                onPressAbout={() =>
                  this.props.navigation.navigate('AboutScreen')
                }
                onPressContact={() =>
                  this.props.navigation.navigate('ContactUsScreen')
                }
              />
              {/* <Text style={styles.text1}>{this.state.city}</Text> */}
              {/* </ImageBackground> */}
            {/* </LinearGradient> */}
          </ScrollView>
        </View>
       </LinearGradient>
    );
  }
}

// const GlobalForecast = (props) => {
// class GlobalForecast extends Component {
//     render() {

//         return (
//             <View style={{ flex: 1 }}>
//                 <HeaderForecast name={"Global Forecast"} />
//                 <ScrollView>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, marginRight: 5, flexWrap: 'wrap' }}>

//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={() => this.props.navigation.navigate('AfricaForecastScreen')}>
//                                 <Text style={styles.text}>Africa</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/africa2.jpg')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={() => this.props.navigation.navigate('AustraliaForecastScreen')}>
//                                 <Text style={styles.text}>Australia</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/australia2.jpg')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('EastAsiaForecastScreen')}>
//                                 <Text style={styles.text}>East Asia</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/eastasia.jpg')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('EurasiaForecastScreen')}>
//                                 <Text style={styles.text}>Eurasia</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/eurasia2.jpg')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('EuropeForecastScreen')}>
//                                 <Text style={styles.text}>Europe</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/europe.jpg')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('NorthAmericaForecastScreen')}>
//                                 <Text style={styles.text}>North America</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/northamerica3.png')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('SouthAmericaForecastScreen')}>
//                                 <Text style={styles.text}>South America</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/southamerica.jpg')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('WorldForecastScreen')}>
//                                 <Text style={styles.text}>World Forecast</Text>
//                                 <View style={{margin:5}}>
//                                 <Image
//                                     style={styles.image}
//                                     source={require('../../images/globalforecast/worldforecast2.jpg')}
//                                 />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                     </View>
//                     <MenuFooterScreen />
//                 </ScrollView>
//             </View>
//         );

//     }
// }

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
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 8,
    elevation: 8,
  },
  box: {
    width: '100%',
    height: 120,
    backgroundColor: 'blue',
    margin: 5,
  },
});

// const styles = StyleSheet.create({
//     text: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: 'black',
//         padding: 5,
//         margin: 5,
//         textAlign: 'center',
//         alignItems:'center'
//     },
//     image: {
//         width: '100%',
//         height: 115,
//         borderRadius:5,
//         alignItems:'center',

//     }
// })

export default GlobalForecast;
