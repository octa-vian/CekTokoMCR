import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 
import SwipeablePanel from 'react-native-sheets-bottom';
 
export default class SlidingUpPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeablePanelActive: false,
    };
  }
 
  componentDidMount = () => {
    this.openPanel();
  };
 
  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };
 
  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };
 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <SwipeablePanel
          fullWidth
          isActive={this.state.swipeablePanelActive}
          onClose={this.closePanel}
          onPressCloseButton={this.closePanel}
        >
          <PanelContent /> {/* Your Content Here */}
        </SwipeablePanel>
      </View>
    );
  }
}