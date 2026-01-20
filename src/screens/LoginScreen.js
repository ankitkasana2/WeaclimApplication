/* eslint-disable no-useless-escape */
import React, {PureComponent} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Platform,
  ScrollView,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {createSelector} from 'reselect';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
// import { appleAuth } from '@invertase/react-native-apple-authentication'

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';

import Spinner from 'react-native-loading-spinner-overlay';
import FBLoginButton from '../common/FBLoginButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeStyle, {appTextStyle} from '../common/Theme.style';
import Recaptcha from 'react-native-recaptcha-that-works';

import {
  signUp,
  signIn,
  REGISTER_USER,
  SET_SESSION_ID,
} from '../redux/actions/actions';
import {getHttp, postFetchHttp, postHttp} from '../common/WooComFetch';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
class Login extends PureComponent {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false,
      header: null,
    };
  };

  /// /////////////////////////////////////////////////////////
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.language.Login,
    });

    // GoogleSignin.configure({
    //   // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    //   // iosClientId: '930506877678-469k3k9qcobe44ol761hevm4sa65mfqo.apps.googleusercontent.com', // only for iOS
    //   webClientId: themeStyle.webClientIdForGoogleSign, // client ID of type WEB for your server (needed to verify user ID and offline access)
    //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   // hostedDomain: '', // specifies a hosted domain restriction
    //   // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
    //   // accountName: '', // [Android] specifies an account name on the device that should be used
    // });



    /**
     * subscribe to credential updates.This returns a function which can be used to remove the event listener
     * when the component unmounts.
     */

    // if (Platform.OS === 'ios') {
    //   this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
    //     this.fetchAndUpdateCredentialState().catch(error => {
    //       this.setState({ credentialStateForUser: `Error: ${error.code}` })
    //     }
    //     )
    //   })

    //   this.fetchAndUpdateCredentialState()
    //     .then(res => {
    //       this.setState({ credentialStateForUser: res })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       this.setState({ credentialStateForUser: `Error: ${error.code}` })
    //     })
    // }
  }

  componentWillUnmount() {
    /**
     * cleans up event listener
     */
    // if (Platform.OS === 'ios') { this.authCredentialListener() }
  }

  /// //////////////////////////////////////////////////////////
  constructor(props) {
    super(props);
    this.recaptcha = React.createRef();
    this.state = {
      errorMessage: '',
      spinnerTemp: false,
      selectedTab: '1',
      checkBox: false,

      /// ////

      firstNameSignUp: '',
      lastNameSignUp: '',
      userNamesignUp: '',
      userName: '',
      email: '',
      emailSignUp: '',
      passwordSignUp: '',
      confirmPasswordSignUp: '',
      errorMessageSignUp: '',
      emailSignIn: '',
      passwordSignIn: '',
      credentialStateForUser: -1,
    };

    this.authCredentialListener = null;
    this.user = null;
    // if (Platform.OS === 'ios') {
    //   appleAuth.onCredentialRevoked(async () => {
    //   })
    // }
    this.toast = null;
  }

  ///

  onAppleButtonPress = async () => {
    // start a login request
    try {
      // const appleAuthRequestResponse = await appleAuth.performRequest({
      //   requestedOperation: appleAuth.Operation.LOGIN,
      //   requestedScopes: [
      //     appleAuth.Scope.EMAIL,
      //     appleAuth.Scope.FULL_NAME
      //   ]
      // })
      //       {authorizedScopes: Array(0), identityToken: 'eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3M…uiGxyItJbrOq5wwEqCnPSDwPoOAeT3hIdSmbew3UGm48nVbUw', authorizationCode: 'ccdda06767d304986907fb34e2fe1a925.0.srvxy.8dvw-9duSxFjQkGp3Ll6ew', realUserStatus: 2, nonce: 'pdtK3PyKT.bkb.hY5dEX1HJlL2nR9tB8', …}
      // authorizationCode: "ccdda06767d304986907fb34e2fe1a925.0.srvxy.8dvw-9duSxFjQkGp3Ll6ew"
      // authorizedScopes: Array(0)
      // length: 0
      // [[Prototype]]: Array(0)
      // email: "ranafaheem1999@icloud.com"
      // fullName:
      // familyName: "faheem"
      // givenName: "rana"
      // middleName: null
      // namePrefix: null
      // nameSuffix: null
      // nickname: null
      // [[Prototype]]: Object
      // identityToken: "eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoib3JnLnJlYWN0anMubmF0aXZlLmV4YW1wbGUuUk53b29jb21tZXJjZSIsImV4cCI6MTY0NDMyMjA3NCwiaWF0IjoxNjQ0MjM1Njc0LCJzdWIiOiIwMDE1NzguZDQwMWNmZWEzZTcwNDE3ZGI0ZWEzZTI5MTZjN2M5NTYuMTIwNyIsIm5vbmNlIjoiYzVlYjcyNzhjNDAxMzIzMmZmZTY5M2VjNzZkYzMzYTc3Yjc1YmE4Yzk2YjNiOGE5MmY2MDBkZDM5MWRmYWExZCIsImNfaGFzaCI6IlpwWktSQmtjMG04cXBxelNMa3p5QkEiLCJlbWFpbCI6InJhbmFmYWhlZW0xOTk5QGljbG91ZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2NDQyMzU2NzQsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.R0q_pWG09IWJDRGawPr4Z8qNzYp3e-k3lzESODJ38VUGpNebEmqG2D01d_o8f4n7nMuKFqH7KSjNgjz4V8AwHV9TAr8V3xlhXpZByTYm0hBHkC5usVQdhk_-M8KWvjTb-xjnmopI3ztOB8m0kXlWg5BXnwrFzS-V0bHU7Vf09TofrA-BLvxAylmWmtZXyVsvcEVUthCAlGkHM1AeXZGu0c6-5KOehbX929MSHH2fMKkewGc6wFIk5STkcxUeOPfJtwN3W7N7-v7cve8r9eFoVAOd0qqxUgrUpcToFuiGxyItJbrOq5wwEqCnPSDwPoOAeT3hIdSmbew3UGm48nVbUw"
      // nonce: "pdtK3PyKT.bkb.hY5dEX1HJlL2nR9tB8"
      // realUserStatus: 2
      // state: null
      // user: "001578.d401cfea3e70417db4ea3e2916c7c956.1207"
      // [[Prototype]]: Object

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      this.user = newUser;

      this.fetchAndUpdateCredentialState()
        .then(res => {
          this.setState({credentialStateForUser: res});
        })
        .catch(error => {
          console.log(error);
          this.setState({credentialStateForUser: `Error: ${error.code}`});
        });

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      } else {
        // no token - failed sign-in?
      }

      // if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
      //   console.log("I'm a real person!")
      // }
    } catch (error) {
      // if (error.code === appleAuth.Error.CANCELED) {
      //   console.warn('User canceled Apple Sign in.')
      // } else {
      //   console.error(error)
      // }
    }
  };

  // fetchAndUpdateCredentialState = async () => {
  //   if (this.user === null) {
  //     this.setState({ credentialStateForUser: 'N/A' })
  //   } else {
  //     const credentialState = await appleAuth.getCredentialStateForUser(this.user)
  //     if (credentialState === appleAuth.State.AUTHORIZED) {
  //       this.setState({ credentialStateForUser: 'AUTHORIZED' })
  //     } else {
  //       this.setState({ credentialStateForUser: credentialState })
  //     }
  //   }
  // }

  //  onAppleButtonPress = async () => {
  //    // performs login request
  //    const appleAuthRequestResponse = await appleAuth.performRequest({
  //      requestedOperation: appleAuth.Operation.LOGIN,
  //      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
  //    })

  //    // get current authentication state for user
  //    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  //    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

  //    // use credentialState response to ensure the user is authenticated
  //    if (credentialState === appleAuth.State.AUTHORIZED) {

  //      const {
  //       user: newUser,
  //       email,
  //       nonce,
  //       identityToken,
  //       realUserStatus /* etc */,
  //     } = appleAuthRequestResponse;
  //      // user is authenticated
  //    }
  //  }

  // Somewhere in your code
  signInFun = () => {
    this.setState(
      {
        spinnerTemp: true,
      },
      () => {
        this.props.signInCall(
          this.state.emailSignIn,
          this.state.passwordSignIn,
          this.props.sessionId,
          this,
        );
      },
    );
  };

  //

  // Somewhere in your code

  // signInGoogle = async () => {
  //   // try {
  //   await GoogleSignin.hasPlayServices();
  //   const userInfo = await GoogleSignin.signIn();
  //   //     if (userInfo.user !== undefined) {


  //   //       // const data2 = await postFetchHttp(themeStyle.url + '/wp-json/api/tc_user/googleregistration/',  userInfo.user)

  //   //       const data2 = await postHttp('googleregistration/',
  //   //         userInfo.user
  //   //       )
  //   //     this.setState({ SpinnerTemp: true }, () => {
  //   //       if (data2.data !== undefined) {
  //   //         if (data2.data.data[0] !== undefined) {
  //   //           this.getUserData(data2.data.data[0], 'fb', this)
  //   //         } else {
  //   //           this.setState({ SpinnerTemp: false })
  //   //         }
  //   //       } else {
  //   //         this.setState({ SpinnerTemp: false })
  //   //       }
  //   //     })
  //   //       }
  //   //     } catch (error) {
  //   //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //   //         // user cancelled the login flow
  //   //       } else if (error.code === statusCodes.IN_PROGRESS) {
  //   //         // operation (e.g. sign in) is in progress already
  //   //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //   //         // play services not available or outdated
  //   //       } else {
  //   //         // some other error happened
  //   //       }
  //   //     }
  // };

  signInFB = async (a, s, d) => {
    var dat = {};

    let url = '';
    if (s === 'fb') {
      url = themeStyle.url + '/wp-json/api/tc_user/fb_connect';
      dat.access_token = a;
    }
    if (a !== undefined) {
      const data2 = await postFetchHttp(url, dat);
      const data = await getHttp('customers/' + data2.data.id, {
        lang: this.props.currencyCode,
        currency: this.props.languageCode,
      });
      this.setState({
        spinnerTemp: false,
        emailSignIn: '',
        passwordSignIn: '',
        firstNameSignUp: '',
        lastNameSignUp: '',
        emailSignUp: '',
        passwordSignUp: '',
        confirmPasswordSignUp: '',
      });

      this.props.registerUser(data.data, this);
    } else {
      this.setState({
        spinnerTemp: false,
      });
      this.toast.show(this.props.language.EmailandPasswordareWrong);
    }
  };

  /// ///////////////////////////////////////////////////
  createAccountSignUp() {
    this.setState(
      {
        spinnerTemp: true,
      },
      () => {
        this.props.signUpCall(
          this.state.firstNameSignUp,
          this.state.lastNameSignUp,
          this.state.userName,
          this.state.emailSignUp,
          this.state.passwordSignUp,
          this.state.confirmPasswordSignUp,
          this,
          this.props.sessionId,
        );
      },
    );
  }

  /// /////////////////////////////////////

  canBeSubmitted() {
    const {
      lastNameSignUp,
      firstNameSignUp,
      confirmPasswordSignUp,
      emailSignUp,
      passwordSignUp,
      userName,
    } = this.state;
    return (
      lastNameSignUp.length > 0 &&
      firstNameSignUp.length > 0 &&
      userName.length > 0 &&
      this.EmailNumberCheckSignUp(emailSignUp) &&
      passwordSignUp.length >= 6 &&
      confirmPasswordSignUp === passwordSignUp
    );
  }

  canBeSubmittedSignIn() {
    const {emailSignIn, passwordSignIn} = this.state;
    return (
      emailSignIn.length > 0 &&
      passwordSignIn.length >= 6 &&
      this.EmailNumberCheckSignUp(emailSignIn)
    );
  }

  EmailNumberCheckSignUp2(text) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return text.length === 0 || reg.test(text) === true;
  }

  EmailNumberCheckSignUp(text) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text) === true;
  }

  passLength(text) {
    return text.length >= 6 || text.length === 0;
  }

  confirmPassword() {
    const {confirmPasswordSignUp, passwordSignUp} = this.state;
    return (
      confirmPasswordSignUp === passwordSignUp ||
      confirmPasswordSignUp.length === 0
    );
  }

  send = () => {
    console.log('send!');
    if (this.recaptcha && this.recaptcha.current) {
      this.recaptcha.current.open();
    } else {
      console.error('ReCAPTCHA ref not initialized or null.');
    }
  };
  send2 = () => {
    console.log('send!');
    if (this.recaptcha && this.recaptcha.current) {
      this.recaptcha.current.open();
    } else {
      console.error('ReCAPTCHA ref not initialized or null.');
    }
  };

  onVerify = token => {
    console.log('success!', token);
    // this.submit();
    this.signInFun();
  };
  onVerify2 = token => {
    console.log('success!', token);
    // this.submit();
    this.createAccountSignUp();
  };

  onExpire = () => {
    console.warn('expired!');
  };
  onExpire2 = () => {
    console.warn('expired!');
  };

  /// //////

  /// //////
  render() {
    const isEnabled = this.canBeSubmitted();
    const isEnableSignIn = this.canBeSubmittedSignIn();
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: this.props.themeStyle.primaryBackgroundColor}}>
        <Toast
          ref={ref => {
            this.toast = ref;
          }}
          style={{backgroundColor: this.props.themeStyle.iconPrimaryColor}}
          position="top"
          positionValue={400}
          fadeOutDuration={7000}
          textStyle={{color: this.props.themeStyle.textColor, fontSize: 15}}
        />
        <View
          style={[
            styles.container,
            {
              backgroundColor: this.props.themeStyle.primaryBackgroundColor,
            },
          ]}>
          <TouchableOpacity
            style={styles.backIconView}
            onPress={() => {
              this.props.navigation.pop();
            }}>
            <Ionicons
              name={
                I18nManager.isRTL
                  ? 'chevron-forward-outline'
                  : 'chevron-back-outline'
              }
              style={[
                styles.backIconStyle,
                {
                  color: this.props.themeStyle.textColor,
                  fontSize: appTextStyle.largeSize + 14,
                },
              ]}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity

            onPress={() => navigation.navigate('Home1Screen')}>
            <Image
              style={{ width: 25, height: 25, tintColor: 'black', marginRight: 10, top: -30, left: 150 }}
              source={require('../images/homeicon3.png')}
            />
          </TouchableOpacity> */}

          <Spinner
            visible={this.state.spinnerTemp}
            textStyle={{
              backgroundColor: this.props.themeStyle.primary,
              color: this.props.themeStyle.primary,
            }}
          />
          {this.state.selectedTab === '1' ? (
            <Text
              style={{
                fontSize: appTextStyle.largeSize + 2,
                color: this.props.themeStyle.textColor,
                paddingTop: HEIGHT * 0.05,
                fontFamily: appTextStyle.fontFamily,
                fontWeight: '700',
              }}>
              {this.props.language['Welcome Back!']}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: appTextStyle.largeSize + 2,
                color: this.props.themeStyle.textColor,
                paddingTop: HEIGHT * 0.05,
                fontFamily: appTextStyle.fontFamily,
                fontWeight: '700',
              }}>
              {this.props.language['Create a new Account!']}
            </Text>
          )}

          <View
            style={[
              styles.tabContainer,
              {
                borderBottomColor: this.props.themeStyle.primaryLight,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.setState({selectedTab: '1'});
              }}
              style={[
                styles.tabText,
                {
                  borderBottomColor:
                    this.state.selectedTab === '1'
                      ? this.props.themeStyle.primary
                      : 'transparent',
                },
              ]}>
              <Text
                style={{
                  fontSize: appTextStyle.largeSize + 3,
                  fontFamily: appTextStyle.fontFamily,
                  color:
                    this.state.selectedTab === '1'
                      ? this.props.themeStyle.primary
                      : this.props.themeStyle.iconPrimaryColor,
                }}>
                {this.props.language.SignIn}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({selectedTab: '2'});
              }}
              style={[
                styles.tabText,
                {
                  borderBottomColor:
                    this.state.selectedTab === '2'
                      ? this.props.themeStyle.primary
                      : 'transparent',
                },
              ]}>
              <Text
                style={{
                  fontSize: appTextStyle.largeSize + 3,
                  fontFamily: appTextStyle.fontFamily,
                  color:
                    this.state.selectedTab === '2'
                      ? this.props.themeStyle.primary
                      : this.props.themeStyle.iconPrimaryColor,
                }}>
                {this.props.language.signUp}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.screenContainer}>
            {this.state.selectedTab === '2' ? (
              <View style={styles.screenInnerContainer}>
                <View
                  style={[
                    styles.textInputContainer,
                    {
                      borderColor: this.props.themeStyle.primaryLight,
                    },
                  ]}>
                  <Ionicons
                    name={'person-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language['First Name']}
                    onChangeText={firstNameSignUp =>
                      this.setState({firstNameSignUp, errorMessageSignUp: ''})
                    }
                    value={this.state.firstNameSignUp}
                  />
                </View>
                <View
                  style={[
                    styles.textInputContainer,
                    {
                      borderColor: this.props.themeStyle.primaryLight,
                    },
                  ]}>
                  <Ionicons
                    name={'people-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language['Last Name']}
                    onChangeText={lastNameSignUp =>
                      this.setState({lastNameSignUp, errorMessageSignUp: ''})
                    }
                    value={this.state.lastNameSignUp}
                  />
                </View>

                <View
                  style={[
                    styles.textInputContainer,
                    {
                      borderColor: this.props.themeStyle.primaryLight,
                    },
                  ]}>
                  <Ionicons
                    name={'people-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    secureTextEntry={false}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language.Username}
                    onChangeText={userName =>
                      this.setState({userName, errorMessageSignUp: ''})
                    }
                    value={this.state.userName}
                  />
                </View>

                <View
                  style={[
                    styles.containerTextinput,
                    {
                      marginTop: 20,
                      borderColor: this.EmailNumberCheckSignUp2(
                        this.state.emailSignUp,
                      )
                        ? this.props.themeStyle.primaryLight
                        : 'red',
                    },
                  ]}>
                  <Ionicons
                    name={'mail-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    secureTextEntry={false}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    dataDetectorTypes={'address'}
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language.Email}
                    onChangeText={emailSignUp =>
                      this.setState({emailSignUp, errorMessageSignUp: ''})
                    }
                    value={this.state.emailSignUp}
                  />
                </View>
                {!this.EmailNumberCheckSignUp2(this.state.emailSignUp) ? (
                  <Text style={styles.validationText}>
                    {this.props.language['The email address is not valid']}
                  </Text>
                ) : null}

                <View
                  style={[
                    styles.containerTextinput,
                    {
                      marginTop: !this.EmailNumberCheckSignUp2(
                        this.state.emailSignUp,
                      )
                        ? 0
                        : 20,
                      borderColor: !this.passLength(this.state.passwordSignUp)
                        ? 'red'
                        : this.props.themeStyle.primaryLight,
                    },
                  ]}>
                  <Ionicons
                    name={'lock-closed-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    secureTextEntry
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language.PasswordCharacters}
                    onChangeText={passwordSignUp =>
                      this.setState({passwordSignUp, errorMessageSignUp: ''})
                    }
                    value={this.state.passwordSignUp}
                  />
                </View>

                {!this.passLength(this.state.passwordSignUp) ? (
                  <Text style={styles.validationText}>
                    {this.props.language.PasswordCharacters}
                  </Text>
                ) : null}

                <View
                  style={[
                    styles.containerTextinput,
                    {
                      marginTop: 20,
                      borderColor: !this.confirmPassword()
                        ? 'red'
                        : this.props.themeStyle.primaryLight,
                    },
                  ]}>
                  <Ionicons
                    name={'lock-closed-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    secureTextEntry
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language['Confirm Password']}
                    onChangeText={confirmPasswordSignUp =>
                      this.setState({
                        confirmPasswordSignUp,
                        errorMessageSignUp: '',
                      })
                    }
                    value={this.state.confirmPasswordSignUp}
                  />
                </View>

                {!this.confirmPassword() ? (
                  <Text style={styles.validationText}>
                    {
                      this.props.language[
                        'New password and confirm password must be same'
                      ]
                    }
                  </Text>
                ) : null}
                {this.state.errorMessageSignUp !== '' ? (
                  <Text
                    style={{
                      marginTop: 15,
                      color:
                        this.state.errorMessageSignUp ===
                        'User Created. Login Using your Username & Password'
                          ? 'green'
                          : 'red',
                      fontFamily: appTextStyle.fontFamily,
                    }}>
                    {this.state.errorMessageSignUp}
                  </Text>
                ) : null}
                <View>
                  <Recaptcha
                    ref={this.recaptcha}
                    siteKey="6LccQ3IpAAAAAD5f_4Y0sqYGJAYo0Ai01Qbq1Bf4"
                    baseUrl="https://weaclimsolutions.com"
                    onVerify={this.onVerify2}
                    onExpire={this.onExpire2}
                    size="normal"
                  />

                  {/* <Button title="Send" onPress={this.send} /> */}
                </View>

                <TouchableOpacity
                  disabled={!isEnabled}
                  // onPress={() => this.createAccountSignUp()}>
                  onPress={() => this.send2()}>
                  <View
                    style={[
                      styles.signUpView,
                      {
                        opacity: !isEnabled ? 0.4 : 0.9,
                        backgroundColor: this.props.themeStyle.primary,
                      },
                    ]}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: this.props.themeStyle.textTintColor,
                        fontSize: appTextStyle.largeSize + 3,
                        fontWeight: '500',
                        fontFamily: appTextStyle.fontFamily,
                      }}>
                      {this.props.language.signUp}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={[
                    styles.textInputContainer,
                    {
                      borderColor: this.props.themeStyle.primaryLight,
                    },
                  ]}>
                  <Ionicons
                    name={'mail-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                        borderColor: this.props.themeStyle.primaryLight,
                        // borderColor: this.EmailNumberCheckSignUp2(this.state.emailSignIn) ? this.props.themeStyle.primaryLight : 'red',
                        borderBottomWidth: 1,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language.Username}
                    onChangeText={emailSignIn =>
                      this.setState({emailSignIn, errorMessage: ''})
                    }
                    value={this.state.emailSignIn}
                  />
                </View>

                {!this.EmailNumberCheckSignUp2(this.state.emailSignIn) ? (
                  <Text style={styles.validationText}>
                    {this.props.language['The email address is not valid']}
                  </Text>
                ) : null}

                <View
                  style={[
                    styles.textInputContainer,
                    {
                      borderColor: !this.passLength(this.state.passwordSignIn)
                        ? ''
                        : this.props.themeStyle.primaryLight,
                    },
                  ]}>
                  <Ionicons
                    name={'lock-closed-outline'}
                    style={[
                      styles.textInputIcon,
                      {
                        color: this.props.themeStyle.textColor,
                        fontSize: appTextStyle.largeSize + 4,
                      },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textInputStyle,
                      {
                        color: this.props.themeStyle.textColor,
                      },
                    ]}
                    placeholderTextColor={
                      this.props.themeStyle.iconPrimaryColor
                    }
                    secureTextEntry
                    selectionColor={this.props.themeStyle.iconPrimaryColor}
                    placeholder={this.props.language.Password}
                    onChangeText={passwordSignIn =>
                      this.setState({passwordSignIn, errorMessage: ''})
                    }
                    value={this.state.passwordSignIn}
                  />
                </View>
                {!this.passLength(this.state.passwordSignIn) ? (
                  <Text style={styles.validationText}>
                    {this.props.language.PasswordCharacters}
                  </Text>
                ) : null}
                {this.state.errorMessage !== '' ? (
                  <Text
                    style={{
                      marginTop: 18,
                      color: 'red',
                      fontFamily: appTextStyle.fontFamily,
                    }}>
                    {this.state.errorMessage}
                  </Text>
                ) : null}

                <View style={styles.forgotRow}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ChangePassScreen');
                    }}>
                    <Text
                      style={{
                        fontSize: appTextStyle.mediumSize - 1,
                        fontWeight: '500',
                        color: this.props.themeStyle.primary,
                        fontFamily: appTextStyle.fontFamily,
                        textDecorationLine: 'underline',
                      }}>
                      {this.props.language['Forgot your password?']}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Recaptcha
                    ref={this.recaptcha}
                    siteKey="6LccQ3IpAAAAAD5f_4Y0sqYGJAYo0Ai01Qbq1Bf4"
                    baseUrl="https://weaclimsolutions.com"
                    onVerify={this.onVerify}
                    onExpire={this.onExpire}
                    size="normal"
                  />

                  {/* <Button title="Send" onPress={this.send} /> */}
                </View>
                <TouchableOpacity
                  disabled={!isEnableSignIn}
                  // onPress={() => this.signInFun()}>
                  onPress={() => this.send()}>
                  <View
                    style={[
                      styles.signBtnView,
                      {
                        backgroundColor: this.props.themeStyle.primary,
                        opacity: !isEnableSignIn ? 0.4 : 0.9,
                      },
                    ]}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: this.props.themeStyle.textTintColor,
                        fontSize: appTextStyle.largeSize + 3,
                        fontWeight: '500',
                        fontFamily: appTextStyle.fontFamily,
                      }}>
                      {this.props.language.SignIn}
                    </Text>
                  </View>
                </TouchableOpacity>

                {this.props.settings.checkout_process === 'yes' ? (
                  <TouchableOpacity
                    onPress={() => {
                      const temp = {};
                      temp.id = 0;
                      temp.avatar_url = '';
                      temp.email = 'guest@gmail.com';
                      temp.first_name = 'Guest';
                      temp.last_name = '';
                      temp.role = 'subscriber';
                      temp.username = 'Guest';
                      temp.billing = {
                        first_name: '',
                        last_name: '',
                        company: '',
                        address_1: '',
                        address_2: '',
                        city: '',
                        state: '',
                        postcode: '',
                        country: '',
                        phone: '',
                      };
                      temp.shipping = {
                        first_name: '',
                        last_name: '',
                        company: '',
                        address_1: '',
                        address_2: '',
                        city: '',
                        state: '',
                        postcode: '',
                        country: '',
                      };
                      this.props.registerUser(temp, this);
                    }}>
                    <View
                      style={[
                        styles.signBtnView,
                        {
                          backgroundColor: this.props.themeStyle.primary,
                          marginTop: 20,
                        },
                      ]}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: this.props.themeStyle.textTintColor,
                          fontSize: appTextStyle.largeSize + 3,
                          fontWeight: '500',
                          fontFamily: appTextStyle.fontFamily,
                        }}>
                        {this.props.language['Continue as a Guest']}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
            {/* <View style={styles.containerDevi}>
              <View style={[styles.childContainerView, {
                backgroundColor: this.props.themeStyle.iconPrimaryColor
              }]} />
              <View>
                <Text style={[styles.deviderText, {
                  fontSize: appTextStyle.mediumSize,
                  color: this.props.themeStyle.iconPrimaryColor,
                  fontFamily: appTextStyle.fontFamily

                }]}>{this.props.language['Or sign in with']}</Text>
              </View>
              <View style={[styles.childContainerView, {
                backgroundColor: this.props.themeStyle.iconPrimaryColor
              }]} />
            </View> */}
            {/* 
            <View style={styles.socialLoginRow}>

              <FBLoginButton
                onRef={ref => (this.parentReference = ref)}
                parentReference={(a, s, d) =>
                  this.setState({ spinnerTemp: true }, () => {
                    this.signInFB(a, s, d)
                  })
                }
              /> */}

            {/* <TouchableOpacity
                onPress={this.signInGoogle}
                style={styles.googleView}>
                <FontAwesome
                  name={'google'}
                  style={styles.googleIcon}
                />
                <Text style={{
                  fontSize: appTextStyle.mediumSize,
                  color: this.props.themeStyle.iconPrimaryColor,
                  paddingTop: 2,
                  fontFamily: appTextStyle.fontFamily
                }}>{'google'}</Text>
              </TouchableOpacity> */}
            {/* 
              { Platform.OS === 'ios'
                ? <TouchableOpacity
                  onPress={this.onAppleButtonPress}
                  style={styles.googleView}>
                  <FontAwesome
                    name={'apple'}
                    style={[styles.googleIcon, { color: '#A2AAAD' }]}
                  />
                  <Text style={{
                    fontSize: appTextStyle.mediumSize,
                    color: this.props.themeStyle.iconPrimaryColor,
                    paddingTop: 2,
                    fontFamily: appTextStyle.fontFamily
                  }}>{'google'}</Text>
                </TouchableOpacity>

                : null }
            </View> */}

            <View style={styles.policyView}>
              <Text
                style={{
                  fontSize: appTextStyle.mediumSize,
                  color: this.props.themeStyle.iconPrimaryColor,
                  textAlign: 'center',
                  fontFamily: appTextStyle.fontFamily,
                }}>
                {
                  this.props.language[
                    'We keep your data safe. for further assistance please refer to our '
                  ]
                }
                <Text
                  onPress={() => {
                    this.props.navigation.navigate('PrivacyPolicyScreen');
                  }}
                  style={{
                    fontSize: appTextStyle.mediumSize,
                    color: this.props.themeStyle.iconPrimaryColor,
                    textDecorationLine: 'underline',
                    textAlign: 'center',
                    fontFamily: appTextStyle.fontFamily,
                  }}>
                  {this.props.language['Privacy Policy']}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  signUpCall: (
    firstNameSignUp,
    lastNameSignUp,
    userName,
    emailSignUp,
    passwordSignUp,
    confirmPasswordSignUp,
    th,
    sessionId,
  ) => {
    dispatch(async dispatch => {
      await signUp(
        dispatch,
        firstNameSignUp,
        lastNameSignUp,
        userName,
        emailSignUp,
        passwordSignUp,
        confirmPasswordSignUp,
        th,
        sessionId,
        th.props.languageCode,
        th.props.currencyCode,
      );
    });
  },
  signInCall: (emailSignIn, passwordSignIn, sessionId, th) => {
    dispatch(async dispatch => {
      await signIn(
        dispatch,
        emailSignIn,
        passwordSignIn,
        sessionId,
        th,
        th.props.languageCode,
        th.props.currencyCode,
      );
    });
  },
  registerUser: (data, th) => {
    dispatch({
      type: REGISTER_USER,
      payload: data,
    });
    th.props.navigation.pop();
  },
});

const getTheme = state => state.appConfig.themeStyle;
const getSessionId = state => state.userData.sessionId;
const getCurrency = state => state.appConfig.currencyCode;
const getLanguageCode = state => state.appConfig.languageCode;

const getCurrencyFun = createSelector(
  [getCurrency],
  getCurrency => {
    return getCurrency;
  },
);
const getLanguageCodeFun = createSelector(
  [getLanguageCode],
  getLanguageCode => {
    return getLanguageCode;
  },
);
const getSessionIdFun = createSelector(
  [getSessionId],
  getSessionId => {
    return getSessionId;
  },
);
const getThemeFun = createSelector(
  [getTheme],
  getTheme => {
    return getTheme;
  },
);
const getLanguage = state => state.appConfig.languageJson;
const getLanguageFun = createSelector(
  [getLanguage],
  getLanguage => {
    return getLanguage;
  },
);
const getSettings = state => state.settingsCall.settings;

const getSettingsFun = createSelector(
  [getSettings],
  getSettings => {
    return getSettings;
  },
);
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
  sessionId: getSessionIdFun(state),
  settings: getSettingsFun(state),
  currencyCode: getCurrencyFun(state),
  languageCode: getLanguageCodeFun(state),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policyView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 38,
    paddingBottom: 38,
    width: WIDTH * 0.7,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
  },
  validationText: {
    marginTop: 5,
    color: 'red',
    fontSize: appTextStyle.mediumSize,
    alignSelf: 'center',
    fontFamily: appTextStyle.fontFamily,
  },
  googleView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingTop: HEIGHT * 0.05,
  },
  tabText: {
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  containerTextinput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  socialIcon: {
    color: '#ffffff',
  },
  textInputStyle: {
    height: 38,
    width: WIDTH * 0.9,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingHorizontal: 6,
    fontSize: appTextStyle.mediumSize + 1,
  },
  signBtnView: {
    marginTop: 8,
    alignItems: 'center',
    height: 38,
    width: WIDTH * 0.9,
    justifyContent: 'center',
    borderRadius: appTextStyle.customRadius,
  },
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLoginRow: {
    flexDirection: 'row',
    width: WIDTH,
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
  textInputIcon: {
    paddingHorizontal: 10,
    paddingLeft: 29,
    marginBottom: Platform.OS === 'android' ? 5 : 0,
  },
  containerDevi: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    width: '60%',
    alignSelf: 'center',
  },
  googleIcon: {
    color: '#dd4b39',
    fontSize: 40,
  },
  forgotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotRow: {
    justifyContent: 'space-between',
    width: WIDTH,
    padding: Platform.OS === 'android' ? 16 : 19,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIconView: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  backIconStyle: {
    alignSelf: 'flex-start',
  },
  signUpView: {
    marginTop: 18,
    alignItems: 'center',
    height: 38,
    width: WIDTH * 0.9,
    borderRadius: appTextStyle.customRadius,
    justifyContent: 'center',
  },
  childContainerView: {
    flex: 1,
    height: 1,
  },
  deviderText: {
    marginHorizontal: 12,
    textAlign: 'center',
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
