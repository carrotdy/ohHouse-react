import { ClipLoader } from "react-spinners";
import { atom, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Color } from "../constants/style/Color";

export const isLoadingRecoil = atom<boolean>({
  key: "isLoadingRecoil",
  default: true,
});

export const LoadingPage: React.FC = () => {
  const isLoading = useRecoilValue(isLoadingRecoil);

  return (
    <>
      {isLoading && (
        <LoadingBar>
          <ClipLoader color={Color.Orange} />
        </LoadingBar>
      )}
    </>
  );
};

const LoadingBar = styled.div({
  textAlign: "center",
  margin: "10px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});
