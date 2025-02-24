import { apiauth } from "@/utils/apiaxios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useAxiosInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = apiauth.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.config && error.config.url === "/oauth/me")
          return Promise.reject(error);

        toast.error("Something went wrong. Please try again.");

        try {
          await apiauth.get("/oauth/me");
        } catch (pingError) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiauth.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
}
