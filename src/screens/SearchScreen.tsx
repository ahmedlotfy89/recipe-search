import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
} from "react-native";
import { Recipe } from "../models/Recipe";
import api from "../api/api";
import { catchError, count, of, take } from "rxjs";
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
  loading: boolean;
  loadingExtraData: boolean;
  from: number;
  to: number;
  count: number;
  pageSize: number;
}

export default class SearchScreen extends Component<
  SearchScreenProps,
  SearchScreenState
> {
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = {
      searchText: "",
      recipes: [],
      filter: Filter.all,
      loading: false,
      loadingExtraData: false,
      from: 0,
      to: 10,
      count: Number.MAX_VALUE,
      pageSize: 10,
    };
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
          this.setState({
            recipes:
              this.state.to > this.state.pageSize
                ? [...this.state.recipes, ...recipes]
                : recipes,
            to: response.to,
            from: response.from,
            count: response.count,
            loading: false,
          });
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
    this.setState({ searchText: text, recipes: [], loading: true });
    this.getRecipes({ q: text });
  }

  handleFilter(filter: string) {
    this.setState({ filter, recipes: [], loading: true });
    if (this.state.searchText.length === 0) {
      return;
    }

    this.getRecipes({
      q: this.state.searchText,
      ...getFilterApiKey(filter as Filter),
    });
  }

  handleLoadMore() {
    const from = this.state.to;
    const to = Math.min(this.state.to + this.state.pageSize, this.state.count);
    if (to <= from || from > this.state.count) {
      return;
    }

    this.setState({ from, to, loading: true });
    this.getRecipes({
      q: this.state.searchText,
      ...getFilterApiKey(this.state.filter as Filter),
      from,
      to,
    });
  }

  renderRecipeList() {
    return (
      <RecipeList
        recipes={this.state.recipes}
        didSelectRecipe={(recipe: Recipe) => {
          this.navigateToDetails(recipe);
        }}
        loadMoreRecipes={() => {
          this.handleLoadMore();
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
        <View style={styles.footer}>
          {this.state.loading && <ActivityIndicator />}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#94b0b7",
  },
  footer: {
    height: 20,
  },
});
