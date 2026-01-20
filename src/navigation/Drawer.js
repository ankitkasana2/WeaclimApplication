import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { REMOVE_USER, logOut } from '../redux/actions/actions';
import userData from '../redux/reducers/userData';
import { DrawerActions } from 'react-navigation-drawer';




// const initialState = {
//     sessionId: '',
//     user: {}
//   }

// const Drawer=()=>{
class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,


        }
    }

    // handleLogout = () => {

    //     this.props.navigation.navigate('Home1Screen');
    // }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MembershipScreen')} >
                        <View>
                            <Text style={styles.text}>membership</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen')}>
                        <View>
                            <Text style={styles.text}>about us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUsScreen')}>
                        <View>
                            <Text style={styles.text}>contact us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')}>
                        <View>
                            <Text style={styles.text}>my profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsScreen')}>
                        <View>
                            <Text style={styles.text}>news & nulletins</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FaqScreen')}>
                        <View>
                            <Text style={styles.text}>faq</Text>
                        </View>
                    </TouchableOpacity>

                    {/* {this.state.isLoggedIn ? ( */}
                    {Object.keys(this.props.userData).length > 0 ? (

                        <TouchableOpacity onPress={() => this.props.logOutCall(this)}>
                            <View>
                                <Text style={styles.text}>log out</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <View>
                                <Text style={styles.text}>log in</Text>
                            </View>
                        </TouchableOpacity>
                    )

                    }
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('AccountDelete')}>
                        <View>
                            <Text style={styles.text}>Delete Account</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
        // }
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

// const mapDispatchToProps = dispatch => ({

//     logoutUser: (data, th) => {
//         dispatch({
//             type: REMOVE_USER,
//             payload: data
//         })
//         th.props.navigation.pop()
//     }
// })

const mapDispatchToProps = dispatch => ({
    logOutCall: (th) => {
        dispatch(async dispatch => {
           
            await logOut(dispatch, th);

            th.props.navigation.dispatch(DrawerActions.closeDrawer());

        })

    },
    


})


const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15,
        color: 'black',
        textTransform: 'uppercase',
        marginTop: 8
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
// export default Drawer;