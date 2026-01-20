import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    {
        id: 745,
        heading: 'Winds & Temperature at 200 hPa',
        src: require('../../../images/aviationSamerica/wind200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 746,
        heading: 'Winds & Temperature at 500 hPa',
        src: require('../../../images/aviationSamerica/wind500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 747,
        heading: 'Winds & Temperature at 700 hPa',
        src: require('../../../images/aviationSamerica/wind700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 748,
        heading: 'Winds & Temperature at 850 hPa',
        src: require('../../../images/aviationSamerica/wind850.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 749,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationSamerica/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 762,
        heading: 'Icing at 300 hPa',
        src: require('../../../images/aviationSamerica/icing300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 764,
        heading: 'Icing at 400 hPa',
        src: require('../../../images/aviationSamerica/icing400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 766,
        heading: 'Icing at 500 hPa',
        src: require('../../../images/aviationSamerica/icing500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 768,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationSamerica/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 770,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationSamerica/icing700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 754,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationSamerica/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 755,
        heading: 'Clear Air Turbulance 250 hPa',
        src: require('../../../images/aviationSamerica/air250.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 756,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationSamerica/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 757,
        heading: 'Clear Air Turbulance 350 hPa',
        src: require('../../../images/aviationSamerica/air350.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 758,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationSamerica/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 759,
        heading: 'Clear Air Turbulance 450 hPa',
        src: require('../../../images/aviationSamerica/air450.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 760,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationSamerica/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 761,
        heading: 'Clear Air Turbulance 550 hPa',
        src: require('../../../images/aviationSamerica/air550.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 762,
        heading: 'Clear Air Turbulance 600 hPa',
        src: require('../../../images/aviationSamerica/air600.png'),
        navigateScreen: 'NewestScreen'
    },





    // {
    //     id: 750,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'SouthAmericaAirTirbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'SouthAmericaIcing'
    // },


];


class SouthAmericaAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'SouthAmericaAirTirbulance') {
            this.props.navigation.navigate('SouthAmericaAirTirbulance');
        }
        else if (nav === 'SouthAmericaIcing') {
            this.props.navigation.navigate('SouthAmericaIcing');
        }
        else if (item.id === 745) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 746) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 747) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 748) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 749) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 750) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 762) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 764) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 766) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 768) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 770) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 754) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 755) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 756) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 757) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 758) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 759) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 760) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 761) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 762) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }

    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"South America"} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 749})}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationSamerica/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 768 })}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationSamerica/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 770 })}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationSamerica/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 754 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationSamerica/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 756 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationSamerica/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 758 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationSamerica/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 760 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationSamerica/air500.png')}
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

export default SouthAmericaAviationForecast;