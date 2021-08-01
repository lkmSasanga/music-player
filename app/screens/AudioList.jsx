import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { AudioContext } from "../context/AudioProvider";

export default class AudioList extends Component {
  static contextType = AudioContext;
  render() {
    return (
      <ScrollView>
        {this.context.audioFiles.map(item => (
          <Text
            style={{
              padding: 10,
              borderBottomColor: "blue",
              borderBottomWidth: 2,
            }}
            key={item.id}
          >
            {item.filename}
          </Text>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
