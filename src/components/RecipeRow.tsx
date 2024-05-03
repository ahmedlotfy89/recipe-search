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
      <TouchableOpacity style={styles.container} onPress={() => this.props.didSelectRecipe(this.props.recipe)} activeOpacity={1}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{ uri: this.props.recipe.image }}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.title}>{this.props.recipe.label}</Text>
          <Text style={styles.source}>{this.props.recipe.source}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 6,
  },
  imageView: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  textView: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  source: {
    fontSize: 15,
    textAlign: "left",
  },
});
