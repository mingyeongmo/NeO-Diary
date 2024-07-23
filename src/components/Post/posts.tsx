import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Post from "./post";
import Pagination from "./Pagination";
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
    <>
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
              <LoadingMessage>
                <td colSpan={3}>로딩 중...</td>
              </LoadingMessage>
            ) : diaryList.length ? (
              paginatedDiaries.map((diary, index) => (
                <Post
                  key={diary.id}
                  {...diary}
                  index={startIndex + index + 1}
                />
              ))
            ) : (
              <NonePostMessage>
                <td colSpan={3}>작성된 일기가 없어요..</td>
              </NonePostMessage>
            )}
          </PostBody>
        </PostBox>
      </PostsContainer>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

const PostsContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostBox = styled.table`
  width: 600px;
  border-bottom: 1px solid black;
  table-layout: fixed;
  display: table;
`;

const PostHeader = styled.thead`
  width: 100%;
  height: 40px;
  font-size: 1.2rem;
  font-weight: 600;
  tr {
    background: #9990ff;
    color: white;
  }
  th {
    vertical-align: middle;
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

const LoadingMessage = styled.tr`
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;

  td {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    font-size: 1.2rem;
  }
`;

const NonePostMessage = styled.tr`
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;

  td {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    font-size: 1.2rem;
  }
`;

export default Posts;
