import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./post";
import styled from "styled-components";
import Pagination from "./Pagination";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

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

  const totalPages = Math.ceil(diaryList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDiaries = diaryList.slice(startIndex, endIndex);

  return (
    <PostsContainer>
      <PostBox>
        <PostHeader>
          <tr>
            <th className="number">번호</th>
            <th className="title">제목</th>
            <th className="date">날짜</th>
          </tr>
        </PostHeader>
        <PostBody>
          {loading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : diaryList.length ? (
            paginatedDiaries.map((diary, index) => (
              <Post key={diary.id} {...diary} index={startIndex + index + 1} />
            ))
          ) : (
            <p>일기를 작성해주세요!</p>
          )}
        </PostBody>
      </PostBox>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
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
  width: 600px;
  /* height: 700px; */
  border-bottom: 1px solid black;
  table-layout: fixed;
`;

const PostHeader = styled.thead`
  width: 100%;
  height: 40px;
  font-size: 1.2rem;
  tr {
    background: #9990ff;
    color: white;
  }
  th {
    vertical-align: middle;
    /* border: 1px solid black; */
    border-left: none;
    border-right: none;
  }
  .number {
    width: 10%;
  }
  .date {
    width: 25%;
  }
  .title {
    width: 65%;
  }
`;

const PostBody = styled.tbody`
  width: 100%;
  height: auto;
`;

const LoadingMessage = styled.p``;

export default Posts;
