
import React from 'react';
import { Text, View, Image, TouchableOpacity,StyleSheet,FlatList } from 'react-native';




// const nav=()=>{
//     return(
        
//             <Stack.Navigator>
//                 <Stack.Screen name='weather' component={WeatherScreen}/>
//                 <Stack.Screen name='global' component={GlobalForecast} />
//             </Stack.Navigator>
       
//     );
// }

// const Stack=createNativeStackNavigator();

const WeatherScreen = (props) => {

    const image = [
        {
            id: 1,
            name:'Global Forecast',
            src: require('../../images/front/earth.jpg'),
            navigateTo:'GlobalForecast',
            
        },
        {
            id: 2,
            name:'India Forecast',
            src: require('../../images/front/india.jpg'),
            navigateTo:'IndiaForecast',
        },
        {
            id: 3,
            name:'WRF Ver 4.2 Forecast',
            src: require('../../images/front/track.jpeg'),
            navigateTo:'WrfVersion',
        },
        {
            id: 4,
            name:'Location Specific Forecast',
            src: require('../../images/front/map.jpeg'),
            navigateTo:'LocationForecast',
        },
    ];


    return (

        <FlatList
            data={image}
            
            numColumns={2}
            renderItem={({ item }) => {
                return (
                    <View style={{ flex: 1, marginTop: 30}}>

                            <Text style={styles.text}>{item.name}</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate(item.navigateTo) }>

                                <Image
                                    style={{ width: '93%', height: 200,margin:6,borderRadius:5 }}
                                    source={item.src}
                                />
                            </TouchableOpacity>
                            
                     
                    </View>
                )
            }

            }
            keyExtractor={item => item.id}
        />

    );

}

const styles=StyleSheet.create({
    text:{
        fontSize:13,
        textAlign:'left',
        fontWeight:'bold',
        color:'black',
        marginLeft:8,
        marginBottom:5,
        shadowColor:'grey',
        shadowOffset:{
            width:1,
            height:1
        },
        textShadowRadius:50
    }
})
export default WeatherScreen;