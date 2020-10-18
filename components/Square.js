import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { string, func, bool, shape } from "prop-types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const Square = ({ data, handlePress, selected }) => {
  const handleSelect = () => {
    handlePress(data);
  };

  const touchableStyle = selected ? [styles.touchable, styles.selected] : styles.touchable;

  return (
    <View style={styles.square}>
      <TouchableWithoutFeedback style={touchableStyle} onPress={handleSelect}>
        <Text>{data.text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

Square.propTypes = {
  handlePress: func,
  selected: bool,
  data: shape({ id: string, text: string }),
};

export default Square;

const styles = StyleSheet.create({
  square: {
    flexGrow: 1,
    flexBasis: "25%",
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "white",
    height: "30%",
    margin: 10,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "yellow",
  },
  touchable: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
