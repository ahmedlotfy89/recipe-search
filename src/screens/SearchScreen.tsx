import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Recipe } from "../models/Recipe";
import api from "../api/api";
import { catchError, of, take } from "rxjs";
import { SearchResponse } from "../models/SearchResponse";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import RecipeList from "../components/RecipeList";
import SearchBarView from "../components/SearchBarView";
import { Filter, getFilterApiKey } from "../models/Filter";
import FilterBarView from "../components/FiIterBarView";

interface SearchScreenProps {
  navigation: NavigationProp<ParamListBase>;
}
interface SearchScreenState {
  recipes: Recipe[];
  searchText: string;
  filter: string;
}

export default class SearchScreen extends Component<
  SearchScreenProps,
  SearchScreenState
> {
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = { searchText: "", recipes: [], filter: Filter.all };
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

  navigateToDetails(recipe: Recipe) {
    const { navigation } = this.props;
    navigation.navigate("DetailsScreen", { recipe });
  }

  handleSearch(text: string) {
    this.getRecipes({ q: text });
    this.setState({ searchText: text });
  }

  handleFilter(filter: string) {
    this.getRecipes({
      q: this.state.searchText,
      ...getFilterApiKey(filter as Filter),
    });
    this.setState({ filter });
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
    return (
      <SafeAreaView style={styles.container}>
        <SearchBarView
          text={this.state.searchText}
          didSearch={(text) => this.handleSearch(text)}
        />
        <FilterBarView
          filter={this.state.filter}
          didFilter={(text) => this.handleFilter(text)}
        />
        {this.renderRecipeList()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#abf",
  },
});
