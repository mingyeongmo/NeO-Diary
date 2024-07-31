import { atom } from "recoil";

export const editDiaryTitleState = atom<string>({
  key: "editDiaryTitleState",
  default: "",
});

export const editDiaryDateState = atom<Date | null>({
  key: "editDiaryDateState",
  default: null,
});

export const editDiaryWeatherState = atom<string>({
  key: "editDiaryWeatherState",
  default: "",
});

export const editDiaryFileState = atom<File | null>({
  key: "editDiaryFileState",
  default: null,
});

export const editDiaryContentState = atom<string>({
  key: "editDiaryContentState",
  default: "",
});
