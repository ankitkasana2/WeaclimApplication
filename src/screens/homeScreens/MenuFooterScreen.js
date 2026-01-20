import React, { Component } from 'react';
import {Text, View, StyleSheet,TouchableOpacity } from 'react-native';


// const MenuFooterScreen = () => {
class MenuFooterScreen extends Component {

    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.props.onPressMembership}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>membership</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.onPressAbout}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>about us</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.onPressContact}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>contact us</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>news</Text>
                    </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={this.props.onPressBlog}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>news & bulletins</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onPressFaq}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>faq</Text>
                        </View>
                    </TouchableOpacity>


                </View>
                
            </View>
        );
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 8

    },
    textContainer: {
        backgroundColor: '#1d9df2',
        borderRadius: 4,
        margin: 3
    },
    text: {
        fontSize: 9,
        fontWeight: 'bold',
        color: 'black',
        padding: 5,
        textTransform: 'uppercase',


    }
})

export default MenuFooterScreen;