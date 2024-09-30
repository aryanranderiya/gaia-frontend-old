// hooks/useFetchUser.ts

import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { apiauth } from "@/apiaxios";
import { useNavigate } from "react-router-dom";

const useFetchUser = () => {
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await apiauth.get("/auth/me", {
        withCredentials: true,
      });
      setUserData(
        response?.data?.first_name,
        response?.data?.last_name,
        response?.data?.id,
        response?.data?.profile_picture
      );
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
};

export default useFetchUser;
