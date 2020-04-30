import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: block;
  margin: 8px;
  padding: 2px;
  font-size: 14px;
  font-weight: 700;
  font-family: Oxygen;
  background-color: rgba(229, 25, 95, 0.15);
  border: 1px solid #e5195f;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
    background-color: rgba(229, 25, 95, 0.5);

  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

function IconButton(props) {
  return (
    <Button onClick={props.onClick}>
      <Image src={props.icon} alt="icon for button" /><br/>
      {props.children}
    </Button>
  );
}

export default IconButton;
