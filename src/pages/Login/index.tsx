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

  const { register, handleSubmit } = useForm<FormValue>();

  const onSubmit = async (data: FormValue) => {
    setError("");
    const { email, password } = data;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case "auth/user-not-found":
            setError("해당 이메일로 등록된 계정이 없습니다.");
            break;
          case "auth/wrong-password":
            setError("유효하지 않은 비밀번호 입니다.");
            break;
          case "auth/invalid-credential":
            setError("유효하지 않은 자격 증명입니다. 다시 시도해주세요.");
            break;
          default:
            setError("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
            break;
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
                autoComplete="off"
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
