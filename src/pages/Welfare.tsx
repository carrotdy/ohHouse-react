import { debounce } from "lodash-es";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import { Container, SubTitle, Title } from "../components/Common";
import { DummyData } from "../constants/data/DummyData";
import { ProductModel } from "../constants/model/ProductModel";
import { Color } from "../constants/style/Color";
import WelfareProduct from "./WelfareProduct";

const ITEMS_PER_PAGE = 6;

const Welfare: React.FunctionComponent = () => {
  const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_PAGE); // 페이지당 보여줄 항목 수
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 무한스크롤
  const handleScroll = () => {
    if (isLoading) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const currentHeight =
      document.documentElement.scrollTop + window.innerHeight;

    if (currentHeight >= scrollHeight - 140) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleItems((pre) => pre + ITEMS_PER_PAGE);
        setIsLoading(false);
      }, 1000);
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll); // 이전에 등록한 스크롤 이벤트 리스너 제거
    };
  }, [debouncedHandleScroll]);

  return (
    <Container>
      {DummyData && (
        <>
          <Title>오하우스 복지몰</Title>
          <SubTitle>
            오하우스 모든 직원들이 복지포인트를 이용하여
            <br />
            쇼핑을 할 수 있는 공간입니다
          </SubTitle>
          <ProductCardContainer>
            {DummyData.slice(0, visibleItems).map(
              (data: ProductModel.IProductModel, index: number) => {
                return (
                  <WelfareProduct key={data.id} data={data} index={index} />
                );
              }
            )}
          </ProductCardContainer>
          {isLoading && (
            <>
              {visibleItems >= DummyData.length ? null : (
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                  <SyncLoader color={Color.Orange} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

const ProductCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

export default Welfare;
