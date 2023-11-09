import { isEmpty } from "lodash-es";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import Button from "../components/Button";
import { Container, Title } from "../components/Common";
import { LOCAL_STORAGE_KEY_CART } from "../constants/localstorage/localStorageKeys";
import { ProductModel } from "../constants/model/ProductModel";
import { Color } from "../constants/style/Color";
import {
  CartState,
  CartTotalCountState,
  CartTotalPriceState,
} from "../recoil/CartRecoil";
import CartProduct from "./CartProduct";

const Cart: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [cartItem, setCartItem] =
    useRecoilState<Array<ProductModel.IProductModel>>(CartState);
  const totalCount = useRecoilValue<number>(CartTotalCountState);
  const totalPrice = useRecoilValue<number>(CartTotalPriceState);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CART) || "[]"
    );

    if (data.length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify([]));
    }

    setCartItem(data);
  }, []);

  return (
    <Container>
      <Title>장바구니</Title>
      {cartItem.length ? (
        cartItem.map((item) => <CartProduct key={item.id} data={item} />)
      ) : (
        <div style={{ padding: "120px 0", textAlign: "center" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            장바구니에 담긴 상품이 없습니다.
          </div>
          <Button
            text={"복지몰 보러가기"}
            type={"primary"}
            onClick={() => {
              navigate(RoutePath.Welfare.path);
            }}
            style={{ margin: "auto", height: "40px" }}
          />
        </div>
      )}
      {!isEmpty(cartItem) && (
        <>
          <ThinLine />
          <ThickLine />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>상품 개수</span>
            <div>{`${totalCount}개`}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "6px 0 30px 0",
            }}
          >
            <span>상품 예정 금액</span>
            <div>{`${totalPrice.toLocaleString()} 원`}</div>
          </div>
        </>
      )}
    </Container>
  );
};

const ThinLine = styled.div`
  background-color: ${Color.Gray50};
  width: 100%;
  height: 1px;
  margin-top: 30px;
`;

const ThickLine = styled.div`
  background-color: ${Color.Gray30};
  height: 20px;
  margin-bottom: 20px;
`;

export default Cart;
