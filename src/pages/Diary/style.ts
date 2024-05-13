import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  padding: 50px 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: auto;

  gap: 10px;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  /* grid-template-columns: repeat(2, 1fr); */
`;

export const LeftContent = styled.div`
  width: 50%;
  border: 1px solid black;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background: #fff;
  overflow: hidden;
`;

export const RightContent = styled.div`
  width: 50%;
  border: 1px solid black;
  border-left: 0px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #fff;
  overflow: hidden;
`;

export const TitleInput = styled.input`
  width: 100%;
  border-width: 0;
  font-size: 2rem;
  margin-bottom: 10px;
  padding: 0;
  outline: none;
  text-align: center;
  &::placeholder {
    text-align: center;
  }
`;

export const Weather = styled.div`
  width: 100%;
  /* border: 1px solid black; */
`;

export const AttachFileBtn = styled.label``;

export const RemoveFileBtn = styled.label``;

export const AttachFileInput = styled.input`
  display: none;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

export const PhotoArea = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  flex-direction: column;
`;
export const TextArea = styled.div`
  width: 100%;
  height: 100%;
`;

export const Button = styled.button``;
