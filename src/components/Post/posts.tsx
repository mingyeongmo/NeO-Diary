import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./post";
import styled from "styled-components";

export interface PostType {
  id: string;
  diaryTitle: string;
  userId: string;
  diaryWeather: string;
  photo?: string;
  diaryDate: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  };
}
interface PostsProps {
  selectedYear: number;
  selectedMonth: number;
}

const Posts = ({ selectedYear, selectedMonth }: PostsProps) => {
  const [diaryList, setDiaryList] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDiary = async () => {
    setLoading(true);
    const diaryQuery = query(
      collection(db, "diary"),
      where("diaryDate.year", "==", selectedYear),
      where("diaryDate.month", "==", selectedMonth),
      orderBy("diaryDate", "desc")
    );
    const snapshot = await getDocs(diaryQuery);
    const diary = snapshot.docs.map((doc) => {
      const { diaryTitle, diaryDate, photo, userId, diaryWeather } = doc.data();
      return {
        diaryTitle,
        diaryDate,
        photo,
        userId,
        diaryWeather,
        id: doc.id,
      };
    });
    setDiaryList(diary);
    setLoading(false);
  };

  useEffect(() => {
    fetchDiary();
  }, [selectedYear, selectedMonth]);
  return (
    <PostsContainer>
      {loading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : diaryList.length ? (
        diaryList.map((diary) => <Post key={diary.id} {...diary} />)
      ) : (
        <p>일기가 없음</p>
      )}
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingMessage = styled.p``;

export default Posts;
