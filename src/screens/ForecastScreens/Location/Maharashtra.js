import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: 412,
    heading: 'Aurangabad',
    src: require('../../../images/districtimages/aurangabad.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 413,
    heading: 'Mahabaleshwar',
    src: require('../../../images/districtimages/mahabaleshwar.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 414,
    heading: 'Mumbai Santacruz',
    src: require('../../../images/districtimages/santacruz.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 415,
    heading: 'Nagpur Sonegaon Airport',
    src: require('../../../images/districtimages/nagpur.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 416,
    heading: 'Nasik',
    src: require('../../../images/districtimages/nasik.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 417,
    heading: 'Parbhani',
    src: require('../../../images/districtimages/parbhani.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 418,
    heading: 'Pune Shivajinagar',
    src: require('../../../images/districtimages/shivajinagar.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 419,
    heading: 'Sholapur',
    src: require('../../../images/districtimages/sholapur.jpg'),
    navigateTo: 'NewestScreen',
  },
];

class Maharashtra extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Maharashtra'} />
        <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>
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

// class Maharashtra extends Component{
//     render(){
//         return(
//             <View style={{flex:1}}>
//                 <HeaderForecast name={"Maharashtra"}/>
//                 <ScrollView>
//                     <View style={{flexDirection:'row', justifyContent:'center',flexWrap:'wrap',marginBottom:20}}>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Aurangabad</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/aurangabad.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Mahabaleshwar</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/mahabaleshwar.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Mumbai Santacruz</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/santacruz.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Nagpur Sonegaon Airport</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/nagpur.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Nasik</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/nasik.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Parbhani</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/parbhani.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Pune Shivajinagar</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/shivajinagar.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Sholapur</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/sholapur.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                     </View>
//                     <MenuFooterScreen/>
//                 </ScrollView>

//             </View>
//         );
//     }
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
    textAlignVertical: 'center',
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius:8
  },
  box: {
    width: '100%',
    height: 120,
    backgroundColor: 'blue',
    margin: 5,
  },
});

// const styles=StyleSheet.create({
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

export default Maharashtra;
