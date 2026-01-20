import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';

const CardPayment = ({ navigation, orderID }) => {
  const [webView, setWebView] = useState(true);
  const [loading, setLoading] = useState(true);

//   const { orderID } = route.params;

  const handleNavigationStateChange = (navState) => {
    // Logic to handle navigation state changes if necessary
    if (navState.url.includes('some-condition')) {
      setWebView(false);
    }
  };

  

  return (
    <View style={{ flex: 1 }}>
      {webView ? (
        <>
          <View style={{ backgroundColor: 'white' }}>
            <Text style={styles.text}>
              Once your payment is complete, please click the close button.
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {loading && (
              <View style={styles.activityIndicator}>
                <ActivityIndicator size={'small'} color={'#447ef2'} />
              </View>
            )}
            <WebView
              style={{ flex: 1 }}
              source={{ uri: `https://weaclimsolutions.com/?membershiporders=${navigation.state?.params?.orderID}`,}}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              scalesPageToFit={true}
              onNavigationStateChange={handleNavigationStateChange}
            />
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.text}>
              You can Zoom In and Zoom out this page.
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderDetail', { id: orderID })
              }
              style={styles.closeButton}>
              <Text style={styles.btnCloseText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#5d6066',
    margin: 12,
    fontSize: 17,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  btnCloseText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#4287f5',
    width: '92%',
    height: 50,
    padding: 10,
    marginVertical: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    backgroundColor: 'white',
    bottom: 10,
    position: 'absolute',
    width: '100%',
  },
});

export default CardPayment;
