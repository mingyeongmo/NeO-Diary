import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";
import { OpenEye, CloseEye } from "components/Icon/Icons";
import {
  Button,
  ErrorMessage,
  Form,
  Input,
  InputContainer,
  Switcher,
  Title,
  Wrapper,
} from "components/Auth/Form";

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
  } = useForm<FormValue>();

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
        if (e.code === "auth/invalid-credential") {
          setError("이메일 주소 또는 유효하지 않은 비밀번호 입니다.");
        } else {
          setError("예기치 못한 에러 입니다.");
        }
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
        <InputContainer>
          <Input
            {...register("email")}
            type="email"
            placeholder="이메일"
            required
            onChange={() => setError(null)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            required
          />
          <i onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <OpenEye /> : <CloseEye />}
          </i>
        </InputContainer>
        <Button type="submit">{isLoading ? "Loading..." : "로그인"}</Button>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
      <Switcher>
        <Link to="/register">회원가입</Link>
      </Switcher>
    </Wrapper>
  );
};

export default Login;
