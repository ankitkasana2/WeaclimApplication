import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';
import LinearGradient from 'react-native-linear-gradient';

class WestBangal extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <HeaderForecast name={"WestBangal"}/>
                <LinearGradient
          colors={['#fff', '#92DFF3', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{flex: 1}}>
                <ScrollView>
                    <View style={{flexDirection:'row', justifyContent:'center',flexWrap:'wrap',marginBottom:20}}>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:463})}>
                                <Text style={styles.text}>Darjeeling</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/darjeeling.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:464})}>
                                <Text style={styles.text}>Digha</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/digha.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:465})}>
                                <Text style={styles.text}>Jalpaiguri</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/jalpaiguri.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:466})}>
                                <Text style={styles.text}>Sriniketan</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/sriniketan.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:503})}>
                                <Text style={styles.text}>Bagdogra</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/bagdora.jpg')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('NewestScreen',{id:504})}>
                                <Text style={styles.text}>Kolkata</Text>
                                <View style={{margin:5}}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../../images/districtimages/kolkata.jpg')}
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

export default WestBangal;