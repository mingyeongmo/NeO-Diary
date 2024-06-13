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

export const TopArea = styled.div`
  width: 100%;
  display: flex;
  margin: 30px 0 20px;
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
  font-size: 2rem;
  text-align: center;
  flex: 1;
`;

export const BarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Bar = styled.div`
  width: 90%;
  height: 1px;
  background: black;
  margin-bottom: 30px;
`;

// export const ButtonContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   opacity: 0;
//   transition: opacity 0.3s;
//   background: rgba(0, 0, 0, 0.5); /* 반투명 배경 추가 */
//   border-radius: 15px; /* 원하는 radius 값 */
// `;

export const AttachFileBtn = styled.label``;

export const RemoveFileBtn = styled.label`
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
  &:hover .hover-buttons {
    opacity: 1;
  }
`;

export const NoneImage = styled.div`
  width: 100%;
  height: 100%;
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
