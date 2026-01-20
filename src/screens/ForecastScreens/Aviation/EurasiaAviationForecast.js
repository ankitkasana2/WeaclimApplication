import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    {
        id: 641,
        heading: 'Winds & Temperature at 200 hPa',
        src: require('../../../images/aviationeurasia/wind200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 642,
        heading: 'Winds & Temperature at 500 hPa',
        src: require('../../../images/aviationeurasia/wind500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 643,
        heading: 'Winds & Temperature at 700 hPa',
        src: require('../../../images/aviationeurasia/wind700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 644,
        heading: 'Winds & Temperature at 850 hPa',
        src: require('../../../images/aviationeurasia/wind850.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 645,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationeurasia/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 658,
        heading: 'Icing at 300 hPa',
        src: require('../../../images/aviationeurasia/icing300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 660,
        heading: 'Icing at 400 hPa',
        src: require('../../../images/aviationeurasia/icing400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 662,
        heading: 'Icing at 500 hPa',
        src: require('../../../images/aviationeurasia/icing500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 664,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationeurasia/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 666,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationeurasia/icing700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 649,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationeurasia/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 650,
        heading: 'Clear Air Turbulance 250 hPa',
        src: require('../../../images/aviationeurasia/air250.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 651,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationeurasia/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 652,
        heading: 'Clear Air Turbulance 350 hPa',
        src: require('../../../images/aviationeurasia/air350.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 653,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationeurasia/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 654,
        heading: 'Clear Air Turbulance 450 hPa',
        src: require('../../../images/aviationeurasia/air450.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 655,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationeurasia/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 656,
        heading: 'Clear Air Turbulance 550 hPa',
        src: require('../../../images/aviationeurasia/air550.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 657,
        heading: 'Clear Air Turbulance 600 hPa',
        src: require('../../../images/aviationeurasia/air600.png'),
        navigateScreen: 'NewestScreen'
    },





    // {
    //     id: 646,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'EurasiaAirTirbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'EurasiaIcing'
    // },


];


class EurasiaAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'EurasiaAirTirbulance') {
            this.props.navigation.navigate('EurasiaAirTirbulance');
        }
        else if (nav === 'EurasiaIcing') {
            this.props.navigation.navigate('EurasiaIcing');
        }
        else if (item.id === 641) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 642) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 643) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 644) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 645) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 646) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 658) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 660) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 662) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 664) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 666) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 649) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 650) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 651) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 652) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 653) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 654) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 655) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 656) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 657) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }

    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"Eurasia"} />
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
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 645 })}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurasia/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 664 })}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurasia/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 666 })}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurasia/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 649 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurasia/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 651 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurasia/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 653 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurasia/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 655 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurasia/air500.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <MenuFooterScreen
                      onPressMembership={() =>
                        this.props.navigation.navigate('MembershipScreen')
                      }
                        onPressBlog={() => this.props.navigation.navigate("NewsScreen")}
                        onPressFaq={() => this.props.navigation.navigate("FaqScreen")}
                        onPressAbout={() => this.props.navigation.navigate("AboutScreen")}
                        onPressContact={() => this.props.navigation.navigate("ContactUsScreen")}

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
        justifyContent: 'flex-start'
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
        borderRadius:5

    },
    box: {
        width: '100%',
        height: 120,
        backgroundColor: 'blue',
        margin: 5
    }
})

export default EurasiaAviationForecast;