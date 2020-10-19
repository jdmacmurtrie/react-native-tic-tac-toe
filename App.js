import React from "react";
import { StyleSheet, View } from "react-native";
import GameBoard from "./components/GameBoard";

export default function App() {
  return (
    <View style={styles.container}>
      <GameBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
