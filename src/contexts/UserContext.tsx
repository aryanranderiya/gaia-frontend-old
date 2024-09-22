import React, { createContext, useContext, useState, ReactNode } from "react";

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
  logout: () => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserData = (
    firstName: string,
    lastName: string,
    id: string,
    profilePicture: string
  ) => {
    setUser({ firstName, lastName, id, profilePicture });
  };

  const logout = () => {
    setUser(null);
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
