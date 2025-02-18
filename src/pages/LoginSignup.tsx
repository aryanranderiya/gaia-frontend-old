// GoogleColouredIcon
import { Button as NextUIBtn } from "@heroui/button";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoogleCalendar } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { apiauth } from "@/utils/apiaxios";
// import BubblePitFooter from "@/components/BubblePitFooter";

export function Calendaradd() {
  return (
    <div className="p-4 bg-zinc-800 rounded-2xl rounded-bl-none mt-1 flex gap-1 flex-col max-w-[400px] min-w-[400px] w-fit">
      <div className="">Would you like to add this event to your Calendar?</div>

      <div className="bg-zinc-900 p-3 flex flex-row rounded-xl items-start gap-3 ">
        <GoogleCalendar height={35} width={25} />
        <div className="flex flex-col gap-1">
          <div>
            <div className="font-medium">Meeting with Sarah</div>
            <div className="text-sm">Scheduled meeting with Sarah</div>
          </div>
          <div className="text-xs text-foreground-500">Fri Feb 14 2025</div>
        </div>
      </div>

      <NextUIBtn
        color="primary"
        className="w-full"
        // onPress={DummyAddToCalendar}
        // isLoading={eventAddLoading}
      >
        Add Event
      </NextUIBtn>
    </div>
  );
}

export default function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // const handleGoogleLogin = useGoogleLogin({
  //   flow: "auth-code",
  //   ux_mode: "popup",
  //   scope:
  //     "openid email profile https://www.googleapis.com/auth/calendar.events",
  //   onSuccess: async (codeResponse) => {
  //     console.log(codeResponse);
  //     const tokens = await apiauth.post("/oauth/callback", {
  //       code: codeResponse.code,
  //     });

  //     navigate("/try/chat");
  //     console.log(tokens);
  //   },
  //   onError: (errorResponse) => console.log(errorResponse),
  // });

  return (
    <form className="w-screen h-screen flex justify-center items-center flex-col overflow-auto bg-custom-gradient select-none login_page">
      <div className="w-fit p-10 flex justify-center items-center flex-col gap-5 z-[1] relative bg-black/30 backdrop-blur-lg bg-opacity-75 rounded-3xl">
        <div className="mb-3 text-center space-y-2">
          <div className="text-5xl font-medium">
            {isLogin ? "Login" : "Sign Up"}
          </div>
          <div className="text-foreground-600 text-lg">
            {isLogin
              ? "Welcome back! Please login to continue your journey with GAIA."
              : "Join us today by creating an account. It's quick and easy!"}
          </div>
        </div>
        <GoogleLogin
          useOneTap
          shape="pill"
          size="large"
          theme="filled_black"
          onError={() => {
          console.log("Login Failed");
          }}
          onSuccess={async (credentialResponse) => {
            // console.log(credentialResponse);
            const tokens = await apiauth.post("/oauth/google", {
              credential: credentialResponse.credential,
              clientId: credentialResponse.clientId,
              select_by: credentialResponse.select_by,
            });

            navigate("/try/chat");
            console.log(tokens);
          }}
        />
        {/* <Button
          onClick={() => handleGoogleLogin()}
          variant="secondary"
          className="rounded-full text-md gap-2 px-4"
          type="button"
          size={"lg"}
        >
          <GoogleColouredIcon />
          {isLogin ? "Sign in" : "Sign up"} with Google
        </Button> */}
        <Button
          className="rounded-full text-md gap-2 px-4 text-primary font-normal"
          size={"lg"}
          type="button"
          variant="link"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin
            ? "New to GAIA? Create an Account"
            : "Already a user? Login here"}
        </Button>
      </div>

      {/* <div className="sm:block hidden">
        <BubblePitFooter /> */}
      {/* </div> */}
    </form>
  );
}
