import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    {
        id: 667,
        heading: 'Winds & Temperature at 200 hPa',
        src: require('../../../images/aviationeurope/wind200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 668,
        heading: 'Winds & Temperature at 500 hPa',
        src: require('../../../images/aviationeurope/wind500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 669,
        heading: 'Winds & Temperature at 700 hPa',
        src: require('../../../images/aviationeurope/wind700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 670,
        heading: 'Winds & Temperature at 850 hPa',
        src: require('../../../images/aviationeurope/wind850.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 671,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationeurope/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 684,
        heading: 'Icing at 300 hPa',
        src: require('../../../images/aviationeurope/icing300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 686,
        heading: 'Icing at 400 hPa',
        src: require('../../../images/aviationeurope/icing400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 688,
        heading: 'Icing at 500 hPa',
        src: require('../../../images/aviationeurope/icing500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 690,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationeurope/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 692,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationeurope/icing700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 675,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationeurope/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 676,
        heading: 'Clear Air Turbulance 250 hPa',
        src: require('../../../images/aviationeurope/air250.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 677,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationeurope/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 678,
        heading: 'Clear Air Turbulance 350 hPa',
        src: require('../../../images/aviationeurope/air350.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 679,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationeurope/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 680,
        heading: 'Clear Air Turbulance 450 hPa',
        src: require('../../../images/aviationeurope/air450.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 681,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationeurope/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 682,
        heading: 'Clear Air Turbulance 550 hPa',
        src: require('../../../images/aviationeurope/air550.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 683,
        heading: 'Clear Air Turbulance 600 hPa',
        src: require('../../../images/aviationeurope/air600.png'),
        navigateScreen: 'NewestScreen'
    },










    // {
    //     id: 672,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'EuropeAirTirbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'EuropeIcing'
    // },


];


class EuropeAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'EuropeAirTirbulance') {
            this.props.navigation.navigate('EuropeAirTirbulance');
        }
        else if (nav === 'EuropeIcing') {
            this.props.navigation.navigate('EuropeIcing');
        }
        else if (item.id === 667) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 668) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 669) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 670) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 671) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 672) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 684) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 686) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 688) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 690) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 692) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 675) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 676) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 677) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 678) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 679) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 680) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 681) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 682) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 683) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }

    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"Europe"} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 671 })}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurope/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 690 })}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurope/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 692 })}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurope/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 675 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurope/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 677 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurope/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 679 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurope/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 681 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationeurope/air500.png')}
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

export default EuropeAviationForecast;