import Careers from "./pages/Careers";
import CareersCreate from "./pages/CareersCreate";
import CareersDetail from "./pages/CareersDetail";
import CareersEdit from "./pages/CareersEdit";
import Cart from "./pages/Cart";
import EmployeeVoices from "./pages/EmployeeVoices";
import IntroCompany from "./pages/IntroCompany";
import Login from "./pages/Login";
import Welfare from "./pages/Welfare";
import Location from "./pages/Location";

export class RoutePath {
  static readonly IntroCompany = {
    path: "/",
    element: <IntroCompany />,
  };
  static readonly Location = {
    path: "/location",
    element: <Location />,
  };
  static readonly EmployeeVoices = {
    path: "/team-culture",
    element: <EmployeeVoices />,
  };
  static readonly Careers = {
    path: "/careers",
    element: <Careers />,
  };
  static readonly CareersCreate = {
    path: "/createCareer",
    element: <CareersCreate />,
  };
  static readonly CareersEdit = {
    path: "/editCareer",
    element: <CareersEdit />,
  };
  static readonly CareersDetail = {
    path: "/careerDetail",
    element: <CareersDetail />,
  };
  static readonly Welfare = {
    path: "/welfare",
    element: <Welfare />,
  };
  static readonly Cart = {
    path: "/cart",
    element: <Cart />,
  };
  static readonly Login = {
    path: "/login",
    element: <Login />,
  };
}
