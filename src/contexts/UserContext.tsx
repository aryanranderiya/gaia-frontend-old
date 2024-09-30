import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { apiauth } from "@/apiaxios";

// Define the shape of the user object
interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  id: string;
}

// Define the shape of the context
interface UserContextType {
  user: User | null;
  setUserData: (
    firstName: string,
    lastName: string,
    id: string,
    profilePicture: string
  ) => void;
  logout: () => Promise<void>; // Update to return a Promise
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const setUserData = (
    firstName: string,
    lastName: string,
    id: string,
    profilePicture: string
  ) => {
    setUser({ firstName, lastName, id, profilePicture });
  };

  const logout = async () => {
    try {
      const response = await apiauth.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.status !== 200) throw new Error("Logout failed");

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
