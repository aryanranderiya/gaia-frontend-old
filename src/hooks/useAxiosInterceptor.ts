import { apiauth } from "@/utils/apiaxios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import { publicPages } from "./useFetchUser";

export default function useAxiosInterceptor(
  setModalOpen: Dispatch<SetStateAction<boolean>>
) {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = apiauth.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          !publicPages.includes(location.pathname)
        ) {
          console.log("doing setModalOpen", location.pathname);
          setModalOpen(true);
          // toast.error("Session expired. Please log in again.");
        } else {
          console.log(
            "test",
            error.response.status,
            error.response,
            !publicPages.includes(location.pathname),
            location.pathname
          );
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiauth.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
}
