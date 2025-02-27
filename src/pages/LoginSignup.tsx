import { Link } from "react-router-dom";

import { GoogleColouredIcon } from "@/components/Misc/icons";
import { Button } from "@/components/ui/button";
import { apiauth } from "@/utils/apiaxios";
// import { Button as NextUIBtn } from "@heroui/button";

// export function Calendaradd() {
//   return (
//     <div className="p-4 bg-zinc-800 rounded-2xl rounded-bl-none mt-1 flex gap-1 flex-col max-w-[400px] min-w-[400px] w-fit">
//       <div className="">Would you like to add this event to your Calendar?</div>

//       <div className="bg-zinc-900 p-3 flex flex-row rounded-xl items-start gap-3 ">
//         <GoogleCalendar height={35} width={25} />
//         <div className="flex flex-col gap-1">
//           <div>
//             <div className="font-medium">Meeting with Sarah</div>
//             <div className="text-sm">Scheduled meeting with Sarah</div>
//           </div>
//           <div className="text-xs text-foreground-500">Fri Feb 14 2025</div>
//         </div>
//       </div>

//       <NextUIBtn color="primary" className="w-full">
//         Add Event
//       </NextUIBtn>
//     </div>
//   );
// }

export const handleGoogleLogin = () => {
  window.location.href = `${apiauth.getUri()}oauth/login/google`;
};

export default function LoginSignup({
  isLogin = false,
}: {
  isLogin?: boolean;
}) {
  return (
    <form className="w-screen h-screen flex justify-center items-center flex-col overflow-auto bg-custom-gradient select-none">
      <div className="w-full max-w-screen-sm p-10 flex justify-center items-center flex-col gap-5 z-[1] relative sm:bg-zinc-950 bg-transparent  backdrop-blur-lg bg-opacity-75 rounded-3xl">
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
          className="rounded-full text-md gap-2 px-4"
          size={"lg"}
          type="button"
          variant="secondary"
          onClick={() => handleGoogleLogin()}
        >
          <GoogleColouredIcon />
          {isLogin ? "Sign in" : "Sign up"} with Google
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
