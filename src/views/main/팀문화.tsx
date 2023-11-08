import { Container } from "../components/Common";
import 팀문화_근무환경 from "./팀문화_근무환경";
import 팀문화_직원의소리 from "./팀문화_직원의소리";

const 팀문화: React.FunctionComponent = () => {
  return (
    <Container>
      <팀문화_직원의소리 />
      <팀문화_근무환경 />
    </Container>
  );
};

export default 팀문화;
