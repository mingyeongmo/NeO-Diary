import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
`;

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  width: 100%;
`;

export const InputContainer = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 25px;
  position: relative;
  i {
    position: absolute;
    top: 15%;
    right: 3%;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  padding: 10px 10px;
  border: 0px;
  border-bottom: 1px solid gray;

  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 1rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
`;

export const Switcher = styled.span`
  margin-top: 20px;
`;
