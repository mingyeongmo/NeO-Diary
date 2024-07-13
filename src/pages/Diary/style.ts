import styled from "styled-components";

export const DiaryContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 750px;
  margin: 30px auto;
  gap: 10px;
`;

export const Content = styled.div`
  width: 100%;
  height: 1050px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
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
  border-radius: 10px;
  font-weight: 600;
  color: white;
  background: #9990ff;
  border: none;
  cursor: pointer;
`;
