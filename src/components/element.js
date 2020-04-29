import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin: 5px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "yellow")};
`;

export default function Element(props) {
  return (
    <Draggable draggableId={props.element} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.element}
        </Container>
      )}
    </Draggable>
  );
}
