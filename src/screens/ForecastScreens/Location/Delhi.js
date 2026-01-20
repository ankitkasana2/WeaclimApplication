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
    id: 370,
    heading: 'New Delhi Safdarjung',
    src: require('../../../images/districtimages/safdarjung.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 483,
    heading: 'IGIAirport',
    src: require('../../../images/districtimages/igiairport.jpg'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 521,
    heading: 'Noida',
    src: require('../../../images/districtimages/noida.jpg'),
    navigateTo: 'NewestScreen',
  },
];

class Delhi extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Delhi'} />
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

// class Delhi extends Component{
//     render(){
//         return(
//             <View style={{flex:1}}>
//                 <HeaderForecast name={"Delhi"}/>
//                 <ScrollView>
//                     <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap',marginBottom:20}}>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text}>New Delhi Safdarjung</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                     style={styles.image}
//                                     source={require('../../../images/districtimages/safdarjung.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text}>IGIAirport</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                     style={styles.image}
//                                     source={require('../../../images/districtimages/igiairport.jpg')}
//                                     />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                 <Text style={styles.text}>Noida</Text>
//                                 <View style={{margin:5}}>
//                                     <Image
//                                     style={styles.image}
//                                     source={require('../../../images/districtimages/noida.jpg')}
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

export default Delhi;
