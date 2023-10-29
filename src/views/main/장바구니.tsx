import { isEmpty } from "lodash-es";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import Button from "../components/Button";
import { Container, Title } from "../components/Common";
import { LOCAL_STORAGE_KEY_CART } from "../constants/localstorage/localStorageKeys";
import { Color } from "../constants/style/Color";
import {
	CartState,
	CartTotalCountState,
	CartTotalPriceState,
} from "../hooks/CartRecoil";
import { ProductModel } from "../model/ProductModel";
import 장바구니_상품 from "./장바구니_상품";

const 장바구니: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [cartItem, setCartItem] =
    useRecoilState<Array<ProductModel.IProductModel>>(CartState);
  const totalCount = useRecoilValue<number>(CartTotalCountState);
  const totalPrice = useRecoilValue<number>(CartTotalPriceState);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CART) || "[]"
    );
    setCartItem(data);
  }, []);

  return (
    <Container>
      <Title>장바구니</Title>
      {cartItem.length ? (
        cartItem.map((item) => <장바구니_상품 key={item.id} data={item} />)
      ) : (
        <div style={{ padding: "120px 0" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            장바구니에 담긴 상품이 없습니다.
          </div>
          <Button
            text={"복지몰 보러가기"}
            type={"primary"}
            size={"small"}
            width={120}
            onClick={() => {
              navigate(RoutePath.복지몰.path);
            }}
            style={{ margin: "auto" }}
          />
        </div>
      )}
      {!isEmpty(cartItem) && (
        <>
          <ThinLine />
          <ThickLine />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>상품 갯수</span>
            <div>{`${totalCount}개`}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "6px",
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

const ThinLine = styled.div({
  backgroundColor: Color.Gray50,
  width: "100%",
  height: "1px",
  marginTop: "30px",
});

const ThickLine = styled.div({
  backgroundColor: Color.Gray30,
  height: "20px",
  marginBottom: "20px",
});

export default 장바구니;
