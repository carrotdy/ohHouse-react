import styled from "styled-components";
import Button from "../components/Button";
import { ProductModel } from "../model/ProductModel";
import { Color } from "../statics/Color";

interface IProps {
  data: ProductModel.IProductModel;
  index: number;
}

const 복지몰_상품: React.FC<IProps> = ({ data, index }) => {
  const { point, company, title, image } = data;

  const onClick = () => {

  }

  return (
    <Wrapper>
      <img src={image} style={{ borderRadius: "12px" }} />
      <Badge>
        <div>{index + 1}</div>
      </Badge>
      <Company>{company}</Company>
      <CompanyTitle>{title}</CompanyTitle>
      <CompanyPoint>{point}</CompanyPoint>
      <Button
        text={`장바구니`}
        type={"primary"}
        size={"small"}
        onClick={onClick}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  width: "300px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
});

const Badge = styled.div({
  position: "absolute",
  display: "inline-block",
  backgroundColor: Color.Orange,
  color: Color.Gray10,
  padding: "8px 14px",
  borderRadius: "10px",
  fontSize: "14px",
});

const Company = styled.div({
  margin: "10px 0",
  fontSize: "12px",
  color: Color.Gray60,
});

const CompanyTitle = styled.div({
  color: Color.Gray80,
});

const CompanyPoint = styled.div({
  margin: "2px 0 10px 0"
})

export default 복지몰_상품;
