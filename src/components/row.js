import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Element from "./element";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: fit-content;
`;
const ElementList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "orange")};
  display: flex;
  justify-content: center;
`;

export default function Row(props) {
  return (
    <Container>
      <Droppable droppableId={"droppableID"} direction="horizontal">
        {(provided, snapshot) => (
          <ElementList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.elements.map((elem, index) => {
              return <Element key={elem} element={elem} index={index} />;
            })}
            {provided.placeholder}
          </ElementList>
        )}
      </Droppable>
    </Container>
  );
}
