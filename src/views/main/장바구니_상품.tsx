import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { ProductModel } from "../model/ProductModel";
import { Color } from "../statics/Color";
import { useSetRecoilState } from "recoil";
import { CartState } from "../hooks/CartRecoil";

interface IProduct {
  data: ProductModel.IProductModel;
}

const 장바구니_상품: React.FC<IProduct> = ({ data }) => {
  const { id, point, company, title, image } = data;

  const setCartItem = useSetRecoilState(CartState);

  const handleClickDelete = () => {
    setCartItem((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div style={{ display: "flex", marginTop: "20px", alignItems: "center" }}>
      <img
        src={image}
        style={{
          borderRadius: "12px",
          width: "100px",
          height: "100px",
          marginRight: "10px",
        }}
      />
      <div>
        <CompanyTitle>{title}</CompanyTitle>
        <Company>{company}</Company>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <CompanyPoint>{`${point.toLocaleString()} 원`}</CompanyPoint>
        <Button
          text={"삭제"}
          type={"primary"}
          size={"small"}
          width={60}
          onClick={handleClickDelete}
        />
      </div>
    </div>
  );
};

const Company = styled.div({
  marginTop: "8px",
  fontSize: "12px",
  color: Color.Gray60,
});

const CompanyTitle = styled.div({
  color: Color.Gray80,
});

const CompanyPoint = styled.div({
  marginBottom: "8px",
  textAlign: "end",
});

export default 장바구니_상품;
