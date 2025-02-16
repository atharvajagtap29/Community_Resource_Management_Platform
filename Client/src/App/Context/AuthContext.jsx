import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUserAPI } from "../API/Users/User";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  const logout = async () => {
    try {
      console.log("Logging out...>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      await signOutUserAPI(); // Call API to clear cookies
    } catch (error) {
      console.error("Error during logout:", error);
    }

    // Clear user data
    setUser(null);
    localStorage.removeItem("user");

    navigate("/"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
