import { useReducer, useRef, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
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

type ActionType =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | {
      type: "SET_DATE";
      payload: {
        year: number | undefined;
        month: number | undefined;
        day: number | undefined;
      };
    }
  | { type: "SET_WEATHER"; payload: string }
  | { type: "SET_FILE"; payload: File | null }
  | { type: "SET_IMG_FILE"; payload: string }
  | { type: "SET_INITIAL_STATE"; payload: State };

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

const reducer = (state: State, action: ActionType) => {
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
    case "SET_INITIAL_STATE":
      return { ...action.payload };
    default:
      return state;
  }
};

const useDiary = () => {
  const [isLoading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileRemove = () => {
    dispatch({ type: "SET_IMG_FILE", payload: "" });
    dispatch({ type: "SET_FILE", payload: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { diaryTitle, diaryContent, diaryDate, diaryWeather, file } = state;
    const user = auth.currentUser;
    if (!user || isLoading || diaryContent === "") return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "diary"), {
        userId: user.uid,
        diaryTitle,
        diaryContent,
        diaryDate,
        diaryWeather,
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
      dispatch({ type: "SET_INITIAL_STATE", payload: initialState });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateDiary = async (
    docId: string,
    diaryTitle: string,
    diaryDate: {
      year: number | undefined;
      month: number | undefined;
      day: number | undefined;
    },
    diaryWeather: string,
    diaryContent: string,
    file: File | null
  ) => {
    const user = auth.currentUser;

    if (!user || isLoading || diaryContent === "") return;

    try {
      setLoading(true);
      const docRef = doc(db, "diary", docId);
      let updatedData: any = {
        diaryTitle,
        diaryContent,
        diaryDate,
        diaryWeather,
      };

      if (file) {
        const locationRef = ref(
          storage,
          `diary/${user.uid}-${user.displayName}/${docId}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        updatedData = { ...updatedData, photo: url };
      }

      await updateDoc(docRef, updatedData);
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
    updateDiary,
    fileInputRef,
    handleFileRemove,
  };
};

export default useDiary;
