import { Link } from "react-router-dom";
import { GoogleColouredIcon } from "@/components/Misc/icons";
import { Button } from "@/components/ui/button";
import { apiauth } from "@/utils/apiaxios";
import { Spinner } from "@heroui/spinner";
import { useState } from "react";

export const handleGoogleLogin = () => {
  window.location.href = `${apiauth.getUri()}oauth/login/google`;
};

export default function LoginSignup({
  isLogin = false,
}: {
  isLogin?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <form className="w-screen h-screen flex justify-center items-center flex-col overflow-auto select-none">
      <div className="w-full max-w-screen-sm p-10 flex justify-center items-center flex-col gap-5 z-[1] relative bg-zinc-900  rounded-3xl">
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
        <Button
          className={`rounded-full text-md gap-2 px-4  ${
            loading ? "bg-zinc-800 hover:bg-zinc-800 text-primary" : ""
          }`}
          size={"lg"}
          type="button"
          variant="secondary"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            handleGoogleLogin();
          }}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span>Loading ...</span>
            </>
          ) : (
            <>
              <GoogleColouredIcon />
              <span>{isLogin ? "Sign in" : "Sign up"} with Google</span>
            </>
          )}
        </Button>
        <Link to={isLogin ? "/get-started" : "/login"}>
          <Button
            className="rounded-full text-md gap-2 px-4 text-primary font-normal"
            size={"lg"}
            type="button"
            variant="link"
          >
            {isLogin
              ? "New to GAIA? Create an Account"
              : "Already a user? Login here"}
          </Button>
        </Link>
      </div>
    </form>
  );
}
