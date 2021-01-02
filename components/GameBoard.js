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
      allSelections: [],
      gameOver: false,
      player1Selections: [],
      player2Selections: [],
      turn: 1,
    };
  }

  get playerSelections() {
    const { turn } = this.state;

    return this.state[`player${turn}Selections`];
  }

  handlePress = (selected) => {
    const { gameOver, turn, allSelections } = this.state;

    if (gameOver || allSelections.includes(selected)) {
      return null;
    }

    const currentplayer = `player${turn}Selections`;
    const newAllSelections = [...allSelections, selected];

    this.setState(
      {
        allSelections: newAllSelections,
        [currentplayer]: [...this.playerSelections, selected],
      },
      () => {
        if (newAllSelections.length > 4) {
          this.checkWin();
        }
        if (newAllSelections.length !== 9) {
          this.changeTurn();
        } else {
          this.setState({ gameOver: true });
        }
      }
    );
  };

  checkWin = () => {
    // the following "check" methods create array clusters of letters or numbers belonging to the current player.
    // if a resultant cluster contains 3 objects, the current player wins.
    const checkHorizontal = horizontal.map((letter) =>
      this.playerSelections.filter((square) => square.letter === letter)
    );

    const checkVertical = vertical.map((number) =>
      this.playerSelections.filter((square) => square.number === number)
    );

    const horizontalWin = checkHorizontal.find((cluster) => cluster.length === 3);
    const verticalWin = checkVertical.find((cluster) => cluster.length === 3);
    const diagonalWin = this.checkDiagonal();

    this.setState({
      horizontalWin: horizontalWin?.[0].letter,
      gameOver: horizontalWin || verticalWin || diagonalWin,
      verticalWin: verticalWin?.[0].number,
    });
  };

  checkDiagonal = () => {
    // TODO make this more dynamic and less hard-coded
    const sequence1 = ["A1", "B2", "C3"];
    const sequence2 = ["A3", "B2", "C1"];

    const selectedIds = this.playerSelections.map((square) => square.id);

    if (!selectedIds.includes("B2")) {
      return false;
    }

    const matchingSquares1 = selectedIds.filter((id) => sequence1.includes(id));
    const matchingSquares2 = selectedIds.filter((id) => sequence2.includes(id));

    return matchingSquares1.length === 3 || matchingSquares2.length === 3;
  };

  changeTurn = () => {
    const { turn } = this.state;
    const nextTurn = turn === 1 ? 2 : 1;

    this.setState({ turn: nextTurn });
  };

  handleReset = () => {
    this.setState({
      gameOver: false,
      allSelections: [],
      player1Selections: [],
      player2Selections: [],
    });
  };

  render() {
    const { gameOver, player1Selections, player2Selections } = this.state;

    return (
      <View style={styles.container}>
        {squares.map((square) => {
          let selected;

          if (player1Selections.includes(square)) {
            selected = "selected1";
          } else if (player2Selections.includes(square)) {
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

        {gameOver && <ResetButton handleReset={this.handleReset} />}
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
