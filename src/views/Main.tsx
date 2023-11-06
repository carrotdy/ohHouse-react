import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./RoutePath";
import { NotFoundPage } from "./error/NotFoundPage";

const Main = () => {
  return (
    <Routes>
      <Route
        path={RoutePath.회사소개.path}
        element={RoutePath.회사소개.element}
      />
      <Route path={RoutePath.팀문화.path} element={RoutePath.팀문화.element} />
      <Route
        path={RoutePath.팀문화직원소리.path}
        element={RoutePath.팀문화직원소리.element}
      />
      <Route path={RoutePath.채용.path} element={RoutePath.채용.element} />
      <Route
        path={RoutePath.채용작성.path}
        element={RoutePath.채용작성.element}
      />
      <Route
        path={RoutePath.채용수정.path}
        element={RoutePath.채용수정.element}
      />
      <Route
        path={RoutePath.채용상세.path}
        element={RoutePath.채용상세.element}
      />
      <Route path={RoutePath.복지몰.path} element={RoutePath.복지몰.element} />
      <Route
        path={RoutePath.장바구니.path}
        element={RoutePath.장바구니.element}
      />
      <Route path={RoutePath.로그인.path} element={RoutePath.로그인.element} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Main;
