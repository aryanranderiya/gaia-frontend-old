import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Button as ShadcnButton } from "../components/Shadcn/Button";
import { Link } from "react-router-dom";
import {
  ViewIcon,
  ViewOffSlashIcon,
  LockPasswordIcon,
  IdentityCardIcon,
  Mail01Icon,
  Alert02Icon,
  Tick02Icon,
  Cancel01Icon,
  GoogleColoured,
} from "../components/icons";
import * as React from "react";
import { ColoredLine } from "../components/HorizontalRuler";
import CreateConfetti from "../components/LandingPage/CreateConfetti";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../apiaxios";

async function CheckCommonPassword(password) {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt"
    );
    if (!response.ok) throw new Error("Failed to fetch common password list");
    const text = await response.text();
    const commonPasswords = text.split("\n").map((pw) => pw.trim());
    return commonPasswords.includes(password);
  } catch (error) {
    console.error("Error checking common password:", error);
    return false;
  }
}

export default function LoginSignup({ isLogin = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [firstNameValid, setFirstNameValid] = React.useState(true);
  const [lastNameValid, setLastNameValid] = React.useState(true);
  const [isCommonPassword, setIsCommonPassword] = React.useState(false);
  const [capsLockOn, setCapsLockOn] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    if (email === "") return false;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    if (name === "") return false;
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const validatePassword = (password) => {
    if (password === "") return false;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passRegex.test(password);
  };

  const capsLockCheck = (event) => {
    const capsLockEnabled =
      event.getModifierState && event.getModifierState("CapsLock");
    setCapsLockOn(capsLockEnabled);
  };

  const handleKeyDown = (event) => {
    capsLockCheck(event);
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!isLogin) {
      setEmailValid(validateEmail(formData.email));
      setFirstNameValid(validateName(formData.firstName));
    }
    setLastNameValid(validateName(formData.lastName));
    setPasswordValid(validatePassword(formData.password));

    if (validatePassword(formData.password)) {
      const findCommonPassword = await CheckCommonPassword(formData.password);
      setPasswordValid(!findCommonPassword);
      setIsCommonPassword(findCommonPassword);
      if (findCommonPassword) {
        setLoading(false);
        return;
      }
    }

    const emailpasswordvalid =
      !validateEmail(formData.email) || !validatePassword(formData.password);

    const namesvalid =
      !validateName(formData.firstName) || !validateName(formData.lastName);

    if (
      (!isLogin && (namesvalid || emailpasswordvalid)) ||
      (isLogin && emailpasswordvalid)
    ) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        isLogin ? "/login" : "/signup",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      navigate(isLogin ? "/try/chat" : "/login");
      toast.success("Welcome to GAIA!", {
        unstyled: true,
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast",
          title: "text-black text-sm",
          description: "text-sm text-black",
        },
        duration: 3000,
        icon: <Tick02Icon height="23" color="black" />,
        description: `Successfully ${isLogin ? "logged in" : "created an account"}.`,
      });

      CreateConfetti(2000);
    } catch (e) {
      console.error(e);
      const errorMessage = e.response ? e.response.data.detail : e.toString();
      toast.error("Login failed", {
        unstyled: true,
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: "text-sm",
          description: "text-sm ",
        },
        duration: 3000,
        icon: <Cancel01Icon height="23" color="foreground" />,
        description: errorMessage,
      });
    }
    setLoading(false);
  };

  return (
    <form className="w-screen h-screen flex justify-center items-center flex-col overflow-auto">
      <div className="md:w-[40vw] w-full flex justify-center items-center flex-col gap-3 p-[1.5em]">
        <span className="text-4xl font-medium mb-5">
          {isLogin ? "Login" : "Create an Account"}
        </span>

        {!isLogin && (
          <div className="flex w-full gap-2 flex-row mb-1">
            <Input
              label="First Name"
              fullWidth
              placeholder="John"
              variant="faded"
              type="text"
              startContent={<IdentityCardIcon height="20" />}
              isClearable
              autoComplete
              size="lg"
              color="primary"
              isInvalid={!firstNameValid}
              value={formData["firstName"]}
              onValueChange={(value) => {
                setFirstNameValid(validateName(value.trim()));
                setFormData((oldFormData) => ({
                  ...oldFormData,
                  firstName: value.trim(),
                }));
              }}
            />

            <Input
              label="Last Name"
              value={formData["lastName"]}
              fullWidth
              placeholder="Doe"
              variant="faded"
              type="text"
              startContent={<IdentityCardIcon height="20" />}
              isClearable
              color="primary"
              autoComplete
              size="lg"
              isInvalid={!lastNameValid}
              onValueChange={(value) => {
                setLastNameValid(validateName(value.trim()));
                setFormData((oldFormData) => ({
                  ...oldFormData,
                  lastName: value.trim(),
                }));
              }}
            />
          </div>
        )}

        <Input
          label="Email"
          fullWidth
          color={emailValid ? "primary" : "danger"}
          variant="faded"
          type="email"
          isClearable
          startContent={<Mail01Icon height="20" />}
          placeholder="name@example.com"
          description={
            !isLogin && "We'll never share your email with anyone else."
          }
          autoComplete
          errorMessage="Please enter a valid email"
          size="lg"
          isInvalid={!emailValid}
          onValueChange={(value) => {
            setEmailValid(validateEmail(value.trim()));
            setFormData((oldFormData) => ({
              ...oldFormData,
              email: value.trim(),
            }));
          }}
        />

        <Input
          label="Password"
          fullWidth
          color="primary"
          variant="faded"
          type={isPasswordVisible ? "text" : "password"}
          description={
            !isLogin && "Please enter a strong password for your account."
          }
          placeholder="•••••••"
          startContent={<LockPasswordIcon height="20" />}
          isInvalid={!passwordValid}
          errorMessage={
            isCommonPassword
              ? "Your password is too common. Try Again"
              : "Your password should be at least 8 characters long and include a combination of uppercase & lowercase letters, numbers, and special symbols."
          }
          size="lg"
          onKeyDown={handleKeyDown}
          onValueChange={(value) => {
            setPasswordValid(validatePassword(value));
            setFormData((oldFormData) => ({
              ...oldFormData,
              password: value,
            }));
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setPasswordVisible((value) => !value)}
            >
              {isPasswordVisible ? (
                <ViewOffSlashIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <ViewIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />

        {capsLockOn && (
          <div className="w-full text-sm text-warning flex items-center -mt-3 gap-1">
            <Alert02Icon color="warning" width="16" />
            Caps lock is on
          </div>
        )}

        <Link to={isLogin ? "/Signup" : "/Login"}>
          <ShadcnButton
            variant="link"
            color="default"
            className="font-normal"
            type="button"
          >
            {isLogin
              ? "New to GAIA? Create an account."
              : "Already have an account? Log in here."}
          </ShadcnButton>
        </Link>

        <Button
          color="primary"
          variant="shadow"
          className="w-full max-w-[200px] font-medium"
          onPress={handleSubmit}
          isLoading={loading}
        >
          {isLogin ? "Login" : "Signup"}
        </Button>

        {/* <ColoredLine color="#262626" className="my-4" width="100%" /> */}

        {/* <Button
          color="default"
          variant="shadow"
          startContent={<GoogleColoured width="20px" height="20px" />}
          className="bg-zinc-300 text-black w-full max-w-[200px] font-medium"
        >
          {isLogin ? "Signup" : "Login"}
          &nbsp;with Google
        </Button> */}
      </div>
    </form>
  );
}
