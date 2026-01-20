import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import WebView from 'react-native-webview';
import {width} from '../common/Banner';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: '',
    };
  }
  state = {
    loading: true,
    spinner: true,
    membership: 0,
    productsId: [],
  };

  componentDidMount() {
    this.apiLogin();
  }

  apiLogin = async () => {
    const productsIDS = this.props.navigation.state?.params?.productsIDS;
    if (productsIDS && productsIDS.length > 0) {
      this.setState({
        productsId: productsIDS,
      });
    }
    const SignInValue = await AsyncStorage.getItem('status');
    if (SignInValue !== null) {
      this.setState({
        membership: SignInValue,
      });
    }
  };

  handleNavigationStateChange = navState => {
    if (navState.url.includes('https://weaclimsolutions.com/?ordermessage=')) {
// D
//       this.setState({currentUrl: false});
//     }
//   };

//   // handleNavigationStateChange = (navState) => {
//   //   // Check if the current URL is different from the initial URL
//   //   if (navState.url !== initialUrl) {
//   //     // Reset the width and marginLeft to default values
//   //     this.setState({ currentUrl: false });
//   //   }
//   // };
//   render() {
//     const {width, height} = Dimensions.get('window');
//     const {loading} = this.state;
//     console.log('this.props.navigation.state.params.orderid', this.props.navigation.state.params.orderid);
//     // alert(JSON.stringify(this.state.membership))

//     if (
//       this.state.membership == '1' &&

      this.setState({currentUrl: true});
    }
  };
  render() {
    const {width, height} = Dimensions.get('window');
    const {loading} = this.state;

    
    // alert(JSON.stringify(this.state.membership))

    if (
      this.state.membership == "1" &&

      !this.state.productsId.includes(510970) &&
      !this.state.productsId.includes(510974) &&
      !this.state.productsId.includes(510977)
    ) {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };

      fetch(
        `https://weaclimsolutions.com/?membershiporders=${
          this.props.navigation.state?.params?.orderid
        }`,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log('Ankit', result);
          // this.props.navigation.navigate('OrderDetail', { id: this.props.navigation.state?.params?.orderid });
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle any errors here
        });


      return (
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={styles.text}>
              Thank You Your Order has been Completed!
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              bottom: 10,
              position: 'absolute',
              width: '100%',
            }}>
            {/* <Text style={styles.text}>When your payment is done then click on the close button.</Text> */}

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('OrderDetail', {
                  id: this.props.navigation.state.params.orderid,
                })
              }
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.btnclose}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{backgroundColor: 'white'}}>
            <Text style={styles.text}>
              Once your payment is complete, please click the close button.
            </Text>
          </View>
          <View style={{
            width: width * 0.96,
            height: height * 0.66,
            alignSelf: 'center',
            marginVertical: 0,
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            // borderColor: 'red',
            borderColor: '#e0e0e0',
            }}>
            {loading && (
              <View style={styles.actvityIndicator}>
                <ActivityIndicator size={'small'} color={'#447ef2'} />
              </View>
            )}
            <WebView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor:'red',

                
              }}
              // style={{
              //   flex: 1,
              //   width: this.state.currentUrl ? width : (3 / 2) * width,
              //   marginLeft: this.state.currentUrl ? 0 : -width / 4,
              // }}
              // containerStyle={{width: '100%', flex: 0, height: 1200,justifyContent:'center'}}
              // containerStyle={{padding: this.state.currentUrl ? 40 : 0 }}
              // scalesPageToFit={false}
              // source={{
              //   uri:
              //     'https://2factor.in/v3/?at_category=2factor&at_event_action=spr&service=Free_SMS%2C_Free_Bulk_SMS%2C_Free_SMS_without_registration%2C_Send_Free_SMS_online%2C_free_SMS_to_india%2C_Send_free_SMS_without_registration'
                  
              // }}
              source={{
                uri:
                  'https://weaclimsolutions.com/?hweorders=' +
                  this.props.navigation.state.params.orderid,
              }}
              scrollEnabled={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadStart={() => this.setState({loading: true})}
              onLoadEnd={() => this.setState({loading: false})}
              scalesPageToFit={true}
              onNavigationStateChange={this.handleNavigationStateChange}
              androidHardwareAccelerationDisabled={true}
              originWhitelist={['*']} // Optional: ensure it loads 3rd party content
              startInLoadingState={true}
            />
            <Text style={styles.text2}>
              You can Zoom In and Zoom out this page.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              bottom: 10,
              position: 'absolute',
              width: '100%',
            }}>
            {/* <Text style={styles.text2}>
              You can Zoom In and Zoom out this page.
            </Text>  */}
            <View
              style={{
                backgroundColor: 'white',
                bottom: 10,
                position: 'absolute',
                width: '100%',
              }}>
              
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('OrderDetail', {
                    id: this.props.navigation.state.params.orderid,
                  })
                }
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.btnclose}>CLOSE</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#5d6066',
    margin: 12,
    fontSize: 17,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },

  text2: {
    color: '#5d6066',
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 0,
    textAlign: 'center',
  },
  btnclose: {
    color: 'white',
    backgroundColor: '#4287f5',
    fontWeight: 'bold',
    width: '92%',
    textAlign: 'center',

    // padding: 8,
    // borderRadius: 50,
    // top:-5

    padding: 10,
    borderRadius: 50,
    marginTop: 10,

  },
  actvityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Payment;
