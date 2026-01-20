import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// const getAllCategories = (state) => state.getCategories.getAllCategories

const data = [
  {
    id: 184,
    heading: 'Rainfall 24hrs',
    src: require('../../../images/northamerica/rainfall24.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 185,
    heading: 'Cloud 24hrs',

    // src: require('../../../images/northamerica/cloud24.jpeg'),

    src: require('../../../images/northamerica/cloud24.png'),

    navigateTo: 'NewestScreen',
  },
  {
    id: 186,
    heading: 'Low Level Convergence',
    src: require('../../../images/northamerica/lowlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 187,
    heading: 'Upper Level Divergence',
    src: require('../../../images/northamerica/upperlevel.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 188,
    heading: 'Winds at 200hPa',
    src: require('../../../images/northamerica/wind200.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 189,
    heading: 'Winds at 500hPa',
    src: require('../../../images/northamerica/wind500.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 190,
    heading: 'Winds at 700hPa',
    src: require('../../../images/northamerica/wind700.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 191,
    heading: 'Winds at 850hPa',
    src: require('../../../images/northamerica/wind850.png'),
    navigateTo: 'NewestScreen',
  },
  {
    id: 192,
    heading: 'Mean sea level Pressure',
    src: require('../../../images/northamerica/meansealevel.png'),
    navigateTo: 'NewestScreen',
  },
  // {
  //     id: 193,
  //     heading: 'Maximum Temperature',
  //     src: require('../../../images/northamerica/maxtemp.png'),
  //     navigateTo: 'NewestScreen'
  // },
  // {
  //     id: 194,
  //     heading: 'Minimum Temperature',
  //     src: require('../../../images/northamerica/mintemp.png'),
  //     navigateTo: 'NewestScreen'
  // },
];

class NorthAmericaForecastScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <LinearGradient
             colors={['#fff', '#92DFF3', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>

          
        <HeaderForecast name={'North America'} />
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
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <View>
                <View style={styles.textmain}>
                  <Text style={styles.text}>Maximum Temperature</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 193})
                  }>
                  <Image
                    style={styles.image1}

                    // source={require('../../../images/northamerica/maxtemp.jpeg')}

                    source={require('../../../images/northamerica/maxtemp.png')}

                  />
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.textmain}>
                  <Text style={styles.text}>Minimum Temperature</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('NewestScreen', {id: 194})
                  }>
                  <Image
                    style={styles.image1}

                    // source={require('../../../images/northamerica/mintemp.jpeg')}

                    source={require('../../../images/northamerica/mintemp.png')}

                  />
                </TouchableOpacity>
              </View>
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
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    textAlign: 'center',
    marginRight: 17,
    textAlignVertical: 'center',
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
    elevation: 8,
    borderRadius: 8
  },
  image1: {
    width: '85%',
    height: 110,
    marginLeft: 7,
    borderRadius:8
  },
  box: {
    width: '100%',
    height: 120,
    backgroundColor: 'blue',
    margin: 5,
  },
});

export default NorthAmericaForecastScreen;
