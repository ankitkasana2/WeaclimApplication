import React, { Component } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Reproducts_DryBulbTemperature2m from "../../../images/RenewableProducts/WRF_15km/Reproducts_DryBulbTemperature2m.png"
import Reproducts_DewPointTemperature2m from "../../../images/RenewableProducts/WRF_15km/Reproducts_DewPointTemperature2m.png"
import Reproducts_RelativeHumidity2m from "../../../images/RenewableProducts/WRF_15km/Reproducts_RelativeHumidity2m.png"
import Reproducts_MeanSeaLevelPressure from "../../../images/RenewableProducts/WRF_15km/Reproducts_MeanSeaLevelPressure.png"
import Reproducts_Past24hrRainfall from "../../../images/RenewableProducts/WRF_15km/Reproducts_Past24hrRainfall.png"
import Reproducts_WindsTemperature10m from "../../../images/RenewableProducts/WRF_15km/Reproducts_WindsTemperature10m.png"
import Reproducts_WindsTemperatures120m from "../../../images/RenewableProducts/WRF_15km/Reproducts_WindsTemperatures120m.png"
import Reproducts_GlobalHorizontalIrradiance from "../../../images/RenewableProducts/WRF_15km/Reproducts_GlobalHorizontalIrradiance.png"
// const getAllCategories = (state) => state.getCategories.getAllCategories
//images\africaforecast\%ct%Africa%ch%Clouds24Hr%ti%15NOV2023%pr%40%.png

const data = [
    {
        id: 923,
        heading: 'Dry Bulb Temperature at 2m',
        src: Reproducts_DryBulbTemperature2m,
        navigateTo: 'NewestScreen',
    },
    {
        id: 924,
        heading: 'Dew Point Temperature at 2m',
        src: Reproducts_DewPointTemperature2m,
        navigateTo: 'NewestScreen',
    },
    {
        id: 925,
        heading: 'Relative Humidity at 2m',
        src: Reproducts_RelativeHumidity2m,
        navigateTo: 'NewestScreen',
    },
    {
        id: 926,
        heading: 'Mean Sea Level Pressure',
        src: Reproducts_MeanSeaLevelPressure,
        navigateTo: 'NewestScreen',
    },
    {
        id: 927,
        heading: 'Past 24hr Rainfall',
        src: Reproducts_Past24hrRainfall,
        navigateTo: 'NewestScreen',
    },
    {
        id: 928,
        heading: 'Winds & Temperatures at 10m',
        src: Reproducts_WindsTemperature10m,
        navigateTo: 'NewestScreen',
    },
    {
        id: 929,
        heading: 'Winds & Temperatures at 120m',
        src: Reproducts_WindsTemperatures120m,
        navigateTo: 'NewestScreen',
    },
    {
        id: 930,
        heading: 'Global Horizontal Irradiance',
        src: Reproducts_GlobalHorizontalIrradiance,
        navigateTo: 'NewestScreen',
    },
];


class WRF_15kmProductScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderForecast name={'WRF 15km'} />
                <LinearGradient
                    colors={['#fff', '#92DFF3', '#fff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1 }}>
                    {/* <ImageBackground
              source={require('../../../images/launchScreen.jpg')}
              style={{flex: 1}}> */}

                    <ScrollView>
                        <FlatList
                            data={data}
                            numColumns={3}
                            renderItem={({ item }) => {
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
                                        <View style={{ width: '100%' }}>
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
                    {/* </ImageBackground> */}
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
        borderRadius: 8,
        elevation: 8
    },
    image1: {
        width: '85%',
        height: 110,
        marginLeft: 7,
        borderRadius: 8
    },
    box: {
        width: '100%',
        height: 120,
        backgroundColor: 'blue',
        margin: 5,
    },
});

// const styles = StyleSheet.create({
//     textmain: {

//         height: 50,
//         textAlignVertical: 'center'
//     },
//     text: {
//         fontSize: 12,
//         fontWeight: 'bold',
//         color: 'black',
//         padding: 10,
//         height: 50,
//         lineHeight: 50,
//         textAlign: 'center',
//         alignItems: 'center'
//     },
//     text1: {
//         fontSize: 11,
//         fontWeight: 'bold',
//         color: 'black',
//         padding: 10,
//         textAlign: 'center',
//         textAlignVertical: 'center',

//     },
//     image: {
//         width: '100%',
//         height: 110,
//         margin: 5,
//         alignItems: 'center',

//     },
//     box: {
//         width: '100%',
//         height: 120,
//         backgroundColor: 'blue',
//         margin: 5
//     }
// })

export default WRF_15kmProductScreen;
