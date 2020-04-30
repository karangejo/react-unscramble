import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Element from "./element";
import Card from "./card";

const ElementList = styled.div`
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  display: flex;
  justify-content: center;
`;

const Prompt = styled.div`
  font-size: 5vw;
`;

export default function Row(props) {
  return (
    <>
      <Card>
        <Prompt>{props.prompt}</Prompt>
      </Card>
      <Card style={{ padding: "0px" }}>
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
      </Card>
    </>
  );
}
