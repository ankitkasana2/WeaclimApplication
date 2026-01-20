import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    // {
    //     id: 597,
    //     heading: 'Winds & Temperature at 200 hPa',
    //     src: require('../../../images/aviationafrica/wind200.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 557,
    //     heading: 'Winds & Temperature at 500 hPa',
    //     src: require('../../../images/aviationafrica/wind500.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 558,
    //     heading: 'Winds & Temperature at 700 hPa',
    //     src: require('../../../images/aviationafrica/wind700.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 559,
    //     heading: 'Winds & Temperature at 850 hPa',
    //     src: require('../../../images/aviationafrica/wind850.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    {
        id: 560,
        heading: 'Jet Stream at 200 hPa',
        src: require('../../../images/aviationafrica/jetstream200.png'),
        navigateScreen: 'NewestScreen'
    },
    // {
    //     id: 561,
    //     heading: 'Freezing Level',
    //     src: require('../../../images/indiaforecast/wind500.jpg'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 573,
    //     heading: 'Icing at 300 hPa',
    //     src: require('../../../images/aviationafrica/icing300.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 575,
    //     heading: 'Icing at 400 hPa',
    //     src: require('../../../images/aviationafrica/icing400.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 577,
    //     heading: 'Icing at 500 hPa',
    //     src: require('../../../images/aviationafrica/icing500.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    {
        id: 579,
        heading: 'Icing at 600 hPa',
        src: require('../../../images/aviationafrica/icing600.png'),
        navigateScreen: 'NewestScreen'
    },
    {
        id: 581,
        heading: 'Icing at 700 hPa',
        src: require('../../../images/aviationafrica/icing700.png'),
        navigateScreen: 'NewestScreen'
    },

    {
        id: 564,
        heading: 'Clear Air Turbulance 200 hPa',
        src: require('../../../images/aviationafrica/air200.png'),
        navigateScreen: 'NewestScreen'
    },
    // {
    //     id: 565,
    //     heading: 'Clear Air Turbulance 250 hPa',
    //     src: require('../../../images/aviationafrica/air250.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    {
        id: 566,
        heading: 'Clear Air Turbulance 300 hPa',
        src: require('../../../images/aviationafrica/air300.png'),
        navigateScreen: 'NewestScreen'
    },
    // {
    //     id: 567,
    //     heading: 'Clear Air Turbulance 350 hPa',
    //     src: require('../../../images/aviationafrica/air350.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    {
        id: 568,
        heading: 'Clear Air Turbulance 400 hPa',
        src: require('../../../images/aviationafrica/air400.png'),
        navigateScreen: 'NewestScreen'
    },
    // {
    //     id: 569,
    //     heading: 'Clear Air Turbulance 450 hPa',
    //     src: require('../../../images/aviationafrica/air450.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    {
        id: 570,
        heading: 'Clear Air Turbulance 500 hPa',
        src: require('../../../images/aviationafrica/air500.png'),
        navigateScreen: 'NewestScreen'
    },
    // {
    //     id: 571,
    //     heading: 'Clear Air Turbulance 550 hPa',
    //     src: require('../../../images/aviationafrica/air550.png'),
    //     navigateScreen: 'NewestScreen'
    // },
    // {
    //     id: 572,
    //     heading: 'Clear Air Turbulance 600 hPa',
    //     src: require('../../../images/aviationafrica/air600.png'),
    //     navigateScreen: 'NewestScreen'
    // },





    // {
    //     id: 7,
    //     heading: 'Clear Air Turbulance',
    //     src: require('../../../images/indiaforecast/wind700.jpg'),
    //     navigateTo: 'AfricaAirTurbulance'

    // },
    // {
    //     id: 8,
    //     heading: 'Icing',
    //     src: require('../../../images/indiaforecast/wind850.jpg'),
    //     navigateTo: 'AfricaIcing'
    // },


];


// class AviationForecast extends Component {
//     render() {
//         return (
//             <View style={{flex:1}}>
//                 <HeaderForecast name={"Fly Africa"}/>
//                 <ScrollView>
//                     <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap',marginBottom:20}}>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                     <Text style={styles.text}>Winds & Temperature at 200 hPa</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                     <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                     <Text style={styles.text}>Winds & Temperature at 500 hPa</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                     <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                     <Text style={styles.text}>Winds & Temperature at 700 hPa</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                     <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                     <Text style={styles.text}>Winds & Temperature at 850 hPa</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                     <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                     <Text style={styles.text}>Jet Stream at 200 hPa</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                     <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity>
//                                     <Text style={styles.text}>Freezing Level</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                      <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('AirTurbulance')}>
//                                     <Text style={styles.text}>Clear Air Turbulance</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                     <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width:'33%'}}>
//                             <TouchableOpacity onPress={()=>this.props.navigation.navigate("Icing")}>
//                                     <Text style={styles.text}>Icing</Text>
//                                     {/* <Text style={styles.box}></Text> */}
//                                     <View style={{margin:5}}>
//                                         <Image
//                                         style={styles.image}
//                                         source={require('../../../images/indiaforecast/wind200.jpg')}
//                                         />
//                                     </View>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <MenuFooterScreen/>
//                 </ScrollView>
//             </View>
//         );
//     }
// }

class AfricaAviationForecast extends Component {

    onclick_item(item) {
        let nav = item.navigateTo;
        if (nav === 'AfricaAirTurbulance') {
            this.props.navigation.navigate('AfricaAirTurbulance');
        }
        else if (nav === 'AfricaIcing') {
            this.props.navigation.navigate('AfricaIcing');
        }
        // else if (item.id === 597) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        // else if (item.id === 557) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        // else if (item.id === 558) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        // else if (item.id === 559) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 560) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        // else if (item.id === 561) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        // else if (item.id === 573) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        // else if (item.id === 575) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        // else if (item.id === 577) {
        //     this.props.navigation.push(item.navigateScreen, { id: item.id });
        // }
        else if (item.id === 579) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 581) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 564) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 565) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 566) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 567) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 568) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 569) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 570) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 571) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
        else if (item.id === 572) {
            this.props.navigation.push(item.navigateScreen, { id: item.id });
        }
    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <HeaderForecast name={"Africa"} />
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
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen',{id: 560})}>
                                <Text style={styles.text}>Jet Stream 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationafrica/jetstream200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                        <View style={{ width: "48%", margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen',{id:579})}>
                                <Text style={styles.text}>Icing at 600hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationafrica/icing600.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen',{id:581})}>
                                <Text style={styles.text}>Icing at 700hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationafrica/icing700.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        
                        
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                       
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen',{id:564})}>
                                <Text style={styles.text}>Clear Air Turbulance at 200hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationafrica/air200.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen',{id:566})}>
                                <Text style={styles.text}>Clear Air Turbulance at 300hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationafrica/air300.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5, marginRight: 5 }}>
                       
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen',{id:568})}>
                                <Text style={styles.text}>Clear Air Turbulance at 400hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationafrica/air400.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%', margin: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('NewestScreen',{id:570})}>
                                <Text style={styles.text}>Clear Air Turbulance at 500hPa</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../../images/aviationafrica/air500.png')}
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

// const styles=StyleSheet.create({
//     text: {
//         fontSize: 11,
//         fontWeight: 'bold',
//         color: 'black',
//         padding: 5,
//         margin: 5,       
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical:'center',
//     },

//     box: {
//         width: '100%',
//         height: 120,
//         backgroundColor: 'blue',
//         margin: 5
//     },
//     image: {
//         width: '100%',
//         height: 115,       
//         borderRadius:5,
//     },

// })

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

export default AfricaAviationForecast;