import React from "react";
import { StyleSheet, View } from "react-native";
import { string } from "prop-types";


// Left over from an early draft of the UI.  Keeping in case overlay styles are needed.
const HorizontalHighlight = ({ winningRow }) => {
  const wrapperStyle = [styles.horizontalWrapper, styles[`row${winningRow}`]];
  return (
    <View style={wrapperStyle}>
      <View opacity={0.5} style={styles.horizontal} />
    </View>
  );
};

HorizontalHighlight.propTypes = {
  winningRow: string,
};

export default HorizontalHighlight;

const styles = StyleSheet.create({
  horizontalWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    width: "95%",
  },
  horizontal: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "yellow",
    height: 235,
  },
  rowA: {
    top: 0,
  },
  rowB: {
    top: "33%",
  },
  rowC: {
    top: "66%",
  },
});
