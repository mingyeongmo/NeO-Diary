import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import styled from "styled-components";

const MyPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [initialData, setInitialData] = useState({ name: "", email: "" });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName = user.displayName || "";
        const userEmail = user.email || "";

        setName(userName);
        setEmail(userEmail);
        setInitialData({ name: userName, email: userEmail });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setIsModified(value !== initialData.name || value !== initialData.email);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        if (name !== initialData.name) {
          await updateProfile(user, { displayName: name });
        }

        if (email !== initialData.email) {
          await updateEmail(user, email);
          await sendEmailVerification(user);
        }

        setInitialData({ name, email });
        setIsModified(false);
        alert("저장되었습니다.");
      }
    } catch (error) {
      console.error("저장 중 오류가 발생했습니다:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("비밀번호 재설정 이메일이 전송되었습니다.");
    } catch (error) {
      console.error("비밀번호 재설정 중 오류가 발생했습니다:", error);
      alert("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <MyPageContainer>
      <Section>
        <h2>계정 정보</h2>
        <GridContent>
          <InputContainer>
            <Label>이름</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => handleInputChange(setName, e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>이메일</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(setEmail, e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>비밀번호</Label>
            <ResetPasswordBtn onClick={handlePasswordReset}>
              비밀번호 재설정
            </ResetPasswordBtn>
          </InputContainer>
        </GridContent>
        <BtnContainer>
          <Btn $btnType="edit" onClick={handleSave} disabled={!isModified}>
            저장
          </Btn>
        </BtnContainer>
      </Section>
    </MyPageContainer>
  );
};

const MyPageContainer = styled.main`
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Section = styled.section`
  width: 950px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 5px;
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 30px;
  }
`;

const GridContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 7px;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 5px 10px;
  line-height: 1.5rem;
  border: 1px solid rgb(0, 0, 0, 0.4);
  border-radius: 5px;
`;

const ResetPasswordBtn = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 1rem;

  color: #ffffff;
  font-weight: 600;
  background-color: #9990ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #8a7fff;
    border-color: #8a7fff;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.button<{ $btnType: "edit" | "cancel" | "save" }>`
  font-size: 1rem;
  font-weight: 600;
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  background-color: ${(props) =>
    props.$btnType === "edit"
      ? "#9990ff"
      : props.$btnType === "cancel"
      ? "#ff6b6b"
      : "#9990ff"};
  color: #ffffff;
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default MyPage;
