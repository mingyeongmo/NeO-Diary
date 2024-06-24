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
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
  background: #fff;
  overflow: hidden;
`;

export const TopAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TopArea = styled.div`
  width: 90%;
  display: flex;
  padding: 30px 0 20px;
  border-bottom: 1px solid black;
`;

export const TitleInput = styled.input`
  width: 100%;
  border-width: 0;
  font-size: 2rem;
  padding: 0;
  outline: none;
  text-align: center;
  flex: 1;
  &::placeholder {
    text-align: center;
  }
`;

export const Weather = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 2rem;
  text-align: center;
  flex: 1;
`;

export const AttachFileBtn = styled.label`
  cursor: pointer;
`;

export const RemoveFileBtn = styled.label`
  cursor: pointer;
  margin-left: 10px;
`;

export const AttachFileInput = styled.input`
  display: none;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

export const NoneImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #dedede;
`;

export const PhotoArea = styled.div`
  width: auto;
  height: 350px;
  min-height: 350px;
  margin: 0 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TextArea = styled.div`
  width: auto;
  height: 100%;
  margin: 35px;
`;

export const Button = styled.button``;
