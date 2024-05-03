import React, { Component } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { Filter } from "../models/Filter";

interface FilterViewProps {
  filter: string;
  didFilter: (filter: string) => void;
}

export default class FilterBarView extends Component<FilterViewProps> {
  constructor(props: FilterViewProps) {
    super(props);
  }

  handleChangeFilter(filter: string): void {
    this.props.didFilter(filter);
  }

  renderFilterButton(filter: string) {
    return (
      <Pressable
        style={[
          styles.filterItem,
          filter === this.props.filter && styles.selectedItem,
        ]}
        onPress={() => this.handleChangeFilter(filter)}
      >
        <Text>{filter}</Text>
      </Pressable>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={[Filter.all, Filter.low, Filter.keto, Filter.vegan]}
          renderItem={(filter) => this.renderFilterButton(filter.item)}
          keyExtractor={(recipe, index) => recipe + index}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  filterItem: {
    textAlign: "center",
    height: 35,
    width: 130,
    borderColor: "#000",
    borderWidth: 1,
    marginHorizontal: 9,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: "#EE5407",
  },
});
