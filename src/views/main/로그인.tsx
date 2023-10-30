import { useState } from "react";
import { Container } from "../components/Common";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../RoutePath";
import { Color } from "../constants/style/Color";

const 로그인 = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("hi");
  };

  return (
    <Container>
      <h2>로그인</h2>
      <Form>
        <div>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            text={"로그인"}
            type={"primary"}
            size={"small"}
            width={333}
            onClick={() => {
              navigate(RoutePath.로그인.path);
            }}
            style={{ marginTop: "10px", paddingLeft: "10px" }}
          />
        </div>
      </Form>
    </Container>
  );
};

const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "80px 0"
});

const FormGroup = styled.div({
  margin: "20px 0",
  width: "340px",
});

const Label = styled.label({
  display: "block",
  fontWeight: "bold",
  color: Color.Gray80
});

const Input = styled.input({
  width: "100%",
  padding: "8px",
  marginTop: "6px",
  border: `1px solid ${Color.Gray40}`,
  borderRadius: "4px",
});

export default 로그인;
