import { Textarea } from "@nextui-org/input";

const AdditionalTextAreas = ({ formData, handleDataChange }) => (
  <>
    <Textarea
      isRequired
      label="What concerns do you have about using a personalized AI assistant?"
      labelPlacement="outside"
      placeholder="(e.g., privacy, data security, accuracy)..."
      variant="underlined"
      size="md"
      minRows={1}
      maxRows={4}
      value={formData.concerns}
      onValueChange={(value) => handleDataChange("concerns", value)}
    />
    <Textarea
      isRequired
      label="What would make you more likely to use a new personalized AI assistant?"
      labelPlacement="outside"
      placeholder="Enter factors..."
      variant="underlined"
      size="md"
      minRows={1}
      maxRows={4}
      value={formData.factorsToUse}
      onValueChange={(value) => handleDataChange("factorsToUse", value)}
    />
  </>
);

export default function Page7({ formData, handleDataChange }) {
  if (formData.currentPage === 7)
    return (
      <>
        <AdditionalTextAreas
          formData={formData}
          handleDataChange={handleDataChange}
        />
        <Textarea
          label="Any additional comments or suggestions?"
          labelPlacement="outside"
          placeholder="Enter comments/suggestions..."
          variant="underlined"
          size="md"
          minRows={3}
          maxRows={5}
          value={formData.additionalComments}
          onValueChange={(value) =>
            handleDataChange("additionalComments", value)
          }
        />
      </>
    );
}
