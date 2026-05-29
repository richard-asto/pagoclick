import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const login = (data) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      })
    );
    setUser(data.user);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};