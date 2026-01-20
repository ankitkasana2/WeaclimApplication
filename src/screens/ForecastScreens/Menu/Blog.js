import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderForecast from '../HeaderForecast';

class Blog extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderForecast name={"Blog"} />
                <ScrollView style={{ backgroundColor: "#e8f5fc" }}>
                   



                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0e71ad',
        padding: 10
    },
    text: {
        color: '#0e71ad',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    des: {
        color: 'black',
        padding: 10,

    }
})

export default Blog;