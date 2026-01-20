import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// const getAllCategories = (state) => state.getCategories.getAllCategories
//images\africaforecast\%ct%Africa%ch%Clouds24Hr%ti%15NOV2023%pr%40%.png

const data = [
  {
    id: 208,
    heading: 'Rainfall 24hrs',
    src: require('../../../images/africaforecast/africarainfall.png'),

    navigateTo: 'NewestScreen',
  },
  {
    id: 209,
    heading: 'Cloud 24hrs',
    src: require('../../../images/africaforecast/africacloud.jpeg'),

    navigateTo: 'NewestScreen',
  },
  {
    id: 210,
    heading: 'Low Level Convergence',
    src: require('../../../images/africaforecast/africalowlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 211,
    heading: 'Upper Level Divergence',
    src: require('../../../images/africaforecast/africaupperlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 212,
    heading: 'Winds at 200hPa',
    src: require('../../../images/africaforecast/africawind200.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 213,
    heading: 'Winds at 500hPa',
    src: require('../../../images/africaforecast/africawind500.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 214,
    heading: 'Winds at 700hPa',
    src: require('../../../images/africaforecast/africawind700.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 215,
    heading: 'Winds at 850hPa',
    src: require('../../../images/africaforecast/africawind850.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 216,
    heading: 'Mean sea level Pressure',
    src: require('../../../images/africaforecast/measealevel.png'),
    navigateTo: 'NewestScreen',
  },
  // {
  //     id: 217,
  //     heading: 'Maximum Temperature',
  //     src: require('../../../images/africaforecast/maxtemp.png'),
  //     navigateTo: 'NewestScreen'
  // },
  // {
  //     id: 218,
  //     heading: 'Minimum Temperature',
  //     src: require('../../../images/africaforecast/mintemp.png'),
  //     navigateTo: 'NewestScreen'
  // },
];

class AfricaForecastScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Africa'} />
        <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>
        {/* <ImageBackground
              source={require('../../../images/launchScreen.jpg')}
              style={{flex: 1}}> */}

        <ScrollView>
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
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <View style={{}}>
                <View style={styles.textmain}>
                  <Text style={styles.text}>Maximum Temperature</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 217})
                  }>
                  <Image
                    style={styles.image1}

                    source={require('../../../images/africaforecast/maxtemp.jpeg')}

                    // source={require('../../../images/africaforecast/max')}

                  />
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <View style={styles.textmain}>
                  <Text style={styles.text}>Minimum Temperature</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 218})
                  }>
                  <Image
                    style={styles.image1}

//                     source={require('../../../images/africaforecast/mintemp.jpeg')}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View> 
//           </View>

//           <MenuFooterScreen
//             onPressMembership={() =>
//               this.props.navigation.navigate('MembershipScreen')
//             }
//             onPressBlog={() => this.props.navigation.navigate('NewsScreen')}
//             onPressFaq={() => this.props.navigation.navigate('FaqScreen')}
//             onPressAbout={() => this.props.navigation.navigate('AboutScreen')}
//             onPressContact={() =>
//               this.props.navigation.navigate('ContactUsScreen')
//             }
//           />
//         </ScrollView>
//         {/* </ImageBackground> */}
//         </LinearGradient>
//       </View>
//     );
//   }
// }


                    source={require('../../../images/africaforecast/mintemp.png')}
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
    borderRadius:8
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
