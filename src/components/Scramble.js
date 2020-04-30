import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Row from "./row";

function shuffle(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  if (JSON.stringify(array) === JSON.stringify(arr)) {
    return shuffle(array);
  } else {
    return array;
  }
}

class Scramble extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      name: props.game.name,
      currentScrambleIndex: 0,
      correct: props.game.scrambles[0].scramble,
      elements: shuffle(props.game.scrambles[0].scramble),
      finished: false,
    };
  }

  nextQuestion = () => {
    let newIndex = this.state.currentScrambleIndex + 1;
    if (newIndex >= this.props.game.scrambles.length) {
      this.setState({ finished: true });
      this.props.finishedGame();
      return;
    }
    let newScramble = this.props.game.scrambles[newIndex].scramble;
    this.setState({
      correct: newScramble,
      elements: shuffle(newScramble),
      currentScrambleIndex: newIndex,
    });
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newElements = Array.from(this.state.elements);
    newElements.splice(source.index, 1);
    newElements.splice(destination.index, 0, draggableId);

    this.setState({ elements: newElements });
    if (JSON.stringify(newElements) === JSON.stringify(this.state.correct)) {
      this.nextQuestion();
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row
          elements={this.state.elements}
          prompt={
            this.state.game.scrambles[this.state.currentScrambleIndex].name
          }
          setTime={this.props.setTime}
        />
      </DragDropContext>
    );
  }
}

export default Scramble;
