import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const AudioListItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.thumbnail}>
          <Text style={styles.thumbnailText}>A</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Title</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>
    </View>
  );
};

export default AudioListItem;
