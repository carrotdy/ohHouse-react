import { Container, Title } from "../components/Common";
import KakaoMap from "../components/KakaoMap";

const Location = () => {
  return (
    <Container>
      <Title style={{ marginBottom: "20px" }}>찾아오시는 길</Title>
      <KakaoMap />
    </Container>
  );
};

export default Location;