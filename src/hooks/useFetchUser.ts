import { useUser } from "@/contexts/UserContext";
import { apiauth } from "@/utils/apiaxios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const authPages = ["/login", "/signup", "/get-started", "/"];
export const publicPages = [...authPages, "/terms", "/privacy", "/contact"];

const useFetchUser = () => {
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await apiauth.get("/oauth/me", {
        withCredentials: true,
      });

      setUserData(
        response?.data?.name,
        response?.data?.email,
        response?.data?.picture
      );

      // If the user is on one of these pages after login, navigate to chat
      if (authPages.includes(location.pathname)) {
        navigate("/c");
        // if (setModalOpen) setModalOpen(false);
      }
    } catch (err) {
      // If the user is not logged in, display modal if not on one of these pages
      // if (!publicPages.includes(location.pathname) && !!setModalOpen)
      //   setModalOpen(true);
      setUserData(null, null, null);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
};

export default useFetchUser;
