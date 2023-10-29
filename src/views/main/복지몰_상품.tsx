import styled from "styled-components";
import Button from "../components/Button";
import { ProductModel } from "../model/ProductModel";
import { Color } from "../constants/style/Color";
import { useRecoilState } from "recoil";
import { CartState } from "../hooks/CartRecoil";

interface IProps {
  data: ProductModel.IProductModel;
  index: number;
}

const 복지몰_상품: React.FC<IProps> = ({ data, index }) => {
  const { point, company, title, image } = data;

  const [cartItem, setCartItem] = useRecoilState(CartState);

  const handleClickAddCart = () => {
    setCartItem((prev) => [...prev, data]);
  };

  const isAlreadyCart = cartItem.some((item) => item.id === data.id);

  return (
    <Wrapper>
      <img src={image} style={{ borderRadius: "12px" }} />
      <Badge>
        <div>{index + 1}</div>
      </Badge>
      <Company>{company}</Company>
      <CompanyTitle>{title}</CompanyTitle>
      <CompanyPoint>{`${point.toLocaleString()} 원`}</CompanyPoint>
      <Button
        text={isAlreadyCart ? "장바구니 완료" : "장바구니 추가"}
        type={"primary"}
        size={"small"}
        onClick={handleClickAddCart}
        disabled={isAlreadyCart}
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
  margin: "2px 0 10px 0",
});

export default 복지몰_상품;
