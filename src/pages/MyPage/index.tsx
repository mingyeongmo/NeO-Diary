import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";

const MyPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");
        // 비밀번호는 Firebase Auth에서 직접적으로 가져올 수 없습니다.
        // 사용자가 비밀번호를 변경하고 싶다면 별도의 처리 필요
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <MyPageContainer>
      <Section>
        <h2>계정 정보</h2>
        <GridContent>
          <InputContainer>
            <Label>이름</Label>
            <Input type="text" value={name} />
          </InputContainer>
          <InputContainer>
            <Label>이메일</Label>
            <Input type="email" value={email} />
          </InputContainer>
          <InputContainer>
            <Label>비밀번호</Label>
            <Input type="password" value={password} />
          </InputContainer>
        </GridContent>
        <BtnContainer>
          <EditBtn>저장</EditBtn>
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

const EditBtn = styled.button`
  font-size: 1rem;
  font-weight: 600;
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background-color: #9990ff;
  color: #ffffff;
`;

export default MyPage;
