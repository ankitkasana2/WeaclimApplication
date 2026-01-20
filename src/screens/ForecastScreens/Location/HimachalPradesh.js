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

class HimachalPradesh extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'HimachalPradesh'} />
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
                    this.props.navigation.push('NewestScreen', {id: 380})
                  }>
                  <Text style={styles.text}>Chamba</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/chamba.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 381})
                  }>
                  <Text style={styles.text}>Dharamshala</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/dharmshala.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 382})
                  }>
                  <Text style={styles.text}>Keylong</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/keylong.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 383})
                  }>
                  <Text style={styles.text}>Kullu</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/kullu.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 384})
                  }>
                  <Text style={styles.text}>Manali</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/manali.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 385})
                  }>
                  <Text style={styles.text}>Shimla City</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/shimla2.jpg')}
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

export default HimachalPradesh;
