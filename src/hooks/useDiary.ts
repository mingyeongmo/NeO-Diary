import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useDiary = () => {
  const [isLoading, setLoading] = useState(false);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imgFile, setImgFile] = useState("");

  const onDiaryTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryTitle(e.target.value);
  };

  const onDiaryContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiary(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const reader = new FileReader();

    if (files && files.length === 1) {
      setFile(files[0]);
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        if (reader.result !== null) {
          setImgFile(reader.result as string);
        }
      };
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || diary === "") return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "diary"), {
        diaryTitle,
        diary,
        createdAt: Date.now(),
        weather: "맑음",
        userId: user.uid,
      });
      if (file) {
        console.log("file", file);
        const locationRef = ref(
          storage,
          `diary/${user.uid}-${user.displayName}/${doc.id}`
        );
        console.log({ locationRef });
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setDiary("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    diaryTitle,
    onDiaryTitleChange,
    diary,
    onDiaryContentChange,
    file,
    setFile,
    imgFile,
    setImgFile,
    onFileChange,
    onSubmit,
  };
};

export default useDiary;
