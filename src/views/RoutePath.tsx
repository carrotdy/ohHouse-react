import 채용 from "./main/채용";
import 팀문화 from "./main/팀문화";
import 회사소개 from "./main/회사소개";

export class RoutePath {
    static readonly 회사소개 = {
        path: "/",
        element: <회사소개 />
    };
    static readonly 팀문화 = {
        path: "/views/team-culture",
        element: <팀문화 />
    };
    static readonly 채용 = {
        path: "/views/careers",
        element: <채용 />
    };
}
