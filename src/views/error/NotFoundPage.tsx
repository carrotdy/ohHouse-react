import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "300px" }}>
            <h1>404</h1>
            <h4>This Page Could Not Be Found</h4>
            <Button
                text={`go back`}
                type={"primary"}
                size={"small"}
                width={80}
                onClick={() => { navigate(-1) }}
                margin={"auto"}
            />
        </div>
    );
};