import { RadioGroup, Radio } from "@nextui-org/radio";
import ScaleSlider from "./ScaleSlider";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Select, SelectItem } from "@nextui-org/select";

const UsageScaleSliders = ({ formData, handleDataChange }) => (
  <>
    <ScaleSlider
      title={
        <>
          How often do you use <b>Open AI's ChatGPT</b>?
        </>
      }
      value={formData.openAIUsage}
      onChange={(value) => handleDataChange("openAIUsage", value)}
    />
    <ScaleSlider
      title={
        <>
          How often do you use <b>Google's Bard</b>?
        </>
      }
      value={formData.googleBardUsage}
      onChange={(value) => handleDataChange("googleBardUsage", value)}
    />
  </>
);

const DigitalAssistantUsage = ({ formData, handleDataChange }) => (
  <>
    <RadioGroup
      isRequired
      label={
        <>
          Do you currently use any <b>digital assistant</b> services? (e.g.,
          Siri, Google Assistant, Alexa)
        </>
      }
      size="md"
      orientation="horizontal"
      value={formData.usesDigitalAssistant}
      className="w-full text-sm"
      onValueChange={(value) => handleDataChange("usesDigitalAssistant", value)}
    >
      <Radio value="yes">Yes</Radio>
      <Radio value="no">No</Radio>
    </RadioGroup>

    <CheckboxGroup
      isRequired
      label="If yes, which one(s) do you use? (Select all that apply)"
      orientation="horizontal"
      size="md"
      color="primary"
      className="w-full text-sm"
      value={formData.digitalAssistantDetails}
      onChange={(value) => handleDataChange("digitalAssistantDetails", value)}
    >
      <Checkbox value="Siri">Siri</Checkbox>
      <Checkbox value="Assistant">Google Assistant</Checkbox>
      <Checkbox value="Alexa">Alexa</Checkbox>
      <Checkbox value="Cortana">Cortana</Checkbox>
    </CheckboxGroup>
  </>
);

function FrequencySelect({ formData, handleDataChange }) {
  const interactionFrequency = [
    { key: "less_than_once", label: "Less than once a day" },
    { key: "1_2_times", label: "1-2 times a day" },
    { key: "3_5_times", label: "3-5 times a day" },
    { key: "more_than_5_times", label: "More than 5 times a day" },
  ];

  return (
    <Select
      isRequired
      label="How often do you interact with your digital assistant?"
      variant="underlined"
      size="md"
      classNames={{ label: "text-left" }}
      defaultSelectedKeys={[formData.interactionFrequency]}
      onSelectionChange={(value) =>
        handleDataChange("interactionFrequency", Array.from(value)[0])
      }
    >
      {interactionFrequency.map((frequency) => (
        <SelectItem key={frequency.key} value={frequency.key}>
          {frequency.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default function Page3({ formData, handleDataChange }) {
  if (formData.currentPage === 3)
    return (
      <>
        <UsageScaleSliders
          formData={formData}
          handleDataChange={handleDataChange}
        />
        <DigitalAssistantUsage
          formData={formData}
          handleDataChange={handleDataChange}
        />
        <FrequencySelect
          formData={formData}
          handleDataChange={handleDataChange}
        />
      </>
    );
}
