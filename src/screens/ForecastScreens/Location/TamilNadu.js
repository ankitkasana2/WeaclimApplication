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

class TamilNadu extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'TamilNadu'} />
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
                    this.props.navigation.push('NewestScreen', {id: 443})
                  }>
                  <Text style={styles.text}>Coimbatore</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/coimbator.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 444})
                  }>
                  <Text style={styles.text}>Kanyakumari</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/kanyakumari.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 445})
                  }>
                  <Text style={styles.text}>Kodaikanal</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/koidaikanal.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 446})
                  }>
                  <Text style={styles.text}>Madurai</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/madurai.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 447})
                  }>
                  <Text style={styles.text}>Ooty</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/ooty.jpg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 478})
                  }>
                  <Text style={styles.text}>Tiruchirapalli</Text>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.image}
                      source={require('../../../images/districtimages/tiruchirapalli.jpg')}
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

export default TamilNadu;
