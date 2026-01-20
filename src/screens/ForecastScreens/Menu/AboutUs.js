import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import HeaderForecast from '../HeaderForecast';
import MenuFooterScreen from '../../homeScreens/MenuFooterScreen';

class AboutUs extends Component {
    render() {
        return (
            <View>
                <HeaderForecast name={'About-Us'} />
                <ScrollView>
                    <View>
                        <Image
                            style={styles.img}
                            source={require('../../../images/front/earth.jpg')}
                        />
                    </View>

                    <MenuFooterScreen />
                </ScrollView>
            </View>
        );
    }
}

export default AboutUs;