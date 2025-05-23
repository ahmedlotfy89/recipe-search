import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { Recipe } from "../models/Recipe";
interface DetailsScreenProps {
  route: {
    params: {
      recipe: Recipe;
    };
  };
}

export default class DetailsScreen extends Component<DetailsScreenProps> {
  constructor(props: DetailsScreenProps) {
    super(props);
  }

  handleWebsitePressed = () => {
    Linking.canOpenURL(this.props.route.params.recipe.url).then((supported) => {
      if (supported) {
        Linking.openURL(this.props.route.params.recipe.url);
      } else {
        console.log(
          "Error on opening URL: " + this.props.route.params.recipe.url
        );
      }
    });
  };

  caloriesAndWeight() {
    const calories = this.props.route.params.recipe.calories;
    const roundCalories = Math.round(calories * 100) / 100;
    const totalWeight = this.props.route.params.recipe.totalWeight;
    const roundWeight = Math.round(totalWeight * 100) / 100;
    return "Calories: " + roundCalories + ` / ` + roundWeight;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.props.route.params.recipe.image }}
        />
        <Text style={styles.title}>{this.props.route.params.recipe.label}</Text>
        <Text style={styles.text}>{this.caloriesAndWeight()}</Text>
        <Text style={styles.text}>
          Total Time: {this.props.route.params.recipe.totalTime}
        </Text>
        <Pressable
          style={styles.bottomView}
          onPress={this.handleWebsitePressed}
        >
          <Text style={styles.buttonText}>Recipe Website</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "30%",
  },
  title: {
    fontSize: 20,
    margin: 8,
    textAlign: "left",
  },
  text: {
    fontSize: 15,
    marginHorizontal: 8,
    textAlign: "left",
    lineHeight: 25,
  },
  bottomView: {
    width: "90%",
    height: 50,
    backgroundColor: "#EE5407",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
