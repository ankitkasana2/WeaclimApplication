import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MenuFooterScreen from '../homeScreens/MenuFooterScreen';
import HeaderForecast from './HeaderForecast';
import LinearGradient from 'react-native-linear-gradient';

// const LocationForecast = () => {
class LocationForecast extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Location Forecast'} />
        <ScrollView>
          <LinearGradient
            colors={['#92DFF3', '#fff', '#fc9732']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 15,
                marginRight: 5,
                flexWrap: 'wrap',
                alignContent: 'space-between',
              }}>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AndhraPradesh')
                  }>
                  <Text style={styles.text}>Andhra Pradesh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/andhrapradesh.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ArunachalPradesh')
                  }>
                  <Text style={styles.text}>Arunachal Pradesh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/arunachalpradesh.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AndamanNicobar')
                  }>
                  <Text style={styles.text}>Andaman & Nicobar </Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/andamannicobar.jpg')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Assam')}>
                  <Text style={styles.text}>Assam</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/assam.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Bihar')}>
                  <Text style={styles.text}>Bihar</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/bihar.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Chhatisgarh')}>
                  <Text style={styles.text}>Chhatisgarh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/chhatisgarh.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Chandigarh')}>
                  <Text style={styles.text}>Chandigarh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/chandigarh.jpg')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Delhi')}>
                  <Text style={styles.text}>Delhi NCR</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/delhi.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Gujarat')}>
                  <Text style={styles.text}>Gujarat</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/gujarat.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Goa")} >
                  <Text style={styles.text}>Goa</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/goa.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Haryana')}>
                  <Text style={styles.text}>Haryana</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/haryana.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('HimachalPradesh')
                  }>
                  <Text style={styles.text}>Himachal Pradesh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/himachal.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('JammuKashmir')
                  }>
                  <Text style={styles.text}>Jammu & Kashmir</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/kashmir.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Jharkhand')}>
                  <Text style={styles.text}>Jharkhand</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/jharkhand.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Karnataka')}>
                  <Text style={styles.text}>Karnataka</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/karnataka.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Kerala')}>
                  <Text style={styles.text}>Kerala</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/kerala.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Ladakh')}>
                  <Text style={styles.text}>Ladakh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/ladakh.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Lakshdeep')}>
                  <Text style={styles.text}>Lakhshdeep</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/lakshdeep.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('MadhyaPradesh')
                  }>
                  <Text style={styles.text}>Madhya Pradesh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/madhyapradesh.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Maharashtra')}>
                  <Text style={styles.text}>Maharashtra</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/maharashtra.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Manipur')}>
                  <Text style={styles.text}>Manipur</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/manipur.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Meghalaya')}>
                  <Text style={styles.text}>Meghalaya</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/meghalaya.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Mizoram')}>
                  <Text style={styles.text}>Mizoram</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/mizoram.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Nagaland')}>
                  <Text style={styles.text}>Nagaland</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/nagaland.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Orissa')}>
                  <Text style={styles.text}>Odisha</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/odisha.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 493})
                  }>
                  <Text style={styles.text}>Pondicherry</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/pondicherry.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Punjab')}>
                  <Text style={styles.text}>Punjab</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/punjab.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Rajasthan')}>
                  <Text style={styles.text}>Rajasthan</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/rajasthan.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Sikkim')}>
                  <Text style={styles.text}>Sikkim</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/sikkim.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TamilNadu')}>
                  <Text style={styles.text}>Tamil Nadu</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/tamilnadu.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Talengana')}>
                  <Text style={styles.text}>Telengana</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/talengana.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Tripura')}>
                  <Text style={styles.text}>Tripura</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/tripura.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('UttarPradesh')
                  }>
                  <Text style={styles.text}>Uttar Pradesh</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/up.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('WestBangal')}>
                  <Text style={styles.text}>West Bangal</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/bengal.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Uttarakhand')}>
                  <Text style={styles.text}>Uttarakhand</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/uttarkhand.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity>
                  <Text style={styles.text}>Miscellaneous-1</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/miscellaneous1.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity>
                  <Text style={styles.text}>Miscellaneous-2</Text>
                  {/* <Text style={styles.box}></Text> */}
                  <Image
                    style={styles.image}
                    source={require('../../images/locationforecast/miscellaneous2.jpg')}
                  />
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
          </LinearGradient>
        </ScrollView>
      </View>
    );
    // }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    padding: 6,
    height: 40,
    textAlign: 'center',
  },

  image: {
    width: Platform.OS === 'ios' ? '97%' : '100%',
    height: 110,
    margin: 5,
    borderRadius: 8,
    elevation: 8
  },
  box: {
    width: '100%',
    height: 120,
    backgroundColor: 'blue',
    margin: 5,
  },
});

export default LocationForecast;
