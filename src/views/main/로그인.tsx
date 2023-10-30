import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import Button from "../components/Button";
import { Container } from "../components/Common";
import { Color } from "../constants/style/Color";
import { isLoadingRecoil } from "../hooks/AuthRecoil";

const 로그인 = () => {
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
        window.location.href = RoutePath.회사소개.path;
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
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              onChange={handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              onChange={handleOnChange}
            />
          </FormGroup>
          <Button
            text={"로그인"}
            type={"primary"}
            size={"small"}
            width={333}
            onClick={handleSubmit}
            style={{ marginTop: "10px", paddingLeft: "10px" }}
          />
        </form>
      </FormContainer>
    </Container>
  );
};

const FormContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "80px 0",
});

const FormGroup = styled.div({
  margin: "20px 0",
  width: "340px",
});

const Label = styled.label({
  display: "block",
  fontWeight: "bold",
  color: Color.Gray80,
});

const Input = styled.input({
  width: "100%",
  padding: "8px",
  marginTop: "6px",
  border: `1px solid ${Color.Gray40}`,
  borderRadius: "4px",
});

export default 로그인;
