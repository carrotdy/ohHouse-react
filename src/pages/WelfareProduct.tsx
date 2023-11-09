import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ShoppingCartSVG } from "../assets/images/svg";
import { ProductModel } from "../constants/model/ProductModel";
import { Color } from "../constants/style/Color";
import { CartState } from "../recoil/CartRecoil";

interface IProps {
  data: ProductModel.IProductModel;
  index: number;
}

const WelfareProduct: React.FC<IProps> = ({ data, index }) => {
  const { point, company, title, image } = data;

  const [cartItem, setCartItem] =
    useRecoilState<Array<ProductModel.IProductModel>>(CartState);

  const isAlreadyCart = cartItem.some((item) => item.id === data.id);

  const addToCart = () => {
    if (!isAlreadyCart) {
      setCartItem((prev) => [...prev, data]);
    }
  };

  return (
    <ProductContainer>
      <ProductImage src={image} />
      <Badge>
        <BadgeContent>{index + 1}</BadgeContent>
      </Badge>
      <ShoppingCartButton>
        <ShoppingCartSVG
          width={28}
          height={28}
          fill={isAlreadyCart ? Color.Gray40 : Color.Gray80}
          onClick={addToCart}
          style={{ position: "absolute", bottom: 10, right: 10 }}
        />
      </ShoppingCartButton>
      <Company>{company}</Company>
      <ProductTitle>{title}</ProductTitle>
      <ProductPoint>{`${point.toLocaleString()} 원`}</ProductPoint>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ProductImage = styled.img`
  border-radius: 12px;
`;

const Badge = styled.div`
  position: absolute;
  display: inline-block;
  background-color: ${Color.Orange};
  color: ${Color.Gray10};
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
`;

const BadgeContent = styled.div``;

const Company = styled.div`
  margin: 10px 0;
  font-size: 12px;
  color: ${Color.Gray60};
`;

const ProductTitle = styled.div`
  color: ${Color.Gray80};
`;

const ProductPoint = styled.div`
  margin: 2px 0 10px 0;
`;

const ShoppingCartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
`;

export default WelfareProduct;
