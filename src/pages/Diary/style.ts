import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  padding: 50px 30px 0;
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: auto;

  gap: 10px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleInput = styled.input`
  width: 400px;
  border-width: 0 0 0px;
  font-size: 2rem;
  margin-bottom: 10px;
  outline: none;
  text-align: center;
  /* border: none; */
  &::placeholder {
    text-align: center;
  }
`;

export const AttachFileBtn = styled.label``;

export const AttachFileInput = styled.input`
  display: none;
`;

export const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const Weather = styled.div`
  border: 1px solid blue;
`;

export const PreviewImage = styled.img`
  width: 300px;
  height: 500px;
  object-fit: cover;
`;

export const PhotoArea = styled.div`
  width: 100%;
  height: 900px;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
`;

export const Button = styled.button``;
