import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import Button from "../components/Button";
import { Container, Title } from "../components/Common";
import InputForm from "../components/InputForm";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = getAuth();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result.operationType === "signIn") {
        window.location.href = RoutePath.IntroCompany.path;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <Container>
      <Title>로그인</Title>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <InputForm
            label="이메일"
            type={"email"}
            name={"email"}
            required={true}
            placeholder="이메일을 입력하세요"
            onChange={handleOnChange}
            style={{ marginBottom: "10px", width: "340px" }}
          />
          <InputForm
            label="비밀번호"
            type={"password"}
            name={"password"}
            required={true}
            placeholder="비밀번호를 입력하세요"
            onChange={handleOnChange}
            style={{ marginBottom: "10px" }}
          />
          <ButtonContainer>
            <Button type={`primary`} onClick={handleSubmit} text="로그인" />
          </ButtonContainer>
        </form>
      </FormContainer>
    </Container>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

export default Login;
