import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./RoutePath";
import { NotFoundPage } from "./error/NotFoundPage";

const Main = () => {
    return (
        <Routes>
            <Route path={RoutePath.회사소개.path} element={RoutePath.회사소개.element} />
            <Route path={RoutePath.팀문화.path} element={RoutePath.팀문화.element} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Main;
