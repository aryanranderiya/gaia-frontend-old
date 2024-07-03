import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SentIcon } from "../components/icons";
export function ScaleSlider({
  title,
  highest = "every day",
  lowest = "not at all",
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-between">
        <span>{title}</span>
        <span>
          1 being <b>{lowest}</b>, 10 being <b>{highest}</b>
        </span>
      </div>
      <Slider
        color="primary"
        isRequired
        size="md"
        showSteps
        step={1}
        maxValue={10}
        minValue={1}
        defaultValue={1}
        className="w-full"
        marks={[
          { value: 1, label: "1", "aria-label": "Slider value 1" },
          { value: 2, label: "2", "aria-label": "Slider value 2" },
          { value: 3, label: "3", "aria-label": "Slider value 3" },
          { value: 4, label: "4", "aria-label": "Slider value 4" },
          { value: 5, label: "5", "aria-label": "Slider value 5" },
          { value: 6, label: "6", "aria-label": "Slider value 6" },
          { value: 7, label: "7", "aria-label": "Slider value 7" },
          { value: 8, label: "8", "aria-label": "Slider value 8" },
          { value: 9, label: "9", "aria-label": "Slider value 9" },
          { value: 10, label: "10", "aria-label": "Slider value 10" },
        ]}
      />
    </div>
  );
}

export default function FeedbackForm() {
  const occupations = [
    { key: "student", label: "Student" },
    { key: "professional", label: "Professional" },
    { key: "self_employed", label: "Self-employed" },
    { key: "unemployed", label: "Unemployed" },
    { key: "retired", label: "Retired" },
  ];

  const ageRanges = [
    { key: "under_18", label: "Under 18" },
    { key: "18_24", label: "18-24" },
    { key: "25_34", label: "25-34" },
    { key: "35_44", label: "35-44" },
    { key: "45_54", label: "45-54" },
    { key: "55_64", label: "55-64" },
    { key: "65_over", label: "65 and over" },
  ];

  const devices = [
    { key: "smartphone", label: "Smartphone" },
    { key: "tablet", label: "Tablet" },
    { key: "laptop", label: "Laptop" },
    { key: "desktop", label: "Desktop" },
    { key: "smartwatch", label: "Smartwatch" },
  ];

  const operatingSystems = [
    { key: "ios", label: "iOS" },
    { key: "android", label: "Android" },
    { key: "windows", label: "Windows" },
    { key: "macos", label: "macOS" },
    { key: "linux", label: "Linux" },
    { key: "other", label: "Other" },
  ];

  const interactionFrequency = [
    { key: "less_than_once", label: "Less than once a day" },
    { key: "1_2_times", label: "1-2 times a day" },
    { key: "3_5_times", label: "3-5 times a day" },
    { key: "more_than_5_times", label: "More than 5 times a day" },
  ];

  return (
    <div className="feedback_form_container">
      <div className="feedback_form">
        <AgeOccupationSelects ageRanges={ageRanges} occupations={occupations} />
        <DevicesOperatingSystemsSelects
          devices={devices}
          operatingSystems={operatingSystems}
        />
        <EmailInput />
        <UsageScaleSliders />
        <DigitalAssistantUsage />
        <DigitalAssistantUsageDetails />
        <MostUsedDevice />
        <TextAreaGroup />
        <SituationsCheckboxGroup />
        <FrequencySelect interactionFrequency={interactionFrequency} />
        <CustomisationScaleSlider />
        <MobileAppDownloadScaleSlider />
        <AccountCreationScaleSlider />
        <CalendarServiceUsage />
        <LearningBehaviorRadioGroup />
        <AdditionalTextAreas />
        <div className="flex justify-end w-full">
          <Button
            className="h-full py-2"
            size="lg"
            color="primary"
            endContent={<SentIcon color="foreground" width="20" />}
          >
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  );
}

const AgeOccupationSelects = ({ ageRanges, occupations }) => (
  <div className="flex w-full gap-7">
    <Select
      label="Select your age range"
      variant="underlined"
      size="lg"
      aria-label="Select your age range"
    >
      {ageRanges.map((age) => (
        <SelectItem key={age.key}>{age.label}</SelectItem>
      ))}
    </Select>

    <Select
      label="Select your occupation"
      variant="underlined"
      size="lg"
      aria-label="Select your occupation"
    >
      {occupations.map((occupation) => (
        <SelectItem key={occupation.key}>{occupation.label}</SelectItem>
      ))}
    </Select>
  </div>
);

const DevicesOperatingSystemsSelects = ({ devices, operatingSystems }) => (
  <div className="flex w-full gap-7">
    <Select
      label="Which devices do you use regularly? (Select all that apply)"
      selectionMode="multiple"
      variant="underlined"
      size="lg"
      aria-label="Select devices you use regularly"
    >
      {devices.map((device) => (
        <SelectItem key={device.key}>{device.label}</SelectItem>
      ))}
    </Select>

    <Select
      label="Which operating systems do you use? (Select all that apply)"
      selectionMode="multiple"
      variant="underlined"
      size="lg"
      aria-label="Select operating systems you use"
    >
      {operatingSystems.map((os) => (
        <SelectItem key={os.key}>{os.label}</SelectItem>
      ))}
    </Select>
  </div>
);

const EmailInput = () => (
  <Input
    type="email"
    label="Email"
    placeholder="Enter your email"
    isClearable
    size="lg"
    color="primary"
    variant="underlined"
    isRequired
  />
);

const UsageScaleSliders = () => (
  <>
    <ScaleSlider
      title={
        <>
          How often do you use <b>Open AI's ChatGPT</b>?
        </>
      }
    />
    <ScaleSlider
      title={
        <>
          How often do you use <b>Google's Bard</b>?
        </>
      }
    />
  </>
);

const DigitalAssistantUsage = () => (
  <RadioGroup
    label={
      <>
        Do you currently use any <b>digital assistant</b> services? (e.g., Siri,
        Google Assistant, Alexa)
      </>
    }
    size="lg"
    orientation="horizontal"
  >
    <Radio value="yes">Yes</Radio>
    <Radio value="no">No</Radio>
  </RadioGroup>
);

const DigitalAssistantUsageDetails = () => (
  <CheckboxGroup
    label="If yes, which one(s) do you use? (Select all that apply)"
    orientation="horizontal"
    size="lg"
    color="primary"
  >
    <Checkbox value="Siri">Siri</Checkbox>
    <Checkbox value="Assistant">Google Assistant</Checkbox>
    <Checkbox value="Alexa">Alexa</Checkbox>
    <Checkbox value="Cortana">Cortana</Checkbox>
  </CheckboxGroup>
);

const MostUsedDevice = () => (
  <RadioGroup
    label={
      <>
        Which <b>device </b> do you use most often?
      </>
    }
    size="lg"
    orientation="horizontal"
  >
    <Radio value="computer">PC</Radio>
    <Radio value="mobile">Mobile</Radio>
  </RadioGroup>
);

const TextAreaGroup = () => (
  <>
    <Textarea
      isRequired
      label="What features do you find most useful in your current digital assistant?"
      labelPlacement="outside"
      placeholder="Enter features you find most useful..."
      variant="underlined"
      minRows={1}
      size="lg"
      maxRows={4}
    />
    <Textarea
      isRequired
      label="What features do you wish your current / a digital assistant had?"
      labelPlacement="outside"
      placeholder="Enter desired features..."
      variant="underlined"
      minRows={1}
      size="lg"
      maxRows={4}
    />
    <Textarea
      isRequired
      label="What are the main challenges you face when using your current digital assistant?"
      labelPlacement="outside"
      placeholder="Enter challenges faced..."
      variant="underlined"
      size="lg"
      minRows={1}
      maxRows={4}
    />
  </>
);

const SituationsCheckboxGroup = () => (
  <CheckboxGroup
    label="In what situations would you find a personalized AI assistant most helpful? (Select all that apply)"
    color="primary"
    size="lg"
  >
    <Checkbox value="work_tasks">Managing work tasks</Checkbox>
    <Checkbox value="personal_life">Organizing personal life</Checkbox>
    <Checkbox value="learning_skills">Learning new skills</Checkbox>
    <Checkbox value="health_fitness">Health and fitness tracking</Checkbox>
    <Checkbox value="travel_planning">Travel planning</Checkbox>
    <Checkbox value="shopping_assistance">Shopping assistance</Checkbox>
    <Checkbox value="social_media">Social media management</Checkbox>
    <Checkbox value="other">Other (please specify)</Checkbox>
  </CheckboxGroup>
);

const FrequencySelect = ({ interactionFrequency }) => (
  <Select
    label="How often would you expect to interact with your AI assistant daily?"
    variant="underlined"
    size="lg"
    aria-label="Select interaction frequency with AI assistant"
  >
    {interactionFrequency.map((frequency) => (
      <SelectItem key={frequency.key}>{frequency.label}</SelectItem>
    ))}
  </Select>
);

const CustomisationScaleSlider = () => (
  <ScaleSlider
    title={
      <>
        What level of <b>customisation</b> do you expect from a personalized AI
        assistant?
      </>
    }
    lowest="minimal customisation"
    highest="full customisation"
  />
);

const MobileAppDownloadScaleSlider = () => (
  <ScaleSlider
    title={
      <>
        How likely are you to <b>Download a Mobile Application</b>?
      </>
    }
    lowest="not likely"
    highest="most likely"
  />
);

const AdditionalTextAreas = () => (
  <>
    <Textarea
      isRequired
      label="What concerns do you have about using a personalized AI assistant?"
      labelPlacement="outside"
      placeholder="(e.g., privacy, data security, accuracy)"
      variant="underlined"
      minRows={1}
      size="lg"
      maxRows={4}
    />
    <Textarea
      isRequired
      label="What would make you more likely to use a new personalized AI assistant?"
      labelPlacement="outside"
      variant="underlined"
      placeholder="Enter factors that would make you more likely..."
      minRows={1}
      size="lg"
      maxRows={4}
    />
    <Textarea
      isRequired
      label="Any specific integrations or third-party services you would like the AI assistant to support?"
      labelPlacement="outside"
      variant="underlined"
      placeholder="Enter integrations or services you'd like..."
      size="lg"
      minRows={1}
      maxRows={4}
    />
    <Textarea
      isRequired
      label="Any additional comments or suggestions?"
      labelPlacement="outside"
      variant="underlined"
      placeholder="Enter additional comments or suggestions..."
      size="lg"
      minRows={1}
      maxRows={4}
    />
  </>
);

const LearningBehaviorRadioGroup = () => (
  <RadioGroup
    label="Would you be comfortable with your AI assistant learning from your behavior to offer more personalized suggestions and assistance?"
    size="lg"
    orientation="horizontal"
  >
    <Radio value="learning_yes">Yes</Radio>
    <Radio value="learning_no">No</Radio>
    <Radio value="learning_notsure">Not sure</Radio>
  </RadioGroup>
);

const AccountCreationScaleSlider = () => (
  <ScaleSlider
    title={
      <>
        How likely are you to <b>Create an Account on a Website</b> you've
        visited for the first time?
      </>
    }
    lowest="not likely"
    highest="most likely"
  />
);

const CalendarServiceUsage = () => (
  <RadioGroup
    label={
      <>
        Do you use any Calendar service like <b>Google Calendar</b>?
      </>
    }
    size="lg"
    orientation="horizontal"
  >
    <Radio value="yes">Yes</Radio>
    <Radio value="no">No</Radio>
  </RadioGroup>
);
