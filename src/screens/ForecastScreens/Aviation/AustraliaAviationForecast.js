import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: 582,
    heading: 'Winds & Temperature at 200 hPa',
    src: require('../../../images/aviationaustralia/wind200.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 583,
    heading: 'Winds & Temperature at 500 hPa',
    src: require('../../../images/aviationaustralia/wind500.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 584,
    heading: 'Winds & Temperature at 700 hPa',
    src: require('../../../images/aviationaustralia/wind700.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 589,
    heading: 'Winds & Temperature at 850 hPa',
    src: require('../../../images/aviationaustralia/wind850.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 585,
    heading: 'Jet Stream at 200 hPa',
    src: require('../../../images/aviationaustralia/jetstream200.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 606,
    heading: 'Icing at 300 hPa',
    src: require('../../../images/aviationaustralia/icing300.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 608,
    heading: 'Icing at 400 hPa',
    src: require('../../../images/aviationaustralia/icing400.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 610,
    heading: 'Icing at 500 hPa',
    src: require('../../../images/aviationaustralia/icing500.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 611,
    heading: 'Icing at 600 hPa',
    src: require('../../../images/aviationaustralia/icing600.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 613,
    heading: 'Icing at 700 hPa',
    src: require('../../../images/aviationaustralia/icing700.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 590,
    heading: 'Clear Air Turbulance 200 hPa',
    src: require('../../../images/aviationaustralia/air200.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 598,
    heading: 'Clear Air Turbulance 250 hPa',
    src: require('../../../images/aviationaustralia/air250.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 599,
    heading: 'Clear Air Turbulance 300 hPa',
    src: require('../../../images/aviationaustralia/air300.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 600,
    heading: 'Clear Air Turbulance 350 hPa',
    src: require('../../../images/aviationaustralia/air350.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 601,
    heading: 'Clear Air Turbulance 400 hPa',
    src: require('../../../images/aviationaustralia/air400.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 602,
    heading: 'Clear Air Turbulance 450 hPa',
    src: require('../../../images/aviationaustralia/air450.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 603,
    heading: 'Clear Air Turbulance 500 hPa',
    src: require('../../../images/aviationaustralia/air500.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 604,
    heading: 'Clear Air Turbulance 550 hPa',
    src: require('../../../images/aviationaustralia/air550.png'),
    navigateScreen: 'NewestScreen',
  },
  {
    id: 605,
    heading: 'Clear Air Turbulance 600 hPa',
    src: require('../../../images/aviationaustralia/air600.png'),
    navigateScreen: 'NewestScreen',
  },

  // {
  //     id: 586,
  //     heading: 'Freezing Level',
  //     src: require('../../../images/indiaforecast/wind500.jpg'),
  //     navigateScreen: 'NewestScreen'
  // },
  // {
  //     id: 7,
  //     heading: 'Clear Air Turbulance',
  //     src: require('../../../images/indiaforecast/wind700.jpg'),
  //     navigateTo: 'AustraliaAirTirbulance'

  // },
  // {
  //     id: 8,
  //     heading: 'Icing',
  //     src: require('../../../images/indiaforecast/wind850.jpg'),
  //     navigateTo: 'AustraliaIcing'
  // },
];

class AustraliaAviationForecast extends Component {
  onclick_item(item) {
    let nav = item.navigateTo;
    if (nav === 'AustraliaAirTirbulance') {
      this.props.navigation.navigate('AustraliaAirTirbulance');
    } else if (nav === 'AustraliaIcing') {
      this.props.navigation.navigate('AustraliaIcing');
    } else if (item.id === 582) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 583) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 584) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 589) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 585) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 606) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 608) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 610) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 611) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 613) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 590) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 598) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 599) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 600) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 601) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 602) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 603) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 604) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    } else if (item.id === 605) {
      this.props.navigation.push(item.navigateScreen, {id: item.id});
    }

    // else if (item.id === 586) {
    //     this.props.navigation.push(item.navigateScreen, { id: item.id });
    // }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderForecast name={'Australia'} />
        <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>
          <ScrollView>
            {/* <FlatList
                        data={data}
                        numColumns={3}
                        renderItem={({ item }) => {

                            return (
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flex: 1 / 3, marginHorizontal: 4 }}>

                                    <View style={styles.textmain}>
                                        <Text style={styles.text1}>{item.heading}</Text>
                                    </View>
                                    <View style={{ width: '100%' }}>


                                        <TouchableOpacity onPress={() => this.onclick_item(item)}>
                                            <Image
                                                style={styles.image}
                                                source={item.src}
                                            />
                                        </TouchableOpacity>


                                    </View>


                                </View>
                            )

                        }}

                        keyExtractor={data.id}


                    /> */}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                marginRight: 5,
              }}>
              <View style={{width: '48%', margin: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 585})
                  }>
                  <Text style={styles.text}>Jet Stream 200hPa</Text>
                  <Image
                    style={styles.image}
                    source={require('../../../images/aviationaustralia/jetstream200.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                marginRight: 5,
              }}>
              <View style={{width: '48%', margin: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 611})
                  }>
                  <Text style={styles.text}>Icing at 600hPa</Text>
                  <Image
                    style={styles.image}
                    source={require('../../../images/aviationaustralia/icing600.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '48%', margin: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 613})
                  }>
                  <Text style={styles.text}>Icing at 700hPa</Text>
                  <Image
                    style={styles.image}
                    source={require('../../../images/aviationaustralia/icing700.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                marginRight: 5,
              }}>
              <View style={{width: '48%', margin: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 590})
                  }>
                  <Text style={styles.text}>
                    Clear Air Turbulance at 200hPa
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../../../images/aviationaustralia/air200.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '48%', margin: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 599})
                  }>
                  <Text style={styles.text}>
                    Clear Air Turbulance at 300hPa
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../../../images/aviationaustralia/air300.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                marginRight: 5,
              }}>
              <View style={{width: '48%', margin: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 601})
                  }>
                  <Text style={styles.text}>
                    Clear Air Turbulance at 400hPa
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../../../images/aviationaustralia/air400.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '48%', margin: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 603})
                  }>
                  <Text style={styles.text}>
                    Clear Air Turbulance at 500hPa
                  </Text>
                  <Image
                    style={styles.image}
                    source={require('../../../images/aviationaustralia/air500.png')}
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
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

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
    height: 180,
    borderRadius: 5,
  },
  box: {
    width: '100%',
    height: 120,
    backgroundColor: 'blue',
    margin: 5,
  },
});

export default AustraliaAviationForecast;
