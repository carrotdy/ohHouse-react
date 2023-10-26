import { Container } from "../components/Common";
import DummyData from "../data/DummyData";
import 복지몰_상품 from "./복지몰_상품";

const 복지몰: React.FunctionComponent = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        justifyContent: "center",
      }}
    >
      {DummyData.map((data, index) => {
        return <복지몰_상품 key={data.id} data={data} index={index} />;
      })}
    </Container>
  );
};

export default 복지몰;
