import { Input } from "@nextui-org/input";
import { methodType } from "@/pages/FeedbackForm";

const EmailInput = ({ formData, handleDataChange }: methodType) => {
  const validateEmail = (value: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regex.test(value);
  };

  return (
    <>
      <div className="flex w-full gap-4">
        <Input
          isRequired
          type="text"
          label="First Name"
          variant="underlined"
          color="primary"
          value={formData.firstName}
          onValueChange={(value) => handleDataChange("firstName", value)}
        />

        <Input
          isRequired
          type="text"
          color="primary"
          label="Last Name"
          variant="underlined"
          value={formData.lastName}
          onValueChange={(value) => handleDataChange("lastName", value)}
        />
      </div>

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
    </>
  );
};

export default function Page1({ formData, handleDataChange }: methodType) {
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
