import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: 244,
    heading: 'Rainfall 24hrs',
    src: require('../../../images/wrf45/rainfall24.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 245,
    heading: 'Cloud 24hrs',
    src: require('../../../images/wrf45/cloud24.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 246,
    heading: 'Low Level Convergence',
    src: require('../../../images/wrf45/lowlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 247,
    heading: 'Upper Level Divergence',
    src: require('../../../images/wrf45/upperlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 248,
    heading: 'Winds at 200hPa',
    src: require('../../../images/wrf45/wind200.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 249,
    heading: 'Winds at 500hPa',
    src: require('../../../images/wrf45/wind500.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 250,
    heading: 'Winds at 700hPa',
    src: require('../../../images/wrf45/wind700.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 251,
    heading: 'Winds at 850hPa',
    src: require('../../../images/wrf45/wind850.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 252,
    heading: 'Mean sea level Pressure',
    src: require('../../../images/wrf45/meansealevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 253,
    heading: 'Maximum Temperature',
    src: require('../../../images/wrf45/maxtemp.png'),
    navigateTo: 'NewestScreen'
  },
  {
    id: 254,
    heading: 'Minimum Temperature',
    src: require('../../../images/wrf45/mintemp.png'),
    navigateTo: 'NewestScreen'
  },
  {
    id: 255,
    heading: 'Renewable Energy Products',
    src: require('../../../images/RenewableProducts/App_Images/RenewableEnergy2.webp'),
    navigateTo: 'RenewableEnergyProducts45km'
  },
];

class WRF45km extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderForecast name={'WRF 45km Short Range Forecast'} />
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
  }
}

// const WRF27km = () => {
// // class WRF27km extends Component {
// //     render() {

//         return (
//             <View style={{ flex: 1 }}>
//                 <HeaderForecast name={"WRF27.0km: Short Range Forecast"} />
//                 <ScrollView>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginTop: 0, marginRight: 5, flexWrap: 'wrap', alignContent: 'space-between' }}>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Rainfall 24hrs</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}

//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Cloud 24hrs</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Low Level Convergence </Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>

//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Upper Level Divergence</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Winds at 200hPa</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Winds at 500hPa</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>

//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Winds at 700hPa</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Winds at 850hPa</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Mean Sea Level Pressure</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Maximum Temperature</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: '33%' }}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text1}>Minimum Temperature</Text>
//                                 <Text style={styles.box}></Text>
//                                 {/* <Image
//                             style={styles.image}
//                             source={require('')}
//                         /> */}
//                             </TouchableOpacity>
//                         </View>

//                     </View>

//                     <MenuFooterScreen />

//                 </ScrollView>

//             </View>
//         );
//     // }
// // }
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
  },
  image1: {
    width: '85%',
    height: 110,
    marginLeft: 7,
    borderRadius: 8,
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
//         height: 50,
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical:'center'
//     },
//     image: {
//         width: '100%',
//         height: 110,
//         margin: 5,
//         alignItems: 'center'
//     },
//     box: {
//         width: '100%',
//         height: 120,
//         backgroundColor: 'blue',
//         margin: 5
//     }
// })

export default WRF45km;
