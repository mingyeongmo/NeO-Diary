import { useState } from "react";
import styled from "styled-components";

interface EditTextAreaProps {
  diaryContent: string;
}

const EditTextArea = ({ diaryContent }: EditTextAreaProps) => {
  const [editContent, setEditContent] = useState(diaryContent);
  return (
    <TextAreaContainer>
      <textarea
        value={editContent}
        maxLength={1500}
        onChange={(e) => setEditContent(e.target.value)}
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

export default EditTextArea;
