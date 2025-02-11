import { useUser } from "@contexts/UserContext";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { apiauth } from "@/utils/apiaxios";

interface LoginSignupProps {
  isLogin?: boolean;
}

export default function LoginSignup({ isLogin = false }: LoginSignupProps) {
  const navigate = useNavigate();
  const { user } = useUser();

  React.useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    scope:
      "openid email profile https://www.googleapis.com/auth/calendar.events",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await apiauth.post("/oauth/callback", {
        code: codeResponse.code,
      });
      navigate("/try/chat");
      console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleGoogleFailure = () => {};
  return (
    <form className="w-screen h-screen flex justify-center items-center flex-col overflow-auto bg-custom-gradient">
      <div className="md:w-[40vw] w-full flex justify-center items-center flex-col gap-3 p-[1.5em]">
        <div className="mb-3 text-center space-y-2">
          <div className="text-4xl font-medium">
            {isLogin ? "Login" : "Create an Account"}
          </div>
          <div className="text-foreground-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, id.
          </div>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleFailure}
          theme="filled_black"
          size="large"
          shape="circle"
          // scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/calendar.readonly"
          // useOneTap
        />
        {/* {error && <div className="text-danger-500">Error: {error}</div>} */}
      </div>
    </form>
  );
}
