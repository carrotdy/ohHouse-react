import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "300px" }}>
      <h1>404</h1>
      <h4>This Page Could Not Be Found</h4>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        style={{ margin: "auto" }}
      >
        go back
      </Button>
    </div>
  );
};
