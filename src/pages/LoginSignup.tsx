import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
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
  PasswordValidationIcon,
} from "@/components/icons";
import * as React from "react";
import { ColoredLine } from "@/components/HorizontalRuler";
import CreateConfetti from "@/components/LandingPage/CreateConfetti";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../apiaxios";
import { Spinner } from "@nextui-org/spinner";
import { AxiosError } from "axios";
import { useUser } from "@contexts/UserContext";

async function CheckCommonPassword(password: string): Promise<boolean> {
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

interface LoginSignupProps {
  isLogin?: boolean;
}

export default function LoginSignup({ isLogin = false }: LoginSignupProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisible] =
    React.useState<boolean>(false);
  const [emailValid, setEmailValid] = React.useState<boolean>(true);
  const [passwordValid, setPasswordValid] = React.useState<boolean>(true);
  const [firstNameValid, setFirstNameValid] = React.useState<boolean>(true);
  const [lastNameValid, setLastNameValid] = React.useState<boolean>(true);
  const [isCommonPassword, setIsCommonPassword] =
    React.useState<boolean>(false);
  const [capsLockOn, setCapsLockOn] = React.useState<boolean>(false);
  const [confirmPasswordValid, setConfirmPasswordValid] =
    React.useState<boolean>(true);
  const [data, setData] = React.useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string; // Add this line
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // Add this line
  });

  const validateEmail = (email: string): boolean => {
    if (email === "") return false;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    if (name === "") return false;
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const validatePassword = (password: string): boolean => {
    if (password === "") return false;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passRegex.test(password);
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    return password === confirmPassword;
  };

  const capsLockCheck = (event: KeyboardEvent) => {
    const capsLockEnabled =
      event.getModifierState && event.getModifierState("CapsLock");
    setCapsLockOn(capsLockEnabled);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    capsLockCheck(event.nativeEvent);
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!isLogin) {
      setFirstNameValid(validateName(data.firstName));
      setLastNameValid(validateName(data.lastName));

      const isConfirmPasswordValid = validateConfirmPassword(
        data.password,
        data.confirmPassword
      );

      setConfirmPasswordValid(isConfirmPasswordValid);

      if (!isConfirmPasswordValid) {
        setLoading(false);
        return;
      }
    }

    setEmailValid(validateEmail(data.email));
    setPasswordValid(validatePassword(data.password));

    if (validatePassword(data.password)) {
      const findCommonPassword = await CheckCommonPassword(data.password);
      setPasswordValid(!findCommonPassword);
      setIsCommonPassword(findCommonPassword);
      if (findCommonPassword) {
        setLoading(false);
        return;
      }
    }

    const emailpasswordvalid =
      !validateEmail(data.email) || !validatePassword(data.password);

    const namesvalid =
      !validateName(data.firstName) || !validateName(data.lastName);

    if (
      (!isLogin && (namesvalid || emailpasswordvalid)) ||
      (isLogin && emailpasswordvalid)
    ) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        isLogin ? "/auth/login" : "/users",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (isLogin) {
        const { setUserData } = useUser();
        setUserData(
          response.data?.first_name,
          response.data?.last_name,
          response.data?.id,
          response.data?.profile_picture
        );
      }

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

      const error = e as AxiosError<{ detail: string }>;
      const errorMessage = error.response?.data?.detail || error.message;

      toast.error("Login failed", {
        unstyled: true,
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: "text-sm",
          description: "text-sm ",
        },
        duration: 3000,
        icon: <Cancel01Icon height="23" color="foreground" />,
        description: errorMessage.toString(),
      });
    }
    setLoading(false);
  };

  return (
    <form className="w-screen h-screen flex justify-center items-center flex-col overflow-auto bg-custom-gradient">
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
              color="primary"
              isInvalid={!firstNameValid}
              value={data.firstName}
              onValueChange={(value) => {
                setFirstNameValid(validateName(value.trim()));
                setData((oldFormData) => ({
                  ...oldFormData,
                  firstName: value.trim(),
                }));
              }}
            />

            <Input
              label="Last Name"
              value={data.lastName}
              fullWidth
              placeholder="Doe"
              variant="faded"
              type="text"
              startContent={<IdentityCardIcon height="20" />}
              isClearable
              color="primary"
              isInvalid={!lastNameValid}
              onValueChange={(value) => {
                setLastNameValid(validateName(value.trim()));
                setData((oldFormData) => ({
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
          errorMessage="Please enter a valid email"
          isInvalid={!emailValid}
          onValueChange={(value) => {
            setEmailValid(validateEmail(value.trim()));
            setData((oldFormData) => ({
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
          onKeyDown={handleKeyDown}
          onValueChange={(value) => {
            setPasswordValid(validatePassword(value.trim()));
            setData((oldFormData) => ({
              ...oldFormData,
              password: value.trim(),
            }));
          }}
          endContent={
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <ViewOffSlashIcon height="20" />
                ) : (
                  <ViewIcon height="20" />
                )}
              </button>
              {capsLockOn && (
                <div className="text-red-600 flex items-center">
                  <Alert02Icon height="20" /> Caps Lock is on!
                </div>
              )}
            </div>
          }
        />

        {!isLogin && (
          <Input
            label="Confirm Password"
            fullWidth
            color="primary"
            variant="faded"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="•••••••"
            isInvalid={!confirmPasswordValid}
            errorMessage="Passwords do not match."
            startContent={<PasswordValidationIcon height="20" />}
            onKeyDown={handleKeyDown}
            onValueChange={(value) => {
              setConfirmPasswordValid(
                validateConfirmPassword(data.password, value.trim())
              );
              setData((oldFormData) => ({
                ...oldFormData,
                confirmPassword: value.trim(),
              }));
            }}
            endContent={
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <ViewOffSlashIcon height="20" />
                  ) : (
                    <ViewIcon height="20" />
                  )}
                </button>
              </div>
            }
          />
        )}

        <div className="flex justify-center items-center gap-6 mt-4 flex-col">
          <Link to={isLogin ? "/signup" : "/login"} className="text-sm">
            {isLogin ? (
              <div className="flex gap-2">
                New here?
                <span className="underline">Create an account</span>
              </div>
            ) : (
              <div className="flex gap-2">
                Already have an account?
                <span className="underline">Login here</span>
              </div>
            )}
          </Link>

          <Button
            disabled={loading}
            className="w-full flex gap-3 flex-row font-semibold"
            onClick={handleSubmit}
            color="primary"
            variant="shadow"
            size="lg"
          >
            {isLogin ? "Login" : "Sign Up"}
            {loading && <Spinner color="default" size="sm" />}
          </Button>
        </div>

        <ColoredLine color="#303030" className="my-4" />

        <Button
          variant="flat"
          className="w-full"
          radius="full"
          size="lg"
          color="default"
          onClick={() => {
            window.open("https://www.google.com", "_self");
          }}
        >
          <GoogleColoured width="20" height="20" />
          <span className="text-sm">
            {isLogin ? "Login with Google" : "Sign Up with Google"}
          </span>
        </Button>
      </div>
    </form>
  );
}
