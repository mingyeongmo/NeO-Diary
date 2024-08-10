import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import styled from "styled-components";

type BtnProps = {
  btnType: "edit" | "cancel" | "save";
};

const MyPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [initialData, setInitialData] = useState({ name: "", email: "" });

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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setName(initialData.name);
    setEmail(initialData.email);
    setPassword("");
    setEditMode(false);
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
        setEditMode(false);
        alert("저장되었습니다.");
      }
    } catch (error) {
      console.error("저장 중 오류가 발생했습니다:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
              disabled={!editMode}
              onChange={(e) => setName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>이메일</Label>
            <Input
              type="email"
              value={email}
              disabled={!editMode}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>비밀번호</Label>
            <Input type="password" value={password} disabled={!editMode} />
          </InputContainer>
        </GridContent>
        <BtnContainer>
          {editMode ? (
            <>
              <Btn $btnType="cancel" onClick={handleCancel}>
                취소
              </Btn>
              <Btn $btnType="save" onClick={handleSave}>
                저장
              </Btn>
            </>
          ) : (
            <Btn $btnType="edit" onClick={handleEdit}>
              수정
            </Btn>
          )}
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
`;

export default MyPage;
