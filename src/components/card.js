import styled from "styled-components";

const Card = styled.div`
  overflow: hidden;
  font-family: Oxygen;
  padding: 12px;
  margin: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5195f;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    background-color: rgba(229, 25, 95, 0.05);
  }
`;

export default Card;
