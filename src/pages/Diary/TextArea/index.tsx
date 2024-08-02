import React from "react";
import styled from "styled-components";

interface TextAreaProps {
  diaryContent: string;
  onDiaryContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ diaryContent, onDiaryContentChange }: TextAreaProps) => {
  return (
    <TextAreaContainer>
      <textarea
        value={diaryContent}
        maxLength={1500}
        onChange={onDiaryContentChange}
        placeholder="내용을 입력해주세요"
        style={{
          width: "100%",
          height: "100%",
          padding: "20px",
          fontSize: "16px",
          resize: "none",
          boxSizing: "border-box",
          outline: "none",
          borderRadius: "15px",
        }}
      />
    </TextAreaContainer>
  );
};
const TextAreaContainer = styled.div`
  width: auto;
  height: 100%;
  margin: 35px 35px 0;
`;

export default TextArea;
