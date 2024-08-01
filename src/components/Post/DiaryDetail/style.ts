import styled from "styled-components";

export const TopAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .top {
    width: 90%;
    display: flex;
    padding: 30px 0 20px;
    border-bottom: 1px solid black;
    .date {
      display: flex;
      justify-content: flex-start;
      flex: 1;
      p {
        display: flex;
        justify-content: center;
        width: 165px;
        padding: 8px;
        border: 1px solid black;
        box-sizing: border-box;
        border-radius: 15px;
      }
    }
    .title {
      font-size: 2rem;
      flex: 1;
      text-align: center;
      white-space: nowrap;
    }
    .weather {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        border: 1px solid black;
        box-sizing: border-box;
        border-radius: 5px;
      }
    }
  }
`;

export const PhotoAreaContainer = styled.div`
  width: auto;
  height: 350px;
  min-height: 350px;
  margin: 35px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

export const TextAreaContainer = styled.div`
  width: auto;
  height: 100%;
  margin: 0px 35px;
`;
