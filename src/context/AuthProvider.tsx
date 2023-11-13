import { User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { Color } from "../constants/style/Color";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((fbUser) => {
      setUser(fbUser);
      setIsLoading(false);
    });
    return subscribe;
  }, []);

  if (isLoading) {
    return (
      <LoadingBar>
        <ClipLoader color={Color.Orange} />
      </LoadingBar>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const LoadingBar = styled.div({
  textAlign: "center",
  margin: "10px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});
