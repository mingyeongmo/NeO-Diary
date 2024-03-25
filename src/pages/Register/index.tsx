import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "styled-components";
import { regex_email, regex_name, regex_password } from "../../utils/regex";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

interface FormValue {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onBlur", reValidateMode: "onBlur" });

  const onSubmit = async (data: FormValue) => {
    console.log({ data });
    setError("");
    const { email, password, name } = data;

    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(credentials.user);

      await updateProfile(credentials.user, {
        displayName: name,
      });
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
    console.log({ error });
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input
          {...register("name", {
            required: "이름을 입력해주세요",
            pattern: {
              value: regex_name,
              message:
                "한글, 대/소문자를 사용해주세요. (특수기호, 공백 사용 불가)",
            },
          })}
          type="text"
          placeholder="이름"
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
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
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: regex_password,
              message: "8자~16자의 영문, 숫자, 특수문자를 사용해 주세요.",
            },
          })}
          type="password"
          placeholder="비밀번호"
          required
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button type="submit">{isLoading ? "Loading..." : "회원가입"}</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid gray;

  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default Register;
