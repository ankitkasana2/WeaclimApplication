import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        
    }
  
  render() {

    return (
       <View>
        
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color='black'  />
                <Text style={[styles.title,]}>{this.props.title}</Text>
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text style={{color:'black'}}>{this.props.data}</Text>    
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        padding:Platform.OS==='ios'?10: 5,
        marginRight: 10,
        textAlign:Platform.OS==='ios'?'justify':null,
        marginVertical: 15,
        lineHeight: 20,
        
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:Platform.OS==='ios'?null:56,
        paddingLeft:10,
        paddingRight:18,
        alignItems:'center',       
       marginVertical: 15
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%',
    },
    child:{
        
        padding:16,
        paddingLeft: 40,
        
    
    }
    
});