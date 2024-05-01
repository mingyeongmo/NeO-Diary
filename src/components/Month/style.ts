import styled from "styled-components";

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const Box = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;
