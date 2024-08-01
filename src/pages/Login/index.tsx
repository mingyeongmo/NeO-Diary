import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";
import { OpenEye, CloseEye } from "components/Icon/Icons";
import {
  Button,
  Comment,
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
    <UserAuthContainer>
      <Wrapper mode="login">
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="Container">
            <InputContainer className="firstInputContainer">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="이메일을 입력해주세요."
                required
                onChange={() => setError(null)}
              />
            </InputContainer>
            <InputContainer>
              <Label>Password</Label>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
                required
              />
              <i onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <OpenEye /> : <CloseEye />}
              </i>
            </InputContainer>
          </div>
          <Button type="submit">{isLoading ? "Loading..." : "로그인"}</Button>
          <ErrorMessage>{error}</ErrorMessage>
          <Switcher>
            <span className="question">계정이 없으신가요?</span>
            <Link to="/register">회원가입</Link>
          </Switcher>
        </Form>
      </Wrapper>
    </UserAuthContainer>
  );
};

export default Login;
