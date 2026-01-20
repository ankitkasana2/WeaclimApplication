import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderForecast from './HeaderForecast';
import MenuFooterScreen from '../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

class Aviation extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Aviation Products'} />
        <LinearGradient
          colors={['#92DFF3', '#fff', '#fc9732']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 20,
              }}>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AfricaAviationForecast')
                  }>
                  <Text style={styles.text}>Africa</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/Africa_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AustraliaAviationForecast')
                  }>
                  <Text style={styles.text}>Australia</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/Australia_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EastAsiaAviationForecast')
                  }>
                  <Text style={styles.text}>East Asia</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/East_Asia_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EurasiaAviationForecast')
                  }>
                  <Text style={styles.text}>Eurasia</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/Eurasia_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EuropeAviationForecast')
                  }>
                  <Text style={styles.text}>Europe</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/Europe_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('IndiaAviationForecast')
                  }>
                  <Text style={styles.text}>India</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/India_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                      'NorthAmericaAviationForecast',
                    )
                  }>
                  <Text style={styles.text}>North America</Text>
                  <View style={{margin: 5, marginTop: 22}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/North_America_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                      'SouthAmericaAviationForecast',
                    )
                  }>
                  <Text style={styles.text}>South America</Text>
                  <View style={{margin: 5, marginTop: 22}}>
                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/South_America_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('WorldAviationForecast')
                  }>
                  <Text style={styles.text}>World Forecast</Text>

                  {/* <View style={{margin: 5, marginTop: 22}}> */}

                  <View style={{margin: 5}}>

                    <Image
                      style={styles.image}
                      source={require('../../images/globalforecast/World_Map_for_Mob_App.png')}
                    />
                  </View>
                </TouchableOpacity>
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
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    padding: 5,
    margin: 5,
    textAlign: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 115,
    borderRadius: 5,
  },
});

export default Aviation;
