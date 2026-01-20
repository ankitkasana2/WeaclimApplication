import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    {
        id: 614,
        heading: 'Winds & Temperature at 200 hPa',
        src: require('../../../images/aviationeastasia/wind200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 615,
        heading: 'Winds & Temperature at 500 hPa',
        src: require('../../../images/aviationeastasia/wind500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 616,
        heading: 'Winds & Temperature at 700 hPa',
        src: require('../../../images/aviationeastasia/wind700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 617,
        heading: 'Winds & Temperature at 850 hPa',
        src: require('../../../images/aviationeastasia/wind850.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 618,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationeastasia/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 632,
        heading: 'Icing at 300 hPa',
        src: require('../../../images/aviationeastasia/icing300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 634,
        heading: 'Icing at 400 hPa',
        src: require('../../../images/aviationeastasia/icing400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 636,
        heading: 'Icing at 500 hPa',
        src: require('../../../images/aviationeastasia/icing500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 638,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationeastasia/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 640,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationeastasia/icing700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 623,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationeastasia/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 624,
        heading: 'Clear Air Turbulance 250 hPa',
        src: require('../../../images/aviationeastasia/air250.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 625,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationeastasia/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 626,
        heading: 'Clear Air Turbulance 350 hPa',
        src: require('../../../images/aviationeastasia/air350.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 627,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationeastasia/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 628,
        heading: 'Clear Air Turbulance 450 hPa',
        src: require('../../../images/aviationeastasia/air450.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 629,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationeastasia/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 630,
        heading: 'Clear Air Turbulance 550 hPa',
        src: require('../../../images/aviationeastasia/air550.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 631,
        heading: 'Clear Air Turbulance 600 hPa',
        src: require('../../../images/aviationeastasia/air600.png'),
        navigateScreen: 'NewestScreen'
    },




    // {
    //     id: 619,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'EastAsiaAirTirbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'EastAsiaIcing'
    // },


];


class EastAsiaAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'EastAsiaAirTirbulance') {
            this.props.navigation.navigate('EastAsiaAirTirbulance');
        }
        else if (nav === 'EastAsiaIcing') {
            this.props.navigation.navigate('EastAsiaIcing');
        }
        else if (item.id === 614) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 615) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 616) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 617) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 618) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 619) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 632) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 634) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 636) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 638) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 640) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 623) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 624) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 625) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 626) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 627) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 628) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 629) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 630) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 631) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }

    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"EastAsia"} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 618 })}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeastasia/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 638 })}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeastasia/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 640 })}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeastasia/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 623 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeastasia/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 625 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeastasia/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 627 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeastasia/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 629 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeastasia/air500.png')}
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

export default EastAsiaAviationForecast;