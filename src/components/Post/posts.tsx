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
      <PostBox>
        <PostHeader>
          <tr>
            <th className="date">날짜</th>
            <th className="title">제목</th>
          </tr>
        </PostHeader>
        <PostBody>
          {loading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : diaryList.length ? (
            diaryList.map((diary) => <Post key={diary.id} {...diary} />)
          ) : (
            <p>일기를 작성해주세요!</p>
          )}
        </PostBody>
      </PostBox>
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostBox = styled.table`
  width: 500px;
  /* height: 700px; */
  border: 1px solid black;
  table-layout: fixed;
`;

const PostHeader = styled.thead`
  width: 100%;
  height: 30px;

  th {
    vertical-align: middle;
  }
  .date {
    width: 30%;
  }
  .title {
    width: 70%;
  }
`;

const PostBody = styled.tbody`
  width: 100%;
  height: auto;
`;

const LoadingMessage = styled.p``;

export default Posts;
