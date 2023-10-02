import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./RoutePath";

const Main = () => {
    return (
        <Routes>
            <Route path={RoutePath.회사소개.path} element={RoutePath.회사소개.element} />
            <Route path="*" element={RoutePath.회사소개.element} />
        </Routes>
    );
};

export default Main;
