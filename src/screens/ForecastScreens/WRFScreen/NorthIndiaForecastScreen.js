import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import { useRoute } from '@react-navigation/native';


// const getAllCategories = (state) => state.getCategories.getAllCategories


const data = [
    {
        id: 256,
        heading: 'Rainfall 24hrs',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 257,
        heading: 'Cloud 24hrs',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 258,
        heading: 'Low Level Convergence',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 259,
        heading: 'Upper Level Divergence',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 260,
        heading: 'Winds at 200hPa',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 261,
        heading: 'Winds at 500hPa',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 262,
        heading: 'Winds at 700hPa',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 263,
        heading: 'Winds at 850hPa',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 264,
        heading: 'Mean sea level Pressure',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 265,
        heading: 'Maximum Temperature',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },
    {
        id: 266,
        heading: 'Minimum Temperature',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateTo: 'NewestScreen'
    },

];


class NorthIndiaForecastScreen extends Component {

    render() {

        return (

            <View style={{ flex: 1 }}>


                <HeaderForecast name={'North India'} />
                <ScrollView>
                    <FlatList
                        data={data}
                        numColumns={3}
                        renderItem={({ item }) => {

                            return (
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flex: 1 / 3, marginHorizontal: 4 }}>

                                    <View style={styles.textmain}>
                                        <Text style={styles.text1}>{item.heading}</Text>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.push(item.navigateTo, { id: item.id })}>
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


                    />

                    <MenuFooterScreen
                      onPressMembership={() =>
                        this.props.navigation.navigate('MembershipScreen')
                      }
                        onPressBlog={() => this.props.navigation.navigate("NewsScreen")}
                        onPressFaq={()=>this.props.navigation.navigate("FaqScreen")} 
                        onPressAbout={()=>this.props.navigation.navigate("AboutScreen")} 
                        onPressContact={()=>this.props.navigation.navigate("ContactUsScreen")}

                    />
                </ScrollView>
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
        justifyContent: 'flex-start'
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

    },
    box: {
        width: '100%',
        height: 120,
        backgroundColor: 'blue',
        margin: 5
    }
})


export default NorthIndiaForecastScreen;