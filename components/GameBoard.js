import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
// import HorizontalHighlight from "./HorizontalHighlight";
import ResetButton from "./ResetButton";
// import VerticalHighlight from "./VerticalHighlight";
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

    this.state = {
      allSelected: [],
      // diagonalWin: undefined,
      horizontalWin: undefined,
      isWin: false,
      player1Selected: [],
      player2Selected: [],
      turn: 1,
      verticalWin: undefined,
    };
  }

  handlePress = (selected) => {
    const { isWin, turn, allSelected } = this.state;

    if (isWin || allSelected.includes(selected)) {
      return null;
    }

    const playerSelected = `player${turn}Selected`;

    this.setState(
      {
        allSelected: [...allSelected, selected],
        [playerSelected]: [...this.state[playerSelected], selected],
      },
      () => {
        this.checkWin();
        this.changeTurn();
      }
    );
  };

  checkWin = () => {
    const { allSelected, turn } = this.state;

    const playerSelected = this.state[`player${turn}Selected`];

    const checkHorizontal = horizontal.map((letter) =>
      playerSelected.filter((square) => square.letter === letter)
    );
    const checkVertical = vertical.map((number) =>
      playerSelected.filter((square) => square.number === number)
    );

    const horizontalWin = checkHorizontal.find((cluster) => cluster.length === 3);
    const verticalWin = checkVertical.find((cluster) => cluster.length === 3);

    this.setState({
      horizontalWin: horizontalWin?.[0].letter,
      isWin: horizontalWin?.[0].letter || verticalWin?.[0].number,
      verticalWin: verticalWin?.[0].number,
    });
  };

  changeTurn = () => {
    const { turn } = this.state;
    const nextTurn = turn === 1 ? 2 : 1;

    this.setState({ turn: nextTurn });
  };

  handleReset = () => {
    this.setState({
      horizontalWin: undefined,
      isWin: false,
      allSelected: [],
      verticalWin: undefined,
    });
  };

  render() {
    const { horizontalWin, isWin, player1Selected, player2Selected, verticalWin } = this.state;

    return (
      <View style={styles.container}>
        {squares.map((square) => {
          let selected;

          if (player1Selected.includes(square)) {
            selected = "selected1";
          } else if (player2Selected.includes(square)) {
            selected = "selected2";
          }

          return (
            <Square
              key={square.id}
              data={square}
              handlePress={this.handlePress}
              selected={selected}
            />
          );
        })}

        {isWin && <ResetButton handleReset={this.handleReset} />}
        {/* {horizontalWin && <HorizontalHighlight winningRow={horizontalWin} />} */}
        {/* {verticalWin && <VerticalHighlight winningColumn={verticalWin} />} */}
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
    paddingTop: 120,
    paddingBottom: 120,
  },
});
