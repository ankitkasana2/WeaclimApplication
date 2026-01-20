import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Home1Screen from '../homeScreens/Home1Screen';

import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';



// const HeaderForecast=(props)=>{
class HeaderForecast extends Component {
  handleImagePress = () => {
    // Use navigation.goBack() to navigate back to the previous screen
    this.props.navigation.goBack();
  };


  render() {
    // return (
    //   <LinearGradient
    //     // colors={['#bbeafc', '#bbeafc', '#bbeafc']}
    //     colors={['#0478ed', '#0478ed', '#0478ed']}
    //     start={{x: 0, y: 0}}
    //     end={{x: 0, y: 1}}>
    //     <View
    //       style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         padding: 10,
    //       }}>
    //       <View
    //         style={{
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           width: '100%',
    //         }}>
    //         <View style={{flexDirection: 'row', marginTop: 8, }}>
    //             <TouchableOpacity onPress={this.handleImagePress}>
    //           <View
    //             style={{flex: 1,
    //               alignSelf: 'center',
    //             }}>
    //               <Image
    //                 style={{height: 15, width: 15, tintColor: 'white'}}
    //                 source={require('../../images/Logo/BackArrow.png')}
    //               />
    //           </View>

        return (
            <LinearGradient
            // colors={['#bbeafc', '#bbeafc', '#bbeafc']}
            colors={['#0478ed', '#0478ed', '#0478ed']}
            
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            >
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                <Text style={styles.text}>{this.props.name}</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home1Screen')}>
                    <Image
                        style={styles.image}
                        source={require('../../images/Logo/AppLogo.png')}
                    />

                </TouchableOpacity>
              <View style={{flex: 1,justifyContent:'center', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={styles.text}>{this.props.name}</Text>
              </View>
            </View>


            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home1Screen')}>
              <Image
                style={styles.image}
                source={require('../../images/Logo/AppLogo.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  } */}

            </LinearGradient>
        );
    }

}
// }
const styles = StyleSheet.create({

//   image: {
//     width: 100,
//     height: 80,
//     borderRadius: 110,
//     resizeMode: 'contain',
//     marginTop: 10,
//   },
//   text: {
//     color: 'white',
//     fontWeight: 'bold',
//     backgroundColor: 'blue',
//     paddingHorizontal: 5,
//     fontSize: 18,
//     alignSelf: 'center',
//     marginRight: 12
//   },
// });

// export default withNavigation(HeaderForecast);

    image: {
        width: 100,
        height: 80,
        borderRadius:110,
        resizeMode: 'contain',
        marginTop: 10,

    },
    text: {
        color: 'white',
        marginTop: 20,
        fontWeight: 'bold',
        backgroundColor: 'blue',
        paddingHorizontal: 5,
        fontSize: 18
    }

})

export default withNavigation(HeaderForecast);

