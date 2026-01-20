import React, { PureComponent } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  I18nManager,

} from 'react-native'
import { CardStyleInterpolators } from 'react-navigation-stack'
import { UIActivityIndicator } from 'react-native-indicators'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html'
import { createSelector } from 'reselect'
import ThemeStyle, { appTextStyle } from '../common/Theme.style'
import base64 from 'react-native-base64'
import Ionicons from 'react-native-vector-icons/Ionicons'


class About extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    const colorProps = navigation.getParam('colorProps')
    const iconColor = navigation.getParam('iconColor')
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerForceInset: { top: 'never', vertical: 'never' },
      headerTintColor: iconColor,
      headerStyle: {
        backgroundColor: colorProps,
        elevation: 0,
        borderBottomWidth: 0,
        shadowOpacity: 0
      },

      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: appTextStyle.largeSize + 6
      },
      headerTitleAlign: 'center',
     
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.language['About Us'],
      colorProps: this.props.themeStyle.primaryBackgroundColor,
      iconColor: this.props.themeStyle.textColor,

    })
    // this.getAboutusData()

  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      spinnerTemp: false,
      aboutUs: [],
      selectedTab: 'Tab1',
      selectedTab2: 'Tab3',
      selectedTab3: 'Tab5',
      selectedTab4: 'Tab7',


    }
  }

  back = () => {
    this.props.navigation.navigate("Home1Screen");
  }

  // getAboutusData = async () => {
  //   const url = "https://weaclimsolutions.com/wp-json/wp/v2/pages/69";
  //   const Authorization = 'Basic ' + base64.encode(ThemeStyle.yourVendorUserNameString + ':' + ThemeStyle.yourVendorPasswordString)
  //   // const Authorization = 'Basic ' + base64.encode(ThemeStyle.consumerKey + ':' + ThemeStyle.consumerSecret)
  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: Authorization,
  //     },

  //   }).then((response) => response.json())
  //     .then((json) => {
  //       // alert(JSON.stringify(json.content.rendered))
  //       this.setState({ aboutUs: json.excerpt.rendered })
  //       console.log(json.excerpt)
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })



  //   // let result=await fetch(url);
  //   // alert(result);
  //   // result=await result.json();
  //   // this.state({
  //   //   aboutUs:result
  //   // });
  // }

  handleTabPress(tabName) {
    this.setState({ selectedTab: tabName });
  }
  handleTabPress2(tabName) {
    this.setState({ selectedTab2: tabName });
  }
  handleTabPress3(tabName) {
    this.setState({ selectedTab3: tabName });
  }
  handleTabPress4(tabName) {
    this.setState({ selectedTab4: tabName });
  }


  /// ///////////////////////////////////////
  render() {
    // console.log("about us : ", this.state.aboutUs);

    return (
      // this.state.spinnerTemp ? (
      //   <View
      //     style={[styles.activityIndicatorContainer, {
      //       backgroundColor: this.props.themeStyle.primaryBackgroundColor
      //     }]}>
      //     <UIActivityIndicator 
      //       size={27}
      //       color={this.props.themeStyle.primary}
      //     />
      //   </View>
      // ) : (
      //   <ScrollView showsVerticalScrollIndicator={false} style={{
      //     flex: 1,
      //     padding: 6,
      //     backgroundColor: this.props.themeStyle.secondryBackgroundColor
      //   }}>

      //     {this.state.aboutUs !== undefined && this.state.aboutUs !== ''
      //       ? <View>
      //         <HTML
      //           html={this.state.aboutUs}
      //           baseFontStyle={{
      //             fontSize: appTextStyle.largeSize,
      //             color: this.props.themeStyle.textColor
      //           }}
      //         />
      //       </View>
      //       : <View style={{ flex: 1, alignSelf: 'center', marginTop: 30 }}>
      //         <Text
      //           style={{
      //             fontSize: appTextStyle.largeSize + 2,
      //             fontFamily: appTextStyle.fontFamily,
      //             color: this.props.themeStyle.textColor
      //           }}>
      //           {
      //             this.props.language[
      //               'No Products Found'
      //             ]
      //           }
      //         </Text>
      //       </View>
      //     }

      //   </ScrollView>
      // )



      <View style={{ flex: 1 }}>
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
          <Text style={{ color: 'black', marginLeft: 100, fontWeight: 'bold', fontSize: 20 }}>About Us</Text>
          <TouchableOpacity
          // style={{backgroundColor:'red'}}
          onPress={() => this.props.navigation.navigate('Home1Screen')}>
          <Image
            style={{ width: 25, height: 25, tintColor: 'black', marginLeft: 90 }}
            source={require('../images/homeicon3.png')}
          />
        </TouchableOpacity>
        
        </View>
        <ScrollView>
          <View style={{ margin: 6 }}>
            <Image
              style={styles.img}
              source={require("../images/about/taransri.jpg")}
            />
            <View style={{ backgroundColor: '#cee9f2', margin: 5, padding: 5 }}>
              <Text style={styles.heading}>
                FOUNDER & MANAGING DIRECTOR WEACLIM SOLUTIONS PRIVATE LIMITED
              </Text>
              <Text style={styles.para}>
                Air Commodore (Dr) Tarendra Prakash Srivastava is a veteran of the Indian Air Force who served in its Meteorological Branch for more than three decades. He is a Post Graduate in Mathematics, Satellite Meteorology & Global Climate, Financial Management and PhD in Meteorology. He specialises in Numerical Weather Prediction, Climatology and Statistical Analysis. As a meteorologist, he fulfils demands of the climate and weather information that has become more intricate in this era of climate change and actions related to mitigate of its adverse effects. The aim of establishing WeaClim Solutions Pvt Ltd is to apprise the populace on the predicted meteorological conditions using Climate & Weather Models. Once incorporated in their processes, this information will not only enhance the efficiency of the business houses, the industrial sectors and the government agencies but also boost climate action worldwide.
              </Text>
            </View>
          </View>

          <View style={{ margin: 6 }}>
            <Image
              style={styles.img2}
              source={require("../images/about/intrro.jpg")}
            />
            <View style={{ backgroundColor: '#f0ebc5', margin: 5, padding: 5 }}>
              <Text style={styles.heading}>
                What is the problem the startup is solving?
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.handleTabPress('Tab1')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab === 'Tab1' ? '#2b6df0' : 'red' }}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleTabPress('Tab2')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab === 'Tab2' ? '#2b6df0' : 'red' }}>View More</Text>
                </TouchableOpacity>

              </View>

              {this.state.selectedTab === 'Tab1' && (
                <Text style={styles.para}>
                  The current generation is facing the consequences of climate change due to global  warming. Seasons are going through their extremes as weather systems are becoming  more intense and occurrence of high impact weather events has become more frequent  across the world. Mitigating the effect of climate change through meaningful and effective  climate action is the major problem that WeaClim Solutions Pvt Ltd will solve.
                </Text>
              )}
              {this.state.selectedTab === 'Tab2' && (
                <Text style={styles.para}>
                  In this age of information with improved technology in communication, a dedicated web based portal is the most potent tool in achieving the objective of providing the weather based consultancy services. Weather and climate information can be easily provisioned  through a web-portal to all our customers. Setting up of a dedicated website will be the  first and foremost necessity of the company. Agencies involved in provisioning of the  meteorological data have to be brought on board to resolve the weather predictions  through numerical models. Technical team has to look into the infrastructure required in  designing of hardware and functioning of software towards seamless flow of required data  from original source to the end user. Most important role will be that of company’s  meteorological professionals who will build up the database, process and provision it to  the users in the required format. The web portal of the company will provision seamless  weather services and will act as a major tool of connecting with the customers.
                </Text>
              )}



              {/* <Text style={styles.para}>
                The current generation is facing the consequences of climate change due to global  warming. Seasons are going through their extremes as weather systems are becoming  more intense and occurrence of high impact weather events has become more frequent  across the world. Mitigating the effect of climate change through meaningful and effective  climate action is the major problem that WeaClim Solutions Pvt Ltd will solve.
              </Text>
              <Text style={styles.para}>
                In this age of information with improved technology in communication, a dedicated web based portal is the most potent tool in achieving the objective of providing the weather based consultancy services. Weather and climate information can be easily provisioned  through a web-portal to all our customers. Setting up of a dedicated website will be the  first and foremost necessity of the company. Agencies involved in provisioning of the  meteorological data have to be brought on board to resolve the weather predictions  through numerical models. Technical team has to look into the infrastructure required in  designing of hardware and functioning of software towards seamless flow of required data  from original source to the end user. Most important role will be that of company’s  meteorological professionals who will build up the database, process and provision it to  the users in the required format. The web portal of the company will provision seamless  weather services and will act as a major tool of connecting with the customers.
              </Text> */}
            </View>
          </View>

          <View style={{ margin: 6 }}>
            <Image
              style={styles.img2}
              source={require("../images/about/climate.jpg")}
            />
            <View style={{ backgroundColor: '#cee9f2', margin: 5, padding: 5 }}>
              <Text style={styles.heading}>
                How does your startup propose to solve this problem?
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.handleTabPress2('Tab3')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab2 === 'Tab3' ? '#2b6df0' : 'red' }}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleTabPress2('Tab4')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab2 === 'Tab4' ? '#2b6df0' : 'red' }}>View More</Text>
                </TouchableOpacity>

              </View>




              {this.state.selectedTab2 === 'Tab3' && (
                <Text style={styles.para}>
                  Educating the users and the general population on the Climatology of weather and how  the predicted present atmospheric composition is changing the weather pattern and  increasing the threat of existence of life on Earth. Making everyone, comprehend the  effect of climate change due to global warming as it will enhance involvement each and  everyone of us towards mitigating the effects of climate change.
                </Text>
              )}
              {this.state.selectedTab2 === 'Tab4' && (
                <Text style={styles.para}>
                  Updating the users  through web based services on the prevailing and predicted weather pattern using Global  Climate Models for long range climate trends and Mesoscale Numerical Weather  Prediction short and medium range trends of weather. This information and knowledge in  turn will increase the awareness in the common population, the business houses, the  industrial sectors and the Government in understanding their role and how they need to  involve their processes to enhance climate action.
                </Text>
              )}


              {/* <Text style={styles.para}>
                Educating the users and the general population on the Climatology of weather and how  the predicted present atmospheric composition is changing the weather pattern and  increasing the threat of existence of life on Earth. Making everyone, comprehend the  effect of climate change due to global warming as it will enhance involvement each and  everyone of us towards mitigating the effects of climate change.
                </Text>
              <Text style={styles.para}>
                Updating the users  through web based services on the prevailing and predicted weather pattern using Global  Climate Models for long range climate trends and Mesoscale Numerical Weather  Prediction short and medium range trends of weather. This information and knowledge in  turn will increase the awareness in the common population, the business houses, the  industrial sectors and the Government in understanding their role and how they need to  involve their processes to enhance climate action.
                </Text> */}
            </View>
          </View>

          <View style={{ margin: 6 }}>
            <Image
              style={styles.img2}
              source={require("../images/about/week-cooldown.gif")}
            />
            <View style={{ backgroundColor: '#f0ebc5', margin: 5, padding: 5 }}>
              <Text style={styles.heading}>
                What is the uniqueness of your solution?
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.handleTabPress3('Tab5')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab3 === 'Tab5' ? '#2b6df0' : 'red' }}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleTabPress3('Tab6')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab3 === 'Tab6' ? '#2b6df0' : 'red' }}>View More</Text>
                </TouchableOpacity>

              </View>

              {this.state.selectedTab3 === 'Tab5' && (
                <Text style={styles.para}>
                  Higher frequency of delivery of numerically generated meteorological products to the end  users on finer resolution with sufficient lead time for them to improve productivity of  respective activity.
                </Text>
              )}
              {this.state.selectedTab3 === 'Tab6' && (
                <Text style={styles.para}>
                  Large spectrum of social and economic facet is affected by subtle variation of weather on  numerous spatial and temporal scales. It has an inescapable impact on every aspect of  human activity on the surface of the earth and the space beyond. Right to information  make it imperative that each one of us are weather-wise with weather intelligence in its  basic and complex forms.
                  Primary aim of the company will be to provide consultancy along with support systems in  formulating a cohesive methodology for execution of all types of weather and  environmental requirements of our customers and postulate long term meteorological  support for enabling seamless business operations that commensurate cash flows.  Hence, this company proposes to provide weather related information on any spatial and  temporal scale to meet the requirements of its customers in various strata of society and  commercial setup.

                  As a company we will execute projects which are crucial for forecasting severe weather  events, extreme rainfall, cloud burst, high winds, track and intensity of tropical storms etc.  We assure that we are fully aware of the ground truth and logistics which are essential to  generate proposals as required, which are implementable and sustainable to perform the  assigned task. During consultancy we will fully engage to fulfill a brief in terms of helping  to find solutions to specific issues within constraints such as budget and resources agreed  with the client. Our team will be bound by a code of ethics to provide realistic operational  recommendations that emanate through professional analysis and specialist expertise.

                </Text>
              )}



              {/* <Text style={styles.para}>
                Higher frequency of delivery of numerically generated meteorological products to the end  users on finer resolution with sufficient lead time for them to improve productivity of  respective activity.
              </Text>
              <Text style={styles.para}>
                Large spectrum of social and economic facet is affected by subtle variation of weather on  numerous spatial and temporal scales. It has an inescapable impact on every aspect of  human activity on the surface of the earth and the space beyond. Right to information  make it imperative that each one of us are weather-wise with weather intelligence in its  basic and complex forms.
                Primary aim of the company will be to provide consultancy along with support systems in  formulating a cohesive methodology for execution of all types of weather and  environmental requirements of our customers and postulate long term meteorological  support for enabling seamless business operations that commensurate cash flows.  Hence, this company proposes to provide weather related information on any spatial and  temporal scale to meet the requirements of its customers in various strata of society and  commercial setup.

                As a company we will execute projects which are crucial for forecasting severe weather  events, extreme rainfall, cloud burst, high winds, track and intensity of tropical storms etc.  We assure that we are fully aware of the ground truth and logistics which are essential to  generate proposals as required, which are implementable and sustainable to perform the  assigned task. During consultancy we will fully engage to fulfill a brief in terms of helping  to find solutions to specific issues within constraints such as budget and resources agreed  with the client. Our team will be bound by a code of ethics to provide realistic operational  recommendations that emanate through professional analysis and specialist expertise.

              </Text> */}
            </View>
          </View>

          <View style={{ margin: 6 }}>
            <Image
              style={styles.img2}
              source={require("../images/about/primary-cooler.gif")}
            />
            <View style={{ backgroundColor: '#cee9f2', margin: 5, padding: 5 }}>
              <Text style={styles.heading}>
                How does your startup generate revenue?
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.handleTabPress4('Tab7')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab4 === 'Tab7' ? '#2b6df0' : 'red' }}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleTabPress4('Tab8')}>
                  <Text style={{ padding: 10, fontWeight: 'bold', color: this.state.selectedTab4 === 'Tab8' ? '#2b6df0' : 'red' }}>View More</Text>
                </TouchableOpacity>

              </View>


              {this.state.selectedTab4 === 'Tab7' && (
                <Text style={styles.para}>
                  Weather service ranges from meteorological conditions and its explicit prediction that has  a spectrum from a specific location on a microscale to a vast spatial distribution across  the world, over a required time-frame. In a commercial scenario, necessity of weather  service can be specific to an individual or a group to improve the profitability of their  businesses.
                </Text>
              )}
              {this.state.selectedTab4 === 'Tab8' && (
                <Text style={styles.para}>
                  Large spectrum of social and economic facet is affected by subtle variation of weather on  numerous spatial and temporal scales. It has an inescapable impact on every aspect of  human activity on the surface of the earth and the space beyond. Right to information  make it imperative that each one of us are weather-wise with weather intelligence in its  basic and complex forms.

                  Primary aim of the company will be to provide consultancy along with support systems in  formulating a cohesive methodology for execution of all types of weather and  environmental requirements of our customers and postulate long term meteorological  support for enabling seamless business operations that commensurate cash flows.  Hence, this company proposes to provide weather related information on any spatial and  temporal scale to meet the requirements of its customers in various strata of society and  commercial setup.
                </Text>
              )}



              {/* <Text style={styles.para}>
                Weather service ranges from meteorological conditions and its explicit prediction that has  a spectrum from a specific location on a microscale to a vast spatial distribution across  the world, over a required time-frame. In a commercial scenario, necessity of weather  service can be specific to an individual or a group to improve the profitability of their  businesses.
                 </Text>
              <Text style={styles.para}>
                Large spectrum of social and economic facet is affected by subtle variation of weather on  numerous spatial and temporal scales. It has an inescapable impact on every aspect of  human activity on the surface of the earth and the space beyond. Right to information  make it imperative that each one of us are weather-wise with weather intelligence in its  basic and complex forms.

                Primary aim of the company will be to provide consultancy along with support systems in  formulating a cohesive methodology for execution of all types of weather and  environmental requirements of our customers and postulate long term meteorological  support for enabling seamless business operations that commensurate cash flows.  Hence, this company proposes to provide weather related information on any spatial and  temporal scale to meet the requirements of its customers in various strata of society and  commercial setup.
              </Text> */}
            </View>
          </View>



        </ScrollView>
      </View>





    )
  }
}
const getTheme = (state) => state.appConfig.themeStyle
const getLanguage = (state) => state.appConfig.languageJson
const getSettings = (state) => state.settingsCall.aboutUs
const getLanguageFun = createSelector(
  [getLanguage],
  (getLanguage) => {
    return getLanguage
  }
)
const getSettingsFun = createSelector(
  [getSettings],
  (getSettings) => {
    return getSettings
  }
)
const getThemeFun = createSelector(
  [getTheme],
  (getTheme) => {
    return getTheme
  }
)
const mapStateToProps = state => ({
  themeStyle: getThemeFun(state),
  settings: getSettingsFun(state),
  language: getLanguageFun(state)
})

export default connect(mapStateToProps, null)(About)

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIconView: {
    padding: 10,
    alignSelf: 'flex-start'
  },
  backIconStyle: {
    alignSelf: 'flex-start'
  },
  img: {
    width: '100%',
    height: 440,
  },
  img2: {
    width: '100%',
    height: 350
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'red',
    padding: 2
  },
  para: {
    padding: 5,
    color: 'black'
  }
})
