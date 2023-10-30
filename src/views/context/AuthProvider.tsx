import { User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import { LoadingPage, isLoadingRecoil } from "../hooks/AuthRecoil";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingRecoil);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((fbUser) => {
      setUser(fbUser);
      setIsLoading(false);
    });
    return subscribe;
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
