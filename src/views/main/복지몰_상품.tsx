import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Color } from "../constants/style/Color";
import { CartState } from "../hooks/CartRecoil";
import { ProductModel } from "../model/ProductModel";
import { ShoppingCartSVG } from "../images/svg";
import { useEffect } from "react";
import { LOCAL_STORAGE_KEY_CART } from "../constants/localstorage/localStorageKeys";

interface IProps {
  data: ProductModel.IProductModel;
  index: number;
}

const 복지몰_상품: React.FC<IProps> = ({ data, index }) => {
  const { point, company, title, image } = data;

  const [cartItem, setCartItem] = useRecoilState(CartState);

  const isAlreadyCart = cartItem.some((item) => item.id === data.id);

  const handleClickAddCart = () => {
    if (!isAlreadyCart) {
      setCartItem((prev) => [...prev, data]);
    }
  };

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CART) || "[]"
    );
    setCartItem(data);
  }, []);

  return (
    <Wrapper>
      <img src={image} style={{ borderRadius: "12px" }} />
      <Badge>
        <div>{index + 1}</div>
      </Badge>
      <div style={{ position: "relative" }}>
        <ShoppingCartSVG
          width={28}
          height={28}
          fill={isAlreadyCart ? Color.Gray40 : Color.Gray80}
          onClick={handleClickAddCart}
          style={{ position: "absolute", bottom: 10, right: 10 }}
        />
      </div>
      <Company>{company}</Company>
      <CompanyTitle>{title}</CompanyTitle>
      <CompanyPoint>{`${point.toLocaleString()} 원`}</CompanyPoint>
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
