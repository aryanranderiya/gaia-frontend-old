import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

import { GoogleColouredIcon } from "../Misc/icons";
import { Button } from "../ui/button";

import { apiauth } from "@/utils/apiaxios";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
}) {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "popup",
    scope:
      "openid email profile https://www.googleapis.com/auth/calendar.events",
    onSuccess: async (codeResponse) => {
      await apiauth.get("/oauth/google/callback", {
        params: {
          code: codeResponse.code,
        },
      });

      navigate("/c");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-white bg-zinc-900 border-none p-10 flex justify-center items-center flex-col gap-5 !rounded-3xl">
        <>
          <div className="mb-3 text-center space-y-2">
            <div className="text-5xl font-medium">Login</div>
            <div className="text-foreground-600 text-lg">
              Please login to continue your journey with GAIA.
            </div>
          </div>
          <Button
            className="rounded-full text-md gap-2 px-4"
            size={"lg"}
            type="button"
            variant="secondary"
            onClick={() => handleGoogleLogin()}
          >
            <GoogleColouredIcon />
            Sign in with Google
          </Button>
          <Link to={"/get-started"}>
            <Button
              className="rounded-full text-md gap-2 px-4 text-primary font-normal"
              size={"lg"}
              type="button"
              variant="link"
            >
              New to GAIA? Create an Account
            </Button>
          </Link>
        </>
      </DialogContent>
    </Dialog>
  );
}
