import React, { PureComponent } from 'react'
import {
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Touchable,
  Platform,
  View,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import LinearGradient from 'react-native-linear-gradient'
import Spinner from 'react-native-loading-spinner-overlay'
import Recaptcha from 'react-native-recaptcha-that-works'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
import Ionicons from 'react-native-vector-icons/Ionicons'


class ContactUsScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitleAlign: 'center',
      headerTintColor: iconColor,
      headerStyle: {
        backgroundColor: colorProps,
        elevation: 0,
        borderBottomWidth: 0,
        shadowOpacity: 0
      },
      headerLeft: () => <Icon
        onPress={() => { navigation.pop() }}
        name={!I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'}
        style={{
          color: iconColor,
          fontSize: appTextStyle.largeSize + 8,
          paddingLeft: 10

        }}
      />,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 6,
        color: iconColor
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      gestureEnabled: false,
      
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.language.Feedback,
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor
    })
  }

  constructor(props) {
    super(props)
    this.recaptcha = React.createRef();
    this.state = {
      firstName: '',
      lastName: '',
      Email: '',
      msg: '',
      errorMessage: '',
      spinnerTemp: false,
      subject: '',
      
    }
    this.toast = null
  }

  submit = async () => {
    if (true) {
      this.setState({ spinnerTemp: true })

      const data = JSON.stringify({
        name: this.state.firstName,
        email: this.state.Email,
        message: this.state.msg,
        subject: this.state.subject
      })

      try{

      
      // const json = await postFetchHttp(ThemeStyle.url + '/wp-json/api/tc_user/send_mail', data)
      const json = await postFetchHttp(ThemeStyle.url + 'getuserdetails.php', data)
      // alert(json.status);
      // console.log('json : ',json);
      if ( json.status === 'success') {
        this.setState({
          firstName: '',
          msg: '',
          Email: '',
          subject:'',
         
          spinnerTemp: false
        });
        ToastAndroid.show('The form was sent successfull!',ToastAndroid.LONG);
      }
      else{
        this.setState({
          spinnerTemp: false,
         
        });
        ToastAndroid.show('The form was not send successfull. please try again!',ToastAndroid.LONG);
      }
    }
    catch (error) {
      console.error('API error:', error);
      this.setState({
        spinnerTemp: false,
      });
      ToastAndroid.show(
        'An error occurred. Please try again!',
        ToastAndroid.LONG
      );
    }
      
    } 
    // else {
    //   this.toast.show('Please login or create an account for free')
    // }
  }

 
  singaleRow(iconName, text) {
    return (
      <View
        style={{
          padding: 2,
          flexDirection: 'row',
          backgroundColor: this.props.themeStyle.primaryBackgroundColor,
          paddingTop: 2
        }}
      >
        <Icon name={iconName} style={{ color: 'gray', fontSize: 21 }} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              fontWeight: 'normal',
              padding: 6,
              paddingTop: 1,
              fontFamily: appTextStyle.fontFamily
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    )
  }

  canBeSubmitted() {
    const { Email, firstName, msg ,subject } = this.state
    return (Email.length > 0) && firstName.length > 0 && msg.length > 0 && subject.length > 0 &&
      this.EmailNumberCheck()
  }

  EmailNumberCheck() {
    const { Email } = this.state
    const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    return (
      (Email.length === 0) || reg.test(this.state.Email) === true
    )
  }

  labelFun = (length, text) => (
    <View style={{
      flexDirection: 'row',
      margin: 9,
      alignSelf: 'flex-start',
      marginHorizontal: 0,
      alignItems: 'center'
    }}>
      <Text
        style={{
          fontSize: appTextStyle.largeSize,
          color: length === 0 ? this.props.themeStyle.primary : this.props.themeStyle.primaryBackgroundColor,
          paddingRight: 5,
          paddingLeft: 5,
          fontFamily: appTextStyle.fontFamily
        }}
      >
        {'*'}
      </Text>
      <Text
        style={{
          fontSize: appTextStyle.largeSize,
          color: this.props.themeStyle.textColor,
          fontFamily: appTextStyle.fontFamily
        }}
      >
        {text}
      </Text>
    </View>
  )


  send = () => {
    console.log('send!');
    if (this.recaptcha && this.recaptcha.current) {
        this.recaptcha.current.open();
        
    } else {
        console.error('ReCAPTCHA ref not initialized or null.');
    }
}

onVerify = token => {
    console.log('success!', token);
    this.submit();
}

onExpire = () => {
    console.warn('expired!');
}




  render() {
    const isEnabled = this.canBeSubmitted()
    return (
      <View style={{flex:1}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.backIconView}
            onPress={() => {
              this.props.navigation.pop()
            }}
          >
            <Ionicons
              name={I18nManager.isRTL
                ? 'chevron-forward-outline'
                : 'chevron-back-outline'}
              style={[styles.backIconStyle, {
                color: this.props.themeStyle.textColor,
                fontSize: appTextStyle.largeSize + 14
              }]}

            />
          </TouchableOpacity>
          <Text style={{ color: 'black', marginLeft: 100, fontWeight: 'bold', fontSize: 20 }}>Contact Us</Text>
          <TouchableOpacity
          // style={{backgroundColor:'red'}}
          onPress={() => this.props.navigation.navigate('Home1Screen')}>
          <Image
            style={{ width: 25, height: 25, tintColor: 'black', marginLeft: 80 }}
            source={require('../images/homeicon3.png')}
          />
        </TouchableOpacity>
        
        </View>
        <LinearGradient
            colors={['#fff', '#92DFF3', '#fff']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // backgroundColor: this.props.themeStyle.primaryBackgroundColor,
          flex: 1
        }}>
        <View>
          <Text style={styles.heading}>

            We Love to Hear From You

          </Text>
          <Text style={styles.smallhead}>Registered Office</Text>
          <Text style={styles.para}>
            74, Sector 28, Arun Vihar, Noida,{'\n'} Gautam Buddha Nagar,{'\n'}
            Uttar Pradesh. 201301.
          </Text>
        </View>
        <View>

          <Text style={styles.smallhead}>Company Information</Text>
          <Text style={styles.para}>
            CIN:- U74999UP2021PTC153520{'\n'}
            TAN:- MRTW01203G{'\n'}
            Startup India Recognition:- DIPP91015 {'\n'}
            GSTIN:- 09AADCW0764F1ZA {'\n'}
            PAN:- AADCW0764F {'\n'}

          </Text>
        </View>

        <View>

          <Text style={styles.smallhead}>Contact Information</Text>
          <Text style={styles.para}>
            Tarendra Prakash Srivastava{'\n'}
            +91-9717549264{'\n'}
            www.weaclimsolutions.com {'\n'}
            tpsrivastava@weaclimsolutions.com  {'\n'}
            customercare@weaclimsolutions.com  {'\n'}
            management@weaclimsolutions.com  {'\n'}

          </Text>
        </View>
        <Text style={styles.heading}>
          Leave A Message

        </Text>

        {/* <KeyboardAvoidingView
          keyboardVerticalOffset={5}
          behavior={'padding'}
          style={{
            flex: 1,
            backgroundColor: this.props.themeStyle.primaryBackgroundColor,
            padding: 10,
            alignItems: 'center'
          }} > */}

          <Toast
            ref={ref => { this.toast = ref }}
            style={{ backgroundColor: this.props.themeStyle.iconPrimaryColor }}
            position='top'
            positionValue={400}
            fadeOutDuration={7000}
            textStyle={{ color: this.props.themeStyle.textColor, fontSize: appTextStyle.largeSize }}
          />

          <Spinner
            visible={this.state.spinnerTemp}
            textStyle={styles.spinnerTextStyle}
          />
          {/* {this.labelFun(this.state.firstName.length, this.props.language['First Name'])} */}
          <TextInput
            style={{
              marginTop: 2,
              height: 38,
              width: '97%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              borderColor: '#c1c1c1',
              borderWidth: 1,
              margin: 6,
              paddingLeft: 6,
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              borderRadius: appTextStyle.customRadius - 11
            }}
            placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
            selectionColor={this.props.themeStyle.iconPrimaryColor}
            // placeholder={' ' + this.props.language['First Name']}
            placeholder='Your Name'
            onChangeText={firstName => {
              this.setState({ firstName, errorMessage: '' })
            }}
            value={this.state.firstName}
          />

          {/* {this.labelFun(this.state.lastName.length, this.props.language['Last Name'])}
          <TextInput
            style={{
              marginTop: 2,
              height: 38,
              width: '97%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              borderColor: '#c1c1c1',
              borderWidth: 1,
              margin: 6,
              paddingLeft: 6,
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              borderRadius: appTextStyle.customRadius - 11
            }}
            placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
            selectionColor={this.props.themeStyle.iconPrimaryColor}
            placeholder={' ' + this.props.language['Last Name']}
            onChangeText={lastName => {
              this.setState({ lastName, errorMessage: '' })
            }}
            value={this.state.lastName}
          /> */}
          {/* {this.labelFun(this.state.Email.length, this.props.language.Email)} */}
          <TextInput
            style={{
              marginTop: 2,
              height: 38,
              width: '97%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              borderColor: this.EmailNumberCheck() ? '#c1c1c1' : 'red',
              borderWidth: 1,
              margin: 6,
              paddingLeft: 6,
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              borderRadius: appTextStyle.customRadius - 11
            }}
            placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
            selectionColor={this.props.themeStyle.iconPrimaryColor}
            // placeholder={' ' + this.props.language.Email}
            placeholder='Email'
            onChangeText={Email => {
              this.setState({ Email, errorMessage: '' })
            }}
            value={this.state.Email}
          />

          {/* {this.labelFun(this.state.lastName.length, this.props.language['Last Name'])} */}
          <TextInput
            style={{
              marginTop: 2,
              height: 38,
              width: '97%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              borderColor: '#c1c1c1',
              borderWidth: 1,
              margin: 6,
              paddingLeft: 6,
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              borderRadius: appTextStyle.customRadius - 11
            }}
            placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
            selectionColor={this.props.themeStyle.iconPrimaryColor}
            // placeholder={' ' + this.props.language['Last Name']}
            placeholder='Subject'
            onChangeText={subject => {
              this.setState({ subject, errorMessage: '' })
            }}
            value={this.state.subject}
          />

          {/* {this.labelFun(this.state.msg.length, this.props.language['Please write your feedback below.'])} */}

          <TextInput
            style={{
              marginTop: 2,
              height: 130,
              width: '97%',
              borderColor: '#c1c1c1',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              borderWidth: 1,
              margin: 6,
              paddingLeft: 6,
              fontSize: appTextStyle.mediumSize,
              color: this.props.themeStyle.textColor,
              borderRadius: appTextStyle.customRadius - 11,
              textAlignVertical: 'top',
              alignItems: 'flex-start'
            }}
            editable={true}
            multiline={true}
            numberOfLines={5}
            placeholderTextColor={this.props.themeStyle.iconPrimaryColor}
            selectionColor={this.props.themeStyle.iconPrimaryColor}
            // placeholder={' ' + this.props.language['write your feedback here']}
            placeholder='Message'
            onChangeText={msg => {
              this.setState({ msg, errorMessage: '' })
            }}
            value={this.state.msg}
          />
          {this.state.errorMessage === '' ? null : (
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: this.props.themeStyle.textColor,
                  fontWeight: 'normal',
                  padding: 10,
                  paddingTop: 4,
                  paddingLeft: 6,
                  fontSize: appTextStyle.mediumSize
                }}
              >
                {this.state.errorMessage}
              </Text>
            </View>
          )}
           <View>
                <Recaptcha
                    ref={this.recaptcha}
                    siteKey="6LccQ3IpAAAAAD5f_4Y0sqYGJAYo0Ai01Qbq1Bf4"
                    baseUrl="https://weaclimsolutions.com"
                    onVerify={this.onVerify}
                    onExpire={this.onExpire}
                    size='normal'
                />
                
                {/* <Button title="Send" onPress={this.send} /> */}
            </View>

          <View >
            <TouchableOpacity onPress={() =>  this.send()} disabled={!isEnabled}   style={{width:'100%',margin:8,alignItems:'center',padding:5, opacity: (!isEnabled) ? 0.5 : 0.9,}}>
              {/* <Button title='Submit' /> */}
              
              <Text style={styles.btn}>Submit</Text>
            </TouchableOpacity>

          </View>




          {/* <TouchableOpacity
            style={{
              borderColor: '#fff',
              alignItems: 'center',
             
              backgroundColor: this.props.themeStyle.primary,
              padding: 4,
              justifyContent: 'center',
              width: '97%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              alignSelf: 'center',
              opacity: (!isEnabled) ? 0.5 : 0.9,
              bottom: -10,
              position: 'absolute',
              borderRadius: appTextStyle.customRadius
            }}
            onPress={() => {
              this.submit()
            }}
            disabled={!isEnabled}
          >

            <Text
              style={{
                color: '#fff',
                fontSize: appTextStyle.largeSize + 2,
                paddingTop: 1,
                fontWeight: '500',
                textAlign: 'center',
                fontFamily: appTextStyle.fontFamily
              }}
            >
              {this.props.language.Submit}
            </Text>
            
          </TouchableOpacity> */}
        {/* </KeyboardAvoidingView> */}

      </ScrollView>
      </LinearGradient>
      </View>
    )
  }
}



/// ///////////////////////////////////////////////
const getTheme = (state) => state.appConfig.themeStyle
const getUserData = (state) => state.userData.user
const getUserDataFun = createSelector(
  [getUserData],
  (getUserData) => {
    return getUserData
  }
)
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const getLanguage = (state) => state.appConfig.languageJson
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  language: getLanguageFun(state),
  userData: getUserDataFun(state)
})

export default connect(
  mapStateToProps,
  null
)(ContactUsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backIconView: {
    padding: 10,
    alignSelf: 'flex-start'
  },
  backIconStyle: {
    alignSelf: 'flex-start'
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    margin: 8,
    marginLeft:15
  },
  smallhead: {
    color: 'blue',
    margin: 8,
    marginLeft:15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  para: {
    color: 'black',
    marginLeft: 15
  },
  textAreaContainer: {
    borderColor: '#c1c1c1',
    borderWidth: 1,
    padding: 5,
    margin: 8
  },
  textArea: {
    height: 150,

  },
  btn: {
    backgroundColor:'#3f80eb',
    fontSize:20,
    padding:5,
    width:'30%',
    textAlign:'center',
    borderRadius:Platform.OS==='ios'?50: 50,
    fontWeight:"bold",
    color:'white'

  }

})
