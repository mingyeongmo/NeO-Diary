import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  max-width: 700px;
  margin: 50px auto;

  gap: 10px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  /* margin-bottom: 20px; */
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
  background: #fff;
  overflow: hidden;
`;

export const BtnArea = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  width: 150px;
  height: 30px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #a97bf5;
  border: none;
  cursor: pointer;
`;
