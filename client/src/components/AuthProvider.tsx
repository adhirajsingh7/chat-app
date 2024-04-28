import { createContext, PropsWithChildren, useContext, useState } from "react";

const AuthContext = createContext<IUser | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({
  children,
  isSignedIn,
}: AuthProviderProps) {
  
  const userData = {
    username: "a",
    email: "a@email.com",
    password: "a",
  };
  
  isSignedIn = true;
  
  const [user] = useState<IUser | null>(isSignedIn ? userData : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
