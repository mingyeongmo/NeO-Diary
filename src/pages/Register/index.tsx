import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";
import { regex_email, regex_name, regex_password } from "utils/regex";
import { OpenEye, CloseEye } from "components/Icon/Icons";
import {
  Button,
  ErrorMessage,
  Form,
  Input,
  InputContainer,
  Label,
  Switcher,
  Title,
  UserAuthContainer,
  Wrapper,
} from "components/Auth/Form";

interface FormValue {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onBlur", reValidateMode: "onBlur" });

  const onSubmit = async (data: FormValue) => {
    setError("");
    const { email, password, name } = data;

    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === "auth/email-already-in-use") {
          setError("이미 존재하는 이메일 입니다.");
        } else {
          setError("예기치 못한 에러 입니다.");
        }
      } else {
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const onError = (error: any) => {
    console.log({ error }, "유효성 검사중 에러 발생");
  };

  return (
    <UserAuthContainer>
      <Wrapper mode="register">
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="Container">
            <InputContainer className="firstInputContainer">
              <Label>Name</Label>
              <Input
                {...register("name", {
                  required: "이름을 입력해주세요",
                  pattern: {
                    value: regex_name,
                    message:
                      "한글, 대/소문자를 사용해주세요. (특수기호, 공백 사용 불가)",
                  },
                })}
                required
                type="text"
                placeholder="이름을 입력해주세요."
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Label>Email</Label>
              <Input
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: regex_email,
                    message: "이메일 주소가 정확한지 확인해 주세요.",
                  },
                })}
                type="email"
                placeholder="이메일을 입력해주세요."
                required
                onChange={() => setError(null)}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Label>Password</Label>
              <Input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: regex_password,
                    message: "8자~16자의 영문, 숫자, 특수문자를 사용해 주세요.",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
                required
              />
              <i onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <OpenEye /> : <CloseEye />}
              </i>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </InputContainer>
          </div>
          <Button type="submit">{isLoading ? "Loading..." : "회원가입"}</Button>
          <ErrorMessage>{error}</ErrorMessage>
          <Switcher>
            <span className="question">이미 계정이 있으신가요?</span>
            <Link to="/login">로그인</Link>
          </Switcher>
        </Form>
      </Wrapper>
    </UserAuthContainer>
  );
};

export default Register;
