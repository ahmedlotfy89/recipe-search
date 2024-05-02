import React, { Component } from "react";
import { StyleSheet, FlatList, ListRenderItemInfo, View } from "react-native";
import { Recipe } from "../models/Recipe";
import RecipeRow from "./RecipeRow";

interface RecipeListProps {
  recipes: Recipe[];
  didSelectRecipe: (recipe: Recipe) => void;
  loadMoreRecipes: () => void;
}

export default class RecipeList extends Component<RecipeListProps> {
  constructor(props: RecipeListProps) {
    super(props);
  }

  renderItemComponent(recipe: ListRenderItemInfo<Recipe>) {
    return (
      <RecipeRow
        recipe={recipe.item}
        didSelectRecipe={(recipe: Recipe) => this.props.didSelectRecipe(recipe)}
      />
    );
  }

  recipeItemKey(recipe: Recipe, index: number) {
    return `${index}_${recipe.totalTime}`;
  }

  itemSeparator() {
    return <View style={styles.separator} />;
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.recipes}
        renderItem={(recipe) => this.renderItemComponent(recipe)}
        keyExtractor={(recipe, index) => this.recipeItemKey(recipe, index)}
        ItemSeparatorComponent={this.itemSeparator}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0}
        onEndReached={() => this.props.loadMoreRecipes()}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#4a707a",
  },
  separator: {
    height: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
  },
});
