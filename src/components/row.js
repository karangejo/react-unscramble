import React from "react";
import { animated, useSpring, config } from "react-spring";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Element from "./element";
import Card from "./card";
import Timer from "./timer";
import ResponsiveImage from "./responsiveImage";
import { isMobile } from "react-device-detect";

const imageServer = "http://localhost:8080/";

const ElementList = styled.div`
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  display: flex;
  justify-content: center;
`;

const Prompt = styled.div`
  font-size: 4vw;
  text-align: center;
`;

export default function Row(props) {
  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={fade}>
      <Card
        style={{
          height: "90vh",
          width: "80vw",
          justifyContent: "space-evenly",
        }}
      >
        <Card>
          <Prompt>{props.prompt}</Prompt>
        </Card>
        {props.image ? (
          <ResponsiveImage
            src={imageServer + props.image}
            width={isMobile ? 100 : 300}
            height={isMobile ? 100 : 300}
          />
        ) : null}

        <Card style={{ padding: "0px", justifyContent: "center" }}>
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
        <Timer setTime={props.setTime} />
      </Card>
    </animated.div>
  );
}
