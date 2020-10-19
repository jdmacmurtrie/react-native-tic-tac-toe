import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import HorizontalHighlight from "./HorizontalHighlight";
import Square from "./Square";

const squares = [
  { id: "A1", text: "A1", letter: "A", number: "1" },
  { id: "A2", text: "A2", letter: "A", number: "2" },
  { id: "A3", text: "A3", letter: "A", number: "3" },
  { id: "B1", text: "B1", letter: "B", number: "1" },
  { id: "B2", text: "B2", letter: "B", number: "2" },
  { id: "B3", text: "B3", letter: "B", number: "3" },
  { id: "C1", text: "C1", letter: "C", number: "1" },
  { id: "C2", text: "C2", letter: "C", number: "2" },
  { id: "C3", text: "C3", letter: "C", number: "3" },
];

const horizontal = ["A", "B", "C"];
const vertical = ["1", "2", "3"];

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);

    this.state = {
      diagonalBingo: undefined,
      horizontalBingo: undefined,
      selectedSquares: [],
      verticalBingo: undefined,
    };
  }

  handlePress(selected) {
    const { selectedSquares } = this.state;

    const newSelected = selectedSquares.includes(selected)
      ? selectedSquares.filter((square) => square.id !== selected.id)
      : selectedSquares.concat(selected);

    this.setState({ selectedSquares: newSelected }, () => {
      this.checkBingo();
    });
  }

  checkBingo() {
    const { selectedSquares } = this.state;

    const checkHorizontal = horizontal.map((letter) =>
      selectedSquares.filter((square) => square.letter === letter)
    );
    const checkVertical = vertical.map((number) =>
      selectedSquares.filter((square) => square.number === number)
    );

    const horizontalBingo = checkHorizontal.find((cluster) => cluster.length === 3);
    const verticalBingo = checkVertical.find((cluster) => cluster.length === 3);

    if (horizontalBingo) {
      this.setState({ horizontalBingo: horizontalBingo[0].letter });
    }
    if (verticalBingo) {
      this.setState({ verticalBingo: verticalBingo[0].number });
    }
  }

  render() {
    const { horizontalBingo, selectedSquares, verticalBingo } = this.state;
    console.log(horizontalBingo);
    return (
      <View style={styles.container}>
        {squares.map((square) => {
          const selected = selectedSquares.includes(square);

          return (
            <Square
              key={square.id}
              data={square}
              handlePress={this.handlePress}
              selected={selected}
            />
          );
        })}

        {horizontalBingo && <HorizontalHighlight winningRow={horizontalBingo} />}
        {/* {verticalBingo && <View style={styles.vertical} />} */}
      </View>
    );
  }
}

export default GameBoard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#87CEFA",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
