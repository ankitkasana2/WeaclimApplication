import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MenuFooterScreen from '../homeScreens/MenuFooterScreen';
import HeaderForecast from './HeaderForecast';
import LinearGradient from 'react-native-linear-gradient';
import getCategories from '../../redux/reducers/getCategories';
import {appConfigStyle} from '../../common/Theme.style';

const data = [
  {
    id: 138,
    heading: 'Rainfall 24hrs',
    src: require('../../images/indiaforecast/rainfall24.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 136,
    heading: 'Cloud 24hrs',
    src: require('../../images/indiaforecast/cloud24.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 135,
    heading: 'Low Level Convergence',
    src: require('../../images/indiaforecast/lowlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 137,
    heading: 'Upper Level Divergence',
    src: require('../../images/indiaforecast/upperlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 139,
    heading: 'Winds at 200hPa',
    src: require('../../images/indiaforecast/wind200.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 133,
    heading: 'Winds at 500hPa',
    src: require('../../images/indiaforecast/wind500.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 140,
    heading: 'Winds at 700hPa',
    src: require('../../images/indiaforecast/wind700.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 142,
    heading: 'Winds at 850hPa',
    src: require('../../images/indiaforecast/wind850.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 156,
    heading: 'Mean sea level Pressure',
    src: require('../../images/indiaforecast/meansealevel.png'),
    navigateTo: 'NewestScreen',
  },
  // {
  //     id: 303,
  //     heading: 'Maximum Temperature',
  //     src: require('../../images/indiaforecast/maxtemp.png'),
  //     navigateTo: 'NewestScreen'
  // },
  // {
  //     id: 158,
  //     heading: 'Minimum Temperature',
  //     src: require('../../images/indiaforecast/mintemp.png'),
  //     navigateTo: 'NewestScreen'
  // },
];

class IndiaForecast extends Component {
  render() {
    return (
        <LinearGradient
        colors={['#92DFF3', '#87CEEB', '#fff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
    >

        <View style={{flex: 1 }}>
           

            <HeaderForecast name={'India Forecast'} />
         
        <LinearGradient
              //  colors={['#B7E9F7','#fff', '#B7E9F7']}
              colors={['#92DFF3','#fff', '#fc9732']}
               start={{  x: 0,y: 0}} // Top-left corner
               end={{x: 0, y: 1}} // Bottom-right corner
               style={{flex: 1}}>
          <ScrollView>
             
            {/* <ImageBackground
              source={require('../../images/launchScreen.jpg')}
              style={{flex: 1}}> */}
               
                <FlatList
                  // style={{backgroundColor: '#FAF0E6'}}
                  // style={{backgroundColor: linear-gradient(135deg, #87CEEB, #00BFFF);}}
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
            {/* </ImageBackground> */}
             
            {/* <View style={{flex: 1}}> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                //   backgroundColor: '#FAF0E6',
                }}>
                <View>
                  <View style={styles.textmain}>
                    <Text style={styles.text}>Maximum Temperature</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.push('NewestScreen', {id: 303})
                    }>
                    <Image
                      style={styles.image1}

                      source={require('../../images/indiaforecast/maxtemp.png')}

                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.textmain}>
                    <Text style={styles.text}>Minimum Temperature</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.push('NewestScreen', {id: 158})
                    }>
                    <Image
                      style={styles.image1}

                      source={require('../../images/indiaforecast/mintemp.png')}

                    />
                  </TouchableOpacity>
                </View>
              {/* </View> */}
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
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
}

// const IndiaForecast = () => {
//     return (
//         <View style={{ flex: 1 }}>
//             <HeaderForecast name={"India Forecast"}/>
//             <ScrollView>
//                 <View style={{ flexDirection: 'row',justifyContent:'center', marginBottom: 30, marginTop: 0,marginRight:5, flexWrap: 'wrap', alignContent: 'space-between' }}>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Rainfall 24hrs</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}

//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Cloud 24hrs</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Low Level Convergence </Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Upper Level Divergence</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Winds at 200hPa</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Winds at 500hPa</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Winds at 700hPa</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Winds at 850hPa</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Mean Sea Level Pressure</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Maximum Temperature</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ width: '33%' }}>
//                         <TouchableOpacity>
//                             <Text style={styles.text1}>Minimum Temperature</Text>
//                             {/* <Text style={styles.box}></Text> */}
//                             <Image
//                             style={styles.image}
//                             source={require('')}
//                         />
//                         </TouchableOpacity>
//                     </View>

//                 </View>

//                     <MenuFooterScreen />

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
  },
  image: {
    borderRadius: 8,
    width: '100%',
    height: 110,
    elevation: 8,
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

export default IndiaForecast;
