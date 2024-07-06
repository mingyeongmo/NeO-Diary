import { useRef, useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useDiary = () => {
  const [isLoading, setLoading] = useState(false);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [diaryDate, setDiaryDate] = useState("");
  const [diaryWeather, setDiaryWeather] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imgFile, setImgFile] = useState("");

  const onDiaryTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryTitle(e.target.value);
  };

  const onDiaryContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryContent(e.target.value);
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileRemove = () => {
    setImgFile("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || diaryContent === "") return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "diary"), {
        diaryTitle,
        diaryContent,
        createdAt: diaryDate,
        weather: diaryWeather,
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `diary/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setDiaryContent("");
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
    diaryContent,
    onDiaryContentChange,
    setDiaryDate,
    setDiaryWeather,
    file,
    setFile,
    imgFile,
    setImgFile,
    onFileChange,
    onSubmit,
    fileInputRef,
    handleFileRemove,
  };
};

export default useDiary;
