import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { editDiaryContentState } from "recoil/atoms/editDiaryState";
import styled from "styled-components";

interface EditContentAreaProps {
  diaryContent: string;
}

const EditContentArea = ({ diaryContent }: EditContentAreaProps) => {
  const [text, setText] = useRecoilState(editDiaryContentState);

  useEffect(() => {
    setText(diaryContent);
  }, [diaryContent, setText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <TextAreaContainer>
      <textarea
        value={text}
        maxLength={1500}
        onChange={handleChange}
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

export default EditContentArea;
