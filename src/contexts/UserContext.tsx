import { apiauth } from "@/utils/apiaxios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define the shape of the user object
interface User {
  name: string;
  email: string;
  profile_picture: string;
}

// Define the shape of the context
interface UserContextType {
  user: User | null;
  setUserData: (
    name: string | null,
    email: string | null,
    profile_picture: string | null
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
  const location = useLocation();

  const setUserData = (
    name: string | null,
    email: string | null,
    profile_picture: string | null
  ) => {
    if (name && email && profile_picture)
      setUser({ name, email, profile_picture });
    else setUser(null);
  };

  const logout = async () => {
    try {
      await apiauth.post(
        "/oauth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // if (response.status !== 200) throw new Error("Logout failed");
      // document.cookie =
      //   "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // document.cookie =
      //   "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null);
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Could not logout");
      console.error("Error during logout:", error);
    } finally {
      navigate("/login");
    }
  };

  // Handle redirect from backend after oauth login
  useEffect(() => {
    const { search } = location;

    if (search) {
      // const params = new URLSearchParams(search);

      // const accessToken = params.get("access_token");
      // const refreshToken = params.get("refresh_token");

      // if (window.location.hostname === "localhost") {
      //   document.cookie = `access_token=${accessToken}; Path=/;`;
      //   document.cookie = `refresh_token=${refreshToken}; Path=/;`;
      // } else {
      //   const backendUrl = import.meta.env.VITE_BACKEND_URL;
      //   const backendDomain = new URL(backendUrl).hostname;

      //   document.cookie = `access_token=${accessToken}; Path=/; Domain=${backendDomain}; Secure; SameSite=None`;
      //   document.cookie = `refresh_token=${refreshToken}; Path=/; Domain=${backendDomain}; Secure; SameSite=None`;
      // }

      // params.delete("access_token");
      // params.delete("refresh_token");

      navigate("/c");
    }
  }, [location.search, user]);

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
