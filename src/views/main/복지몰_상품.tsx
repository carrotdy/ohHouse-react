import styled from "styled-components";
import { Color } from "../statics/Color";
import { ProductModel } from "../model/ProductModel";

interface IProps {
  data: ProductModel.IProductModel;
  index: number;
}

const 복지몰_상품: React.FC<IProps> = ({ data, index }) => {
  const { point, company, title } = data;

  return (
    <Wrapper>
      <div>{index + 1}</div>
      <div>{company}</div>
      <div>{title}</div>
      <div>{point}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  width: "300px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${Color.Gray60}`,
  cursor: "pointer",
});

export default 복지몰_상품;
