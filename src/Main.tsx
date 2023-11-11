import { Route, Routes } from "react-router-dom";
import { RoutePath } from "./RoutePath";
import { NotFoundPage } from "./components/NotFoundPage";

const Main = () => {
  return (
    <Routes>
      <Route
        path={RoutePath.IntroCompany.path}
        element={RoutePath.IntroCompany.element}
      />
      <Route
        path={RoutePath.Location.path}
        element={RoutePath.Location.element}
      />
      <Route
        path={RoutePath.EmployeeVoices.path}
        element={RoutePath.EmployeeVoices.element}
      />
      <Route
        path={RoutePath.Careers.path}
        element={RoutePath.Careers.element}
      />
      <Route
        path={RoutePath.CareersCreate.path}
        element={RoutePath.CareersCreate.element}
      />
      <Route
        path={RoutePath.CareersEdit.path}
        element={RoutePath.CareersEdit.element}
      />
      <Route
        path={RoutePath.CareersDetail.path}
        element={RoutePath.CareersDetail.element}
      />
      <Route
        path={RoutePath.Welfare.path}
        element={RoutePath.Welfare.element}
      />
      <Route path={RoutePath.Cart.path} element={RoutePath.Cart.element} />
      <Route path={RoutePath.Login.path} element={RoutePath.Login.element} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Main;
