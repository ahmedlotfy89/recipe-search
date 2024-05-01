import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SearchScreen from './src/screens/SearchScreen';
import { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchScreen/>
        <StatusBar style="auto" />
      </View>
    );  
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
