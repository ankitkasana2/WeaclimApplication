import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

class JammuKashmir extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <HeaderForecast name={"Jammu & Kashmir"}/>
                <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>
                <ScrollView>
                    <View style={{flexDirection:'row', justifyContent:'center',flexWrap:'wrap',marginBottom:20}}>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:386})}>
                                <Text style={styles.text}>Gulmarg</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/gulmarg.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:387})}>
                                <Text style={styles.text}>Jammu City</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/jammu.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:388})}>
                                <Text style={styles.text}>Katra</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/katra.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:389})}>
                                <Text style={styles.text}>Pahalgam</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/pahalgam.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:505})}>
                                <Text style={styles.text}>Srinagar City</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/shrinagar.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
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
                </LinearGradient>

            </View>
        );
    }
}

const styles=StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        padding: 5,
        margin: 5,
        textAlign: 'center',
        alignItems:'center'
    },
    image: {
        width: '100%',
        height: 115,
        borderRadius:5,
        alignItems:'center',        

    }
})

export default JammuKashmir;