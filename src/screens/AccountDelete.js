import React, { Component } from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { DrawerActions } from 'react-navigation-drawer';
import { Alert, BackHandler, Platform } from 'react-native';


class AccountDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            modalVisible1: false,
            showActivityIndicator: false,
            userLoginData: null
        };
    }
    componentDidMount() {
        this.userDetails();
    }

    cancelButton = () => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate("Home1Screen");
    };



    confirmButton = async () => {
        this.setState({ modalVisible: false });

        if (this.state.userLoginData === null) {
            this.setState({ modalVisible1: true });
        } else {
            this.setState({ showActivityIndicator: true });

            try {
                const requestOptions = {
                    method: "DELETE",
                    redirect: "follow"
                };

                fetch(`https://weaclimsolutions.com/getuserdetails.php?task=delete_user&username_or_email=${this.state.userLoginData}`, requestOptions)
                    .then((response) => response.json())
                    .then(async (result) => {
                        console.warn(result);
                        this.setState({ showActivityIndicator: false });
                        this.props.logOutCall(this);
                        // After successful logout, clear AsyncStorage and initiate app close
                        await AsyncStorage.clear()
                            .then(() => {

                                // this.props.navigation.navigate("Home1Screen");
                                this.handleExitApp();
                            })
                            .catch(error => console.error("Error clearing AsyncStorage:", error));
                    });

            } catch (error) {
                console.error("Error clearing AsyncStorage:", error);
            }
        }
    };

    handleExitApp = () => {
        if (Platform.OS === 'ios') {
            Alert.alert(
                'User Data Deleted Successfully',
                'User data has been deleted successfully. Please restart the app and register again to continue using it.',
                [
                    { text: 'Home', onPress: () => this.props.navigation.navigate("Home1Screen") },
                    { text: 'Exit', onPress: () => BackHandler.exitApp() }
                ]
            );
        } else {
            Alert.alert(
                'User Data Deleted Successfully',
                'User data has been deleted successfully. Please restart the app and register again to continue using it.',
                [
                  { text: 'Home', onPress: () => this.props.navigation.navigate("Home1Screen") },
                  { text: 'Exit', onPress: () => BackHandler.exitApp() }
                ],
                { cancelable: false } // Ensures that the user cannot dismiss the alert by tapping outside of it
              );
        }
    };

    // confirmButton = async () => {
    //     this.setState({ modalVisible: false });

    //     if (this.state.userLoginData === null) {
    //         this.setState({ modalVisible1: true });
    //     } else {
    //         this.setState({ showActivityIndicator: true });

    //         try {
    //             const requestOptions = {
    //                 method: "DELETE",
    //                 redirect: "follow"
    //             };

    //             fetch(`https://weaclimsolutions.com/getuserdetails.php?task=delete_user&username_or_email=${this.state.userLoginData}`, requestOptions)
    //                 .then((response) => response.json())
    //                 .then((result) => {
    //                     console.warn(result);
    //                     this.setState({ showActivityIndicator: false });
    //                     this.props.logOutCall(this);

    //                 })
    //                 console.warn("Hello");
    //                 await AsyncStorage.clear()
    //                 this.handleLogout()



    //         } catch (error) {
    //             console.error("Error clearing AsyncStorage:", error);
    //         }
    //     }
    // };

    // handleLogout = () => {
    //     // this.props.navigation.navigate("Home1Screen");


    // };

    LoginButton = () => {
        this.setState({ modalVisible1: false });
        this.props.navigation.navigate('LoginScreen');
    };

    HomeButton = () => {
        this.setState({ modalVisible1: false });
        this.props.navigation.navigate('Home1Screen');
    };
    userDetails = async () => {
        const userDataString = await AsyncStorage.getItem('userData');
        const userDataJSON = await JSON.parse(userDataString);
        this.setState({ userLoginData: userDataJSON.username });
    };

    render() {
        const { modalVisible, modalVisible1, showActivityIndicator } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../images/Logo/AppLogo.png')} style={styles.logo} />
                </View>

                <Text style={styles.deleteText}>Delete Your User Account</Text>

                <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        style={[styles.button, styles.confirmButton]}
                        onPress={this.HomeButton}
                    >
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
                {showActivityIndicator && (
                    <View style={styles.actvityIndicator}>
                        <ActivityIndicator size={'large'} color={'#447ef2'} />
                        <Text style={{ marginTop: 12, marginLeft: 8 }}>Please Wait...</Text>
                    </View>
                )}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                    }}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.alertText}>Are you sure you want to delete your account?</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={this.cancelButton}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.confirmButton]}
                                    onPress={this.confirmButton}
                                >
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible1}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.alertText}>Please Sign Up or Log In Your Account.</Text>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={this.LoginButton}
                            >
                                <Text style={styles.buttonText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const getSessionId = (state) => state.userData.sessionId
const getUserData = (state) => state.userData.user

const getUserDataFun = createSelector(
    [getUserData],
    (getUserData) => {
        return getUserData
    }
)
const getSessionIdFun = createSelector(
    [getSessionId],
    (getSessionId) => {
        return getSessionId
    }
)

const mapStateToProps = state => ({
    sessionId: getSessionIdFun(state),
    userData: getUserDataFun(state),

})

const mapDispatchToProps = dispatch => ({
    logOutCall: (th) => {
        dispatch(async dispatch => {

            await logOut(dispatch, th);

            th.props.navigation.dispatch(DrawerActions.closeDrawer());

        })

    },

  

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center'
    },
    logoContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100, // Adjust according to your logo size
        height: 100, // Adjust according to your logo size
        marginBottom: 20,
    },
    deleteText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        minWidth: 300,
        marginHorizontal: 10
    },
    alertText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    confirmButton: {
        backgroundColor: "#0478ED",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    actvityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountDelete)


