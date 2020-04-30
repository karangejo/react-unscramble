import styled from "styled-components";

const textInput = styled.input.attrs((props) => ({
  type: "text",
}))`
  margin:10px;
  padding: 10px;
  width: 100%;
  font-size: 18px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;

  &:focus {
    border-bottom-color: #e5195f;
    outline: 0;
  }
`;

export default textInput;
