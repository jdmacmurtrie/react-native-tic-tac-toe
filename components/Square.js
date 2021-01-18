import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { func, shape, string } from "prop-types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Square = ({ data, handlePress, selected }) => {
  const touchableStyle = selected ? [styles.touchable, styles[selected]] : styles.touchable;

  return (
    <View style={styles.square}>
      <TouchableWithoutFeedback style={touchableStyle} onPress={() => handlePress(data)}>
        <Text>{data.text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

Square.propTypes = {
  data: shape({ id: string, text: string }),
  handlePress: func,
  selected: string,
};

export default Square;

const styles = StyleSheet.create({
  square: {
    flexBasis: 100,
    borderWidth: 1,
    backgroundColor: "white",
    height: "30%",
    margin: 10,
    borderRadius: 10,
  },
  selected1: {
    backgroundColor: "yellow",
  },
  selected2: {
    backgroundColor: "orange",
  },
  touchable: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
