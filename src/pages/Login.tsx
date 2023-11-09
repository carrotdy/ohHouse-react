import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import Button from "../components/Button";
import { Container } from "../components/Common";
import InputForm from "../components/InputForm";
import { isLoadingRecoil } from "../recoil/LoadingRecoil";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = getAuth();
  const setIsLoading = useSetRecoilState<boolean>(isLoadingRecoil);

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
      <h2>로그인</h2>
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
