import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Recipe } from "../models/Recipe";
import api from "../api/api";
import { catchError, of, take } from "rxjs";
import { SearchResponse } from "../models/SearchResponse";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import RecipeList from "../components/RecipeList";

interface SearchScreenProps {
  navigation: NavigationProp<ParamListBase>;
}
interface SearchScreenState {
  recipes: Recipe[];
}

export default class SearchScreen extends Component<
  SearchScreenProps,
  SearchScreenState
> {
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = { recipes: [] };
  }

  getRecipes(params: object) {
    api
      .get<SearchResponse>("search", params)
      .pipe(
        take(1),
        catchError((err) => of(console.log(err)))
      )
      .subscribe((response) => {
        if (response) {
          const recipes = response.hits.map((hit) =>
            this.mapToRecipe(hit.recipe)
          );
          this.setState({ recipes });
        }
      });
  }

  mapToRecipe(recipe: Recipe) {
    const { label, image, source, calories, totalWeight, totalTime, url } =
      recipe;
    return { label, image, source, calories, totalWeight, totalTime, url };
  }

  componentDidMount(): void {
    this.getRecipes({ q: "chicken" });
  }

  navigateToDetails(recipe: Recipe) {
    const { navigation } = this.props;
    navigation.navigate("DetailsScreen", { recipe });
  }

  renderRecipeList() {
    return (
      <RecipeList
        recipes={this.state.recipes}
        didSelectRecipe={(recipe: Recipe) => {
          this.navigateToDetails(recipe);
        }}
      />
    );
  }

  render() {
    return <View style={styles.container}>{this.renderRecipeList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#abf",
    alignItems: "center",
    justifyContent: "center",
  },
});
