import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface SearchBarProps {
  text: string;
  didSearch: (text: string) => void;
}

export default class SearchBarView extends Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholderTextColor="gray"
          placeholder="Search.."
          value={this.props.text}
          onChangeText={(text: string) => this.props.didSearch(text)}
        />
      </View>
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
  searchBarContainer: {
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: 8,
    marginVertical: 12,
    borderWidth: 2,
    borderRadius: 3,
    height: 40,
    backgroundColor: "#fff",
    borderColor: "#999",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    fontSize: 15,
    color: "#000",
    borderWidth: 0,
    textAlign: "left",
  },
});
