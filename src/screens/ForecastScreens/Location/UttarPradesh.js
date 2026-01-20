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
    id: 452,
    heading: 'Agra',
    src: require('../../../images/districtimages/agra.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 453,
    heading: 'Jhansi',
    src: require('../../../images/districtimages/jhashi.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 454,
    heading: 'Lucknow-Airport',
    src: require('../../../images/districtimages/lucknow.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 455,
    heading: 'Prayagraj',
    src: require('../../../images/districtimages/prayagraj.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 456,
    heading: 'Varanasi',
    src: require('../../../images/districtimages/varanshi.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 499,
    heading: 'Kanpur',
    src: require('../../../images/districtimages/kanpur.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 497,
    heading: 'Gorakhpur',
    src: require('../../../images/districtimages/gorakhpur.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 496,
    heading: 'Bareilly',
    src: require('../../../images/districtimages/bareilly.jpg'),
    navigateTo: 'NewestScreen',
  },
];

class UttarPradesh extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Uttar Pradesh'} />
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

// class UttarPradesh extends Component{
//     render(){
//         return(
//             <View style={{flex:1}}>
//                 <HeaderForecast name={"UttarPradesh"}/>
//                 <ScrollView>
//                     <View style={{flexDirection:'row', justifyContent:'center',flexWrap:'wrap',marginBottom:20}}>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Agra</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/agra.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Jhashi</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/jhashi.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Lucknow-airport</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/lucknow.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Prayagraj</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/prayagraj.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Varanashi</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/varanshi.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Kanpur</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/kanpur.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Gorakhpur</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/gorakhpur.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity >
//                                 <Text style={styles.text}>Bareilly</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                         style={styles.image}
//                                         source={require('../../../images/districtimages/bareilly.jpg')}
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

export default UttarPradesh;
