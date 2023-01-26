import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  auth: { [key: string]: string };
  setAuth: (auth: { [key: string]: string }) => void;
};

type AuthType = { [key: string]: string };

const authContextDefaultValues: AuthContextType = {
  auth: {},
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

// export const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthType>({});
  // console.log("prov auth", auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
