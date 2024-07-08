import { useReducer, useRef, useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface State {
  diaryTitle: string;
  diaryContent: string;
  diaryDate: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  };
  diaryWeather: string;
  file: File | null;
  imgFile: string;
}

const initialState: State = {
  diaryTitle: "",
  diaryContent: "",
  diaryDate: {
    year: undefined,
    month: undefined,
    day: undefined,
  },
  diaryWeather: "",
  file: null,
  imgFile: "",
};

const reducer = (state: State, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, diaryTitle: action.payload };
    case "SET_CONTENT":
      return { ...state, diaryContent: action.payload };
    case "SET_DATE":
      return { ...state, diaryDate: action.payload };
    case "SET_WEATHER":
      return { ...state, diaryWeather: action.payload };
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_IMG_FILE":
      return { ...state, imgFile: action.payload };
    default:
      return state;
  }
};

const useDiary = () => {
  const [isLoading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const onDiaryTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  };

  const onDiaryContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_CONTENT", payload: e.target.value });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const reader = new FileReader();

    if (files && files.length === 1) {
      dispatch({ type: "SET_FILE", payload: files[0] });
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        if (reader.result !== null) {
          dispatch({ type: "SET_IMG_FILE", payload: reader.result as string });
        }
      };
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileRemove = () => {
    dispatch({ type: "SET_IMG_FILE", payload: "" });
    dispatch({ type: "SET_FILE", payload: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { diaryTitle, diaryContent, diaryDate, diaryWeather, file } = state;
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
      dispatch({ type: "SET_CONTNET", payload: "" });
      dispatch({ type: "SET_FILE", payload: null });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    diaryTitle: state.diaryTitle,
    onDiaryTitleChange,
    diaryContent: state.diaryContent,
    onDiaryContentChange,
    setDiaryDate: (date: {
      year: number | undefined;
      month: number | undefined;
      day: number | undefined;
    }) => dispatch({ type: "SET_DATE", payload: date }),
    setDiaryWeather: (weather: string) =>
      dispatch({ type: "SET_WEATHER", payload: weather }),
    file: state.file,
    setFile: (file: File | null) =>
      dispatch({ type: "SET_FILE", payload: file }),
    imgFile: state.imgFile,
    setImgFile: (imgFile: string) =>
      dispatch({ type: "SET_IMG_FILE", payload: imgFile }),
    onFileChange,
    onSubmit,
    fileInputRef,
    handleFileRemove,
  };
};

export default useDiary;
