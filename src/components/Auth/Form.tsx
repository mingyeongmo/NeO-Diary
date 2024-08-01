import styled, { css } from "styled-components";

export const UserAuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Wrapper = styled.div<{ mode: "login" | "register" }>`
  width: 450px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  --tw-shadow: 0 10px 15px -1px rgb(0 0 0 / 0.1),
    0 4px 6px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  p {
    font-size: 18px;
  }

  ${(props) =>
    props.mode === "login" &&
    css`
      height: 320px;
    `}

  ${(props) =>
    props.mode === "register" &&
    css`
      height: 400px;
    `}
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  width: 100%;
  color: #9990ff;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .firstInputContainer {
    margin: 0;
  }
  .Container {
    width: 100%;
    height: 100%;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  position: relative;

  i {
    position: absolute;
    top: 50%;
    right: 3%;
    cursor: pointer;
  }
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 10px 12px;

  border: 1px solid rgb(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 100%;
  height: 100%;
  max-height: 50px;
  box-sizing: border-box;
  font-size: 1rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  width: 100%;
  color: #ffffff;
  background: #9990ff;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  .question {
    margin-right: 5px;
  }
  a {
    color: #9990ff;
    text-decoration-line: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;
