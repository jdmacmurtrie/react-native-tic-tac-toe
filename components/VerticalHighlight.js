import React from "react";
import { StyleSheet, View } from "react-native";
import { string } from "prop-types";

// Left over from an early draft of the UI.  Keeping in case overlay styles are needed.
const VerticalHighlight = ({ winningColumn }) => {
  const wrapperStyle = [styles.verticalWrapper, styles[`column${winningColumn}`]];

  return (
    <View style={wrapperStyle}>
      <View opacity={0.5} style={styles.vertical} />
    </View>
  );
};

VerticalHighlight.propTypes = {
  winningColumn: string,
};

export default VerticalHighlight;

const styles = StyleSheet.create({
  verticalWrapper: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
  vertical: {
    borderRadius: 10,
    width: "33%",
    backgroundColor: "yellow",
    height: "100%",
    top: 10,
  },
  column1: {
    width: "90%",
  },
  column2: {
    left: "33%",
  },
  column3: {
    left: "66%",
  },
});
