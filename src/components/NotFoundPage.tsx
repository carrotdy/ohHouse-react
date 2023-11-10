import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Container } from "./Common";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: "center", marginBottom: "100px" }}>
      <header>
        <h1>404</h1>
        <h4>This Page Could Not Be Found</h4>
      </header>
      <section>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          style={{ margin: "auto" }}
        >
          go back
        </Button>
      </section>
    </Container>
  );
};
