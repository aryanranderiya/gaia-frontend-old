import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";

const SituationsCheckboxGroup = ({ formData, handleDataChange }) => (
  <CheckboxGroup
    isRequired
    label="In what situations would you find a personalized AI assistant most helpful? (Select all that apply)"
    orientation="vertical"
    size="md"
    color="primary"
    value={formData.helpfulSituations}
    onValueChange={(value) => handleDataChange("helpfulSituations", value)}
  >
    <Checkbox value="planning">Planning events</Checkbox>
    <Checkbox value="organizing">Organizing files or information</Checkbox>
    <Checkbox value="reminders">Setting reminders</Checkbox>
    <Checkbox value="productivity">Improving productivity</Checkbox>
    <Checkbox value="work_tasks">Managing work tasks</Checkbox>
    <Checkbox value="personal_life">Organizing personal life</Checkbox>
    <Checkbox value="learning_skills">Learning new skills</Checkbox>
    <Checkbox value="health_fitness">Health and fitness tracking</Checkbox>
    <Checkbox value="travel_planning">Travel planning</Checkbox>
    <Checkbox value="shopping_assistance">Shopping assistance</Checkbox>
    <Checkbox value="social_media">Social media management</Checkbox>
    <Checkbox value="other">Other</Checkbox>
  </CheckboxGroup>
);

export default function Page4({ formData, handleDataChange }) {
  if (formData.currentPage === 4)
    return (
      <>
        <SituationsCheckboxGroup
          formData={formData}
          handleDataChange={handleDataChange}
        />
      </>
    );
}
