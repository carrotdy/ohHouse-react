import { Container, Title } from "../components/Common";
import KakaoMap from "../components/KakaoMap";
import Weather from "../components/Weather";

const Location = () => {
  return (
    <Container>
      <Title style={{ marginBottom: "20px" }}>찾아오시는 길</Title>
      <KakaoMap />
      <Weather />
    </Container>
  );
};

export default Location;
