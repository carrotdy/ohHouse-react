import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Color } from "../statics/Color";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "300px" }}>
            <h1>404</h1>
            <h4>This Page Could Not Be Found</h4>
            <BackButton onClick={() => navigate(-1)}>
                go back
            </BackButton>
        </div>
    );
};

const BackButton = styled.button({
    width: "80px",
    margin: "auto",
    backgroundColor: Color.Gray10,
    borderColor: Color.Gray40,
    borderRadius: 4,
    padding: "10px 0"
})