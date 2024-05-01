import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Recipe } from "../models/Recipe";

interface RecipeRowProps {
  recipe: Recipe;
  didSelectRecipe: (recipe: Recipe) => void;
}

export default class RecipeRow extends Component<RecipeRowProps> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.didSelectRecipe(this.props.recipe)}
        >
          <Image
            style={styles.image}
            source={{ uri: this.props.recipe.image }}
          />
          <Text>{this.props.recipe.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 6,
  },
  image: {
    height: "100%",
    borderRadius: 4,
  },
});
