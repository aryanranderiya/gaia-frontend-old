import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import * as React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

const EmailInput = ({ formData, handleDataChange }) => {
  const validateEmail = (value) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regex.test(value);
  };

  return (
    <>
      <Input
        type="email"
        label="Enter your Email"
        isRequired
        isClearable
        size="md"
        color={!validateEmail(formData.email) ? "danger" : "primary"}
        variant="underlined"
        value={formData.email}
        onValueChange={(value) => handleDataChange("email", value)}
        isInvalid={!validateEmail(formData.email)}
        errorMessage={"Please enter a valid email address"}
      />

      <PhoneInput
        defaultCountry="IN"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={(value) => {
          if (!value) {
            handleDataChange("phone", "");
            return;
          }
          if (isValidPhoneNumber(value)) handleDataChange("phone", value);
          else handleDataChange("phone", "");
        }}
      />
    </>
  );
};

export default function Page1({ formData, handleDataChange }) {
  if (formData.currentPage === 1)
    return (
      <>
        <div className="flex flex-col gap-2 w-full mb-2">
          <span className="font-bold text-xl">Feedback Form</span>
          <span>
            Help us create the perfect personalized AI assistant by sharing your
            preferences, needs, and usage habits. Your feedback will shape the
            future of our AI assistant to better serve you!
          </span>
        </div>

        <EmailInput formData={formData} handleDataChange={handleDataChange} />
      </>
    );
}
