import { Textarea } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";

const LearningBehaviorRadioGroup = ({ formData, handleDataChange }) => (
  <RadioGroup
    isRequired
    className="w-full"
    label="Would you be comfortable with your AI assistant learning from your behavior to offer more personalized suggestions and assistance?"
    size="md"
    orientation="horizontal"
    value={formData.learningBehaviourComfortable}
    onValueChange={(value) =>
      handleDataChange("learningBehaviourComfortable", value)
    }
  >
    <Radio value="yes">Yes</Radio>
    <Radio value="no">No</Radio>
    <Radio value="not_sure">Not sure</Radio>
  </RadioGroup>
);

const CalendarServiceUsage = ({ formData, handleDataChange }) => (
  <RadioGroup
    isRequired
    label="Which calendar service do you primarily use?"
    size="md"
    orientation="horizontal"
    value={formData.calendarServiceUsage}
    onValueChange={(value) => handleDataChange("calendarServiceUsage", value)}
    className="w-full"
  >
    <Radio value="google">Google Calendar</Radio>
    <Radio value="apple">Apple Calendar</Radio>
    <Radio value="outlook">Outlook Calendar</Radio>
    <Radio value="other">Other</Radio>
  </RadioGroup>
);

export default function Page6({ formData, handleDataChange }) {
  if (formData.currentPage === 6)
    return (
      <>
        <CalendarServiceUsage
          formData={formData}
          handleDataChange={handleDataChange}
        />

        <LearningBehaviorRadioGroup
          formData={formData}
          handleDataChange={handleDataChange}
        />

        <Textarea
          isRequired
          label="Any specific integrations or third-party services you would like the AI assistant to support?"
          labelPlacement="outside"
          placeholder="Enter integrations or services you'd like..."
          variant="underlined"
          size="md"
          minRows={1}
          maxRows={4}
          value={formData.integrations}
          onValueChange={(value) => handleDataChange("integrations", value)}
        />
      </>
    );
}
