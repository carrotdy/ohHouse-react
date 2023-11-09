import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../components/Button";
import { Title } from "../components/Common";
import { LOCAL_STORAGE_KEY_CART } from "../constants/localstorage/localStorageKeys";
import { ProductModel } from "../constants/model/ProductModel";
import { Color } from "../constants/style/Color";
import { CartState } from "../recoil/CartRecoil";
import { Mobile } from "../utils/CssUtil";

interface IProduct {
  data: ProductModel.IProductModel;
}

const CartProduct: React.FC<IProduct> = ({ data }) => {
  const { id, point, company, title, image } = data;

  const [cartItem, setCartItem] =
    useRecoilState<Array<ProductModel.IProductModel>>(CartState);

  const handleClickDelete = () => {
    setCartItem((prev) => prev.filter((e) => e.id !== id));

    const updatedCart = cartItem.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(updatedCart));
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <ProductContainer>
      <ProductImage src={image} />
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <ProductCompany>{company}</ProductCompany>
      </ProductInfo>
      <ProductActions>
        <ProductPrice>{`${point.toLocaleString()} 원`}</ProductPrice>
        <Button
          text={"삭제"}
          type={"default"}
          onClick={handleClickDelete}
          style={{ width: "60px" }}
        />
      </ProductActions>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
`;

const ProductImage = styled.img`
  border-radius: 12px;
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ProductTitle = styled.span`
  font-size: 16px;
  ${Mobile({
    fontSize: "10px",
  })}
`;

const ProductCompany = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${Color.Gray60};
`;

const ProductActions = styled.div`
  margin-left: auto;
`;

const ProductPrice = styled.div`
  margin-bottom: 8px;
  text-align: end;
  ${Mobile({
    fontSize: "14px",
  })}
`;

export default CartProduct;
