import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./post";

export interface PostType {
  id: string;
  userId: string;
  weather: string;
  diary: string;
  photo?: string;
  createdAt: number;
}

const Posts = () => {
  const [diaries, setDiaries] = useState<PostType[]>([]);
  const fetchDiary = async () => {
    const diaryQuery = query(
      collection(db, "diary"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(diaryQuery);
    const diary = snapshot.docs.map((doc) => {
      const { diary, createdAt, photo, userId, weather } = doc.data();
      return {
        diary,
        createdAt,
        photo,
        userId,
        weather,
        id: doc.id,
      };
    });
    setDiaries(diary);
  };
  useEffect(() => {
    fetchDiary();
  }, []);
  return (
    <>
      {diaries.map((diary) => (
        <Post key={diary.id} {...diary} />
      ))}
    </>
  );
};

export default Posts;
