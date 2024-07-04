import { Textarea } from "@nextui-org/input";

const TextAreaGroup = ({ formData, handleDataChange }) => (
  <>
    <Textarea
      isRequired
      label="What features do you find most useful in your current digital assistant?"
      labelPlacement="outside"
      placeholder="Enter features you find most useful..."
      variant="underlined"
      minRows={1}
      size="md"
      maxRows={4}
      value={formData.currentUsefulFeatures}
      onValueChange={(value) =>
        handleDataChange("currentUsefulFeatures", value)
      }
    />
    <Textarea
      isRequired
      label="What features do you wish your current / a digital assistant had?"
      labelPlacement="outside"
      placeholder="Enter desired features..."
      variant="underlined"
      minRows={1}
      size="md"
      maxRows={4}
      value={formData.desiredFeatures}
      onValueChange={(value) => handleDataChange("desiredFeatures", value)}
    />
    <Textarea
      isRequired
      label="What are the main challenges you face when using your current digital assistant?"
      labelPlacement="outside"
      placeholder="Enter challenges faced..."
      variant="underlined"
      size="md"
      minRows={1}
      maxRows={4}
      value={formData.challenges}
      onValueChange={(value) => handleDataChange("challenges", value)}
    />
  </>
);

export default function Page4({ formData, handleDataChange }) {
  if (formData.currentPage === 4)
    return (
      <>
        <TextAreaGroup
          formData={formData}
          handleDataChange={handleDataChange}
        />
      </>
    );
}
