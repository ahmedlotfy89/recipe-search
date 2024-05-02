import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Recipe } from "../models/Recipe";

interface DetailsScreenProps {
  recipe: Recipe;
}

export default class DetailsScreen extends Component<DetailsScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Recipe Title...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
