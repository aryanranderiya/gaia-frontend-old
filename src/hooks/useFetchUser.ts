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
      const response = await apiauth.get("/oauth/me", {
        withCredentials: true,
      });

      console.log(response.data);

      setUserData(
        response?.data?.name,
        response?.data?.id,
        response?.data?.picture
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
