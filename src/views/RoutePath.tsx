import 채용 from "./main/채용";
import 팀문화 from "./main/팀문화";
import 팀문화직원소리 from "./main/팀문화_직원의소리";
import 회사소개 from "./main/회사소개";
import 채용상세 from "./main/채용_상세";
import 채용작성 from "./main/채용_작성";
import 채용수정 from "./main/채용_수정";
import 복지몰 from "./main/복지몰";
import 장바구니 from "./main/장바구니";
import 로그인 from "./main/로그인";

export class RoutePath {
  static readonly 회사소개 = {
    path: "/",
    element: <회사소개 />,
  };
  static readonly 팀문화 = {
    path: "/team-culture",
    element: <팀문화 />,
  };
  static readonly 팀문화직원소리 = {
    path: "/team-culture",
    element: <팀문화직원소리 />,
  };
  static readonly 채용 = {
    path: "/careers",
    element: <채용 />,
  };
  static readonly 채용작성 = {
    path: "/CreateCareer",
    element: <채용작성 />,
  };
  static readonly 채용수정 = {
    path: "/EditCareer",
    element: <채용수정 />,
  };
  static readonly 채용상세 = {
    path: "/careerDetail",
    element: <채용상세 />,
  };
  static readonly 복지몰 = {
    path: "/welfare",
    element: <복지몰 />,
  };
  static readonly 장바구니 = {
    path: "/cart",
    element: <장바구니 />,
  };
  static readonly 로그인 = {
    path: "/login",
    element: <로그인 />,
  };
}
