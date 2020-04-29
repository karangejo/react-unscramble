import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Row from "./row";

function shuffle(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class Scramble extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { correct: props.elements, elements: shuffle(props.elements) };
  }

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
    if (JSON.stringify(newElements) === JSON.stringify(this.state.correct)) {
      console.log("CORRECT!");
    }
    this.setState({ elements: newElements });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row elements={this.state.elements} />
      </DragDropContext>
    );
  }
}

export default Scramble;
