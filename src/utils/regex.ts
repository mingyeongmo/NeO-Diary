export const regex_name = new RegExp(
  '^(?!.*[ㄱ-ㅎ])(?!.*[!@#$%^&*(),.?":{}|<>])(?!^\\s+$)\\S+(\\s\\S+)*$'
);

export const regex_email = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

export const regex_password = new RegExp(
  '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,16}$'
);
