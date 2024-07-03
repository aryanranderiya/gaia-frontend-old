import { RadioGroup, Radio } from "@nextui-org/radio";
import ScaleSlider from "./ScaleSlider";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Select, SelectItem } from "@nextui-org/select";

const UsageScaleSliders = ({ formData, handleSliderChange }) => (
  <>
    <ScaleSlider
      title={
        <>
          How often do you use <b>Open AI's ChatGPT</b>?
        </>
      }
      value={formData.openAIUsage}
      onChange={(value) => handleSliderChange("openAIUsage", value)}
    />
    <ScaleSlider
      title={
        <>
          How often do you use <b>Google's Bard</b>?
        </>
      }
      value={formData.googleBardUsage}
      onChange={(value) => handleSliderChange("googleBardUsage", value)}
    />
  </>
);

const DigitalAssistantUsage = ({ formData, handleRadioChange }) => (
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
      onValueChange={(value) =>
        handleRadioChange("usesDigitalAssistant", value)
      }
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
      onChange={(value) =>
        handleCheckboxChange("digitalAssistantDetails", value)
      }
    >
      <Checkbox value="Siri">Siri</Checkbox>
      <Checkbox value="Assistant">Google Assistant</Checkbox>
      <Checkbox value="Alexa">Alexa</Checkbox>
      <Checkbox value="Cortana">Cortana</Checkbox>
    </CheckboxGroup>
  </>
);

function FrequencySelect({ formData, handleSelectChange }) {
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
      value={formData.interactionFrequency}
      onValueChange={(value) =>
        handleSelectChange("interactionFrequency", value)
      }
      classNames={{ label: "text-left" }}
    >
      {interactionFrequency.map((frequency) => (
        <SelectItem key={frequency.key} value={frequency.key}>
          {frequency.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default function Page2({
  formData,
  handleSliderChange,
  handleRadioChange,
  handleSelectChange,
}) {
  if (formData.currentPage === 2)
    return (
      <>
        <UsageScaleSliders
          formData={formData}
          handleSliderChange={handleSliderChange}
        />
        <DigitalAssistantUsage
          formData={formData}
          handleRadioChange={handleRadioChange}
        />
        <FrequencySelect
          formData={formData}
          handleSelectChange={handleSelectChange}
        />
      </>
    );
}
