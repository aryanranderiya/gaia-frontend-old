import * as React from "react";
import Page1 from "../components/FeedbackForm/Page1";
import Page2 from "../components/FeedbackForm/Page2";
import Page3 from "../components/FeedbackForm/Page3";
import Page4 from "../components/FeedbackForm/Page4";
import Page5 from "../components/FeedbackForm/Page5";
import Page6 from "../components/FeedbackForm/Page6";
import Page7 from "../components/FeedbackForm/Page7";
import Page8 from "../components/FeedbackForm/Page8";
import NextPrevButtons from "../components/FeedbackForm/NextPrevButtons";

export const initialFormData = {
  firstName: "",
  lastName: "",
  currentPage: 1,
  ageRange: "",
  occupation: "",
  email: "",
  devices: "",
  operatingSystems: [],
  openAIUsage: 1,
  googleBardUsage: 1,
  usesDigitalAssistant: "",
  digitalAssistantDetails: [],
  currentUsefulFeatures: "",
  desiredFeatures: "",
  challenges: "",
  helpfulSituations: [],
  interactionFrequency: "",
  customisationLevel: 1,
  mobileAppLikelihood: 1,
  concerns: "",
  factorsToUse: "",
  integrations: "",
  additionalComments: "",
  accountCreation: "",
  calendarServiceUsage: "",
  learningBehaviourComfortable: "",
};

export default function FeedbackForm() {
  const [formData, setFormData] = React.useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : initialFormData;
  });

  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  React.useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="feedback_form_container">
      <div className="feedback_form gap-8">
        <Page1 formData={formData} handleDataChange={handleDataChange} />
        <Page2 formData={formData} handleDataChange={handleDataChange} />
        <Page3 formData={formData} handleDataChange={handleDataChange} />
        <Page4 formData={formData} handleDataChange={handleDataChange} />
        <Page5 formData={formData} handleDataChange={handleDataChange} />
        <Page6 formData={formData} handleDataChange={handleDataChange} />
        <Page7 formData={formData} handleDataChange={handleDataChange} />
        <Page8 formData={formData} handleDataChange={handleDataChange} />
      </div>
      <NextPrevButtons formData={formData} setFormData={setFormData} />
    </div>
  );
}
