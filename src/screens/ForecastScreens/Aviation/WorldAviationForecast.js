import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    {
        id: 771,
        heading: 'Winds & Temperature at 200 hPa',
        src: require('../../../images/aviationworld/wind200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 772,
        heading: 'Winds & Temperature at 500 hPa',
        src: require('../../../images/aviationworld/wind500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 773,
        heading: 'Winds & Temperature at 700 hPa',
        src: require('../../../images/aviationworld/wind700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 774,
        heading: 'Winds & Temperature at 850 hPa',
        src: require('../../../images/aviationworld/wind850.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 775,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationworld/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 788,
        heading: 'Icing at 300 hPa',
        src: require('../../../images/aviationworld/icing300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 790,
        heading: 'Icing at 400 hPa',
        src: require('../../../images/aviationworld/icing400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 792,
        heading: 'Icing at 500 hPa',
        src: require('../../../images/aviationworld/icing500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 794,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationworld/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 796,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationworld/icing700.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 779,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationworld/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 780,
        heading: 'Clear Air Turbulance 250 hPa',
        src: require('../../../images/aviationworld/air250.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 781,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationworld/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 782,
        heading: 'Clear Air Turbulance 350 hPa',
        src: require('../../../images/aviationworld/air350.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 783,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationworld/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 784,
        heading: 'Clear Air Turbulance 450 hPa',
        src: require('../../../images/aviationworld/air450.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 785,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationworld/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 786,
        heading: 'Clear Air Turbulance 550 hPa',
        src: require('../../../images/aviationworld/air550.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 787,
        heading: 'Clear Air Turbulance 600 hPa',
        src: require('../../../images/aviationworld/air600.png'),
        navigateScreen: 'NewestScreen'
    },






    // {
    //     id: 776,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'WorldAirTirbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'WorldIcing'
    // },


];


class WorldAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'WorldAirTirbulance') {
            this.props.navigation.navigate('WorldAirTirbulance');
        }
        else if (nav === 'WorldIcing') {
            this.props.navigation.navigate('WorldIcing');
        }
        else if (item.id === 771) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 772) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 773) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 774) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 775) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 776) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 788) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 790) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 792) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 794) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 796) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 779) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 780) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 781) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 782) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 783) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 784) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 785) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 786) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 787) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }

    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"World"} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 775 })}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationworld/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 794 })}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationworld/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 796 })}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationworld/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 779 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationworld/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 781 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationworld/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>

                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 783 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationworld/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen', { id: 785 })}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationworld/air500.png')}
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

export default WorldAviationForecast;