import React, { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiauth } from "@/utils/apiaxios";

// Define the shape of the user object
interface User {
  name: string;
  email: string;
  profile_picture: string;
}

// Define the shape of the context
interface UserContextType {
  user: User | null;
  setUserData: (name: string, email: string, profile_picture: string) => void;
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
    name: string,
    email: string,
    profile_picture: string
  ) => {
    setUser({ name, email, profile_picture });
  };

  const logout = async () => {
    try {
      const response = await apiauth.post(
        "/oauth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) throw new Error("Logout failed");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      navigate("/get-started");
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
