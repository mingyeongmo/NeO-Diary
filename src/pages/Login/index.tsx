import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";
import { regex_email, regex_password } from "utils/regex";
import { OpenEye, CloseEye } from "components/Icon/Icons";
import {
  Button,
  ErrorMessage,
  Form,
  Input,
  PasswordContainer,
  Switcher,
  Title,
  Wrapper,
} from "components/Auth/Auth";

interface FormValue {
  name: string;
  email: string;
  password: string;
}

const Login = () => {
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
    console.log({ data });
    setError("");
    const { email, password } = data;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === "auth/email-already-in-use") {
          setError("이미 존재하는 이메일 입니다.");
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
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: regex_email,
              message: "이메일 주소가 정확한지 확인해 주세요.",
            },
          })}
          type="email"
          placeholder="이메일"
          required
          onChange={() => setError(null)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <PasswordContainer>
          <Input
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: regex_password,
                message: "8자~16자의 영문, 숫자, 특수문자를 사용해 주세요.",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            required
          />
          <i onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <OpenEye /> : <CloseEye />}
          </i>
        </PasswordContainer>

        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button type="submit">{isLoading ? "Loading..." : "로그인"}</Button>
      </Form>
      <Switcher>
        <Link to="/register">회원가입</Link>
      </Switcher>
    </Wrapper>
  );
};

export default Login;
