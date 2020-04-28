import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  display: flex
`;

export default function Column(props) {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id} direction='horizontal'>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task, index) => {
              return <Task key={task.id} task={task} index={index} />;
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
