import React, { Component } from "react";
import { Text, View } from "react-native";
import { Recipe } from "../models/Recipe";
import api from "../api/api";
import { catchError, of, take } from "rxjs";
import { SearchResponse } from "../models/SearchResponse";

interface SearchScreenProps {}
interface SearchScreenState {
  recipes: Recipe[];
}

export class SearchScreen extends Component<
  SearchScreenProps,
  SearchScreenState
> {
  constructor(props: object) {
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
          const recipes = response.hits.map((hit) => hit.recipe);
          this.setState({ recipes });
        }
      });
  }

  componentDidMount(): void {
    this.getRecipes({ q: "chicken" });
  }

  render() {
    const resultList = this.state.recipes.map((recipe, index) => (
      <Text key={index}> {recipe.label}</Text>
    ));

    return (
      <View>
        <Text> Search Screen</Text>
        {resultList}
      </View>
    );
  }
}

export default SearchScreen;
