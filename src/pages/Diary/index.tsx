import React, { useState } from "react";
import * as S from "./style";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Diary = () => {
  const [isLoading, setLoading] = useState(false);
  const [diary, setDiary] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiary(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || diary === "") return;

    try {
      setLoading(true);
      await addDoc(collection(db, "diary"), {
        diary,
        createdAt: Date.now(),
        weather: "맑음",
        userId: user.uid,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Form onSubmit={onSubmit}>
      <div>제목 & 날씨</div>
      <S.AttachFileBtn htmlFor="file">
        {file ? "사진 넣음" : "사진 넣기"}
      </S.AttachFileBtn>
      <S.AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      ></S.AttachFileInput>
      <S.TextArea value={diary} onChange={onChange} />
      <S.Button type="submit">{isLoading ? "생성중" : "일기 생성"}</S.Button>
    </S.Form>
  );
};

export default Diary;
