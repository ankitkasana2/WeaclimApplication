import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    {
        id: 693,
        heading: 'Winds & Temperature at 200 hPa',
        src: require('../../../images/aviationindia/wind200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 694,
        heading: 'Winds & Temperature at 500 hPa',
        src: require('../../../images/aviationindia/wind500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 695,
        heading: 'Winds & Temperature at 700 hPa',
        src: require('../../../images/aviationindia/wind700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 696,
        heading: 'Winds & Temperature at 850 hPa',
        src: require('../../../images/aviationindia/wind850.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 697,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationindia/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 710,
        heading: 'Icing at 300 hPa',
        src: require('../../../images/aviationindia/icing300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 712,
        heading: 'Icing at 400 hPa',
        src: require('../../../images/aviationindia/icing400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 714,
        heading: 'Icing at 500 hPa',
        src: require('../../../images/aviationindia/icing500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 716,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationindia/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 718,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationindia/icing700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 701,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationindia/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 702,
        heading: 'Clear Air Turbulance 250 hPa',
        src: require('../../../images/aviationindia/air250.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 703,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationindia/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 704,
        heading: 'Clear Air Turbulance 350 hPa',
        src: require('../../../images/aviationindia/air350.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 705,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationindia/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 706,
        heading: 'Clear Air Turbulance 450 hPa',
        src: require('../../../images/aviationindia/air450.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 707,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationindia/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 708,
        heading: 'Clear Air Turbulance 550 hPa',
        src: require('../../../images/aviationindia/air550.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 709,
        heading: 'Clear Air Turbulance 600 hPa',
        src: require('../../../images/aviationindia/air600.png'),
        navigateScreen: 'NewestScreen'
    },





    // {
    //     id: 698,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'IndiaAirTirbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'IndiaIcing'
    // },


];


class IndiaAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'IndiaAirTirbulance') {
            this.props.navigation.navigate('IndiaAirTirbulance');
        }
        else if (nav === 'IndiaIcing') {
            this.props.navigation.navigate('IndiaIcing');
        }
        else if (item.id === 693) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 694) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 695) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 696) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 697) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 698) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 710) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 712) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 714) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 716) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 718) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 701) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 702) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 703) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 704) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 705) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 706) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 707) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 708) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 709) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }

    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"India"} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 697 })}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationindia/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 716 })}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationindia/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 718 })}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationindia/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 701 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationindia/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 703 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationindia/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 705 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationindia/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 707 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationindia/air500.png')}
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
        borderRadius: 5

    },
    box: {
        width: '100%',
        height: 120,
        backgroundColor: 'blue',
        margin: 5
    }
})

export default IndiaAviationForecast;