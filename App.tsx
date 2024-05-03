import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import SearchScreen from "./src/screens/SearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createNativeStackNavigator();
export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Recipes Search" component={SearchScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
