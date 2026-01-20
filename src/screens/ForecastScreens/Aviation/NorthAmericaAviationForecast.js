import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    {
        id: 719,
        heading: 'Winds & Temperature at 200 hPa',
        src: require('../../../images/aviationNamerica/wind200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 720,
        heading: 'Winds & Temperature at 500 hPa',
        src: require('../../../images/aviationNamerica/wind500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 721,
        heading: 'Winds & Temperature at 700 hPa',
        src: require('../../../images/aviationNamerica/wind700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 722,
        heading: 'Winds & Temperature at 850 hPa',
        src: require('../../../images/aviationNamerica/wind850.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 723,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationNamerica/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 736,
        heading: 'Icing at 300 hPa',
        src: require('../../../images/aviationNamerica/icing300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 738,
        heading: 'Icing at 400 hPa',
        src: require('../../../images/aviationNamerica/icing400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 740,
        heading: 'Icing at 500 hPa',
        src: require('../../../images/aviationNamerica/icing500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 742,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationNamerica/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 744,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationNamerica/icing700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 727,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationNamerica/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 728,
        heading: 'Clear Air Turbulance 250 hPa',
        src: require('../../../images/aviationNamerica/air250.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 729,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationNamerica/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 730,
        heading: 'Clear Air Turbulance 350 hPa',
        src: require('../../../images/aviationNamerica/air350.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 731,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationNamerica/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 732,
        heading: 'Clear Air Turbulance 450 hPa',
        src: require('../../../images/aviationNamerica/air450.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 733,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationNamerica/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 734,
        heading: 'Clear Air Turbulance 550 hPa',
        src: require('../../../images/aviationNamerica/air550.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 735,
        heading: 'Clear Air Turbulance 600 hPa',
        src: require('../../../images/aviationNamerica/air600.png'),
        navigateScreen: 'NewestScreen'
    },



    // {
    //     id: 724,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'NorthAmericaAirTirbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'NorthAmericaIcing'
    // },


];


class NorthAmericaAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'NorthAmericaAirTirbulance') {
            this.props.navigation.navigate('NorthAmericaAirTirbulance');
        }
        else if (nav === 'NorthAmericaIcing') {
            this.props.navigation.navigate('NorthAmericaIcing');
        }
        else if (item.id === 719) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 720) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 721) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 722) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 723) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 724) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 736) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 738) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 740) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 742) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 744) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 727) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 728) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 729) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 730) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 731) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 732) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 733) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 734) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 735) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"North America"} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 723 })}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationNamerica/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id:742 })}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationNamerica/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 744 })}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationNamerica/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 727 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationNamerica/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 729 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationNamerica/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 731 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationNamerica/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 733 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationNamerica/air500.png')}
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

export default NorthAmericaAviationForecast;