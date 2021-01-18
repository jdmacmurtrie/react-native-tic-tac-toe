import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { func } from "prop-types";

const ResetButton = ({ handleReset }) => (
  <View style={styles.container}>
    <TouchableHighlight onPress={() => handleReset()}>
      <Text style={styles.text}>RESET</Text>
    </TouchableHighlight>
  </View>
);

ResetButton.propTypes = {
  handleReset: func,
};

export default ResetButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    marginTop: 40,
  },
  text: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 25,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "red",
  },
});
