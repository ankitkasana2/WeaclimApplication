import React, {Component} from 'react';
import {
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

class Rajasthan extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Rajasthan'} />
        <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
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
                    this.props.navigation.push('NewestScreen', {id: 434})
                  }>
                  <Text style={styles.text}>Ajmer</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/ajmer.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 435})
                  }>
                  <Text style={styles.text}>Jaipur</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/jaipur.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 436})
                  }>
                  <Text style={styles.text}>Jaisalmer</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/jaisalmer.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 437})
                  }>
                  <Text style={styles.text}>Jodhpur</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/jodhpur.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 438})
                  }>
                  <Text style={styles.text}>Mountabu</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/mountabu.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 439})
                  }>
                  <Text style={styles.text}>Udaipur</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/udaipur.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 495})
                  }>
                  <Text style={styles.text}>Badmer</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/badmer.jpg')}
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
    alignItems: 'center',
  },
});

export default Rajasthan;
