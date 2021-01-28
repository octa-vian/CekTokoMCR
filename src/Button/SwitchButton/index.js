import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SwitchButton from 'switch-button-react-native';


class SearchBar extends Component {
    constructor(props) {
      super(props);
      
      this.state = { term: ''  }
    }
    
    render() {
      return(
        <View>
            <SwitchButton
                onValueChange={(val) => this.setState({ activeSwitch: val })}      // this is necessary for this component
                text1 = 'Buka'                        // optional: first text in switch button --- default ON
                text2 = 'Tutup'                       // optional: second text in switch button --- default OFF
                switchWidth = {120}                 // optional: switch width --- default 44
                switchHeight = {26}                 // optional: switch height --- default 100
                switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                switchBorderRadius = {12}          // optional: switch border radius --- default oval
                switchSpeedChange = {500}           // optional: button change speed --- default 100
                //switchBorderColor = '#d4d4d4'       // optional: switch border color --- default #d4d4d4
                switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
                // btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                btnBackgroundColor = 'red'      // optional: button background color --- default #00bcd4
                fontColor = 'black'               // optional: text font color --- default #b1b1b1
                activeFontColor = '#fff'            // optional: active font color --- default #fff
            />
            { this.state.activeSwitch === 1 ? console.log('view1') : console.log('view2') }     
        </View>

      )                                                                       
    }  
  }
  
  export default SearchBar;

const styles = StyleSheet.create({})
