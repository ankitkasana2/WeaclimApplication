import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerWidth: new Animated.Value(0),
    };
  }

  openDrawer = () => {
    Animated.timing(this.state.drawerWidth, {
      toValue: 250, // Width of the drawer
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  closeDrawer = () => {
    Animated.timing(this.state.drawerWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { drawerWidth } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.drawer, { width: drawerWidth }]}>
          <TouchableOpacity style={styles.closeButton} onPress={this.closeDrawer}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen'); this.closeDrawer(); }}>
            <Text style={styles.drawerItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('SettingsScreen'); this.closeDrawer(); }}>
            <Text style={styles.drawerItem}>Settings</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.openButton} onPress={this.openDrawer}>
          <Text style={styles.openText}>Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    padding: 20,
    zIndex: 1000,
  },
  closeButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  closeText: {
    fontSize: 18,
    color: '#007BFF',
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 15,
  },
  openButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    position: 'absolute',
    top: 30,
    left: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  openText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CustomDrawer;
