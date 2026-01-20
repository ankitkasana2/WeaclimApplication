import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function MembershipComponent({
  membershipType,
  price,
  offer,
  offer1,
  offer5,
  offer6,
  onPress1,
  Buy,
}) {
  const [isPressed, setIsPressed] = useState(false);

  // const offerLines = offer6.split('\n');

  const handlePress = () => {
    setIsPressed(!isPressed);
    // if (onPress) {
    //   onPress();
    // }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        elevation: 8,
        height: 'auto',
        width: '95%',
        borderRadius: 12,
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
          backgroundColor: isPressed ? '#c097fc' : '#f5f4f2',
          borderRadius: 12,
          paddingVertical: 20,
        }}>
        <View style={{margin: 10}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: isPressed ? '#f5f4f2' : 'black',
              textTransform: 'uppercase',
            }}>
            {membershipType}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: '90%',
            backgroundColor: isPressed ? '#f5f4f2' : '#c097fc',
            alignSelf: 'flex-end',
            marginTop: 40,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            elevation: 1,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: isPressed ? 'black' : '#f5f4f2',
            }}>{`RS: ${price}`}</Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            width: '90%',
            marginTop: 40,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: isPressed ? '#f5f4f2' : 'black',
              textAlign: 'center',
            }}>
            {/* Map over each line of the offer and render it within a Text component */}
            {offer}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            width: '90%',
            marginTop: 0,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: isPressed ? '#f5f4f2' : 'black',
              textAlign:'center',
              marginBottom: 30
            }}>
            {offer1}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: isPressed ? '#f5f4f2' : 'black',
              textAlign: 'justify',
              marginTop: 15,
            }}>
            {offer5}
          </Text>
        </View>

        <TouchableOpacity onPress={onPress1}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              width: 110,
              backgroundColor: '#f5f4f3',
              marginTop: 40,
              borderRadius: 20,
              borderWidth: isPressed ? 0 : 0.1,
            }}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>{Buy}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
