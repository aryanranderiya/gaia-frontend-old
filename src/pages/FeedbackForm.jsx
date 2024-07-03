import * as React from "react";
import Page1 from "../components/FeedbackForm/Page1";
import Page2 from "../components/FeedbackForm/Page2";
import Page3 from "../components/FeedbackForm/Page3";
import Page4 from "../components/FeedbackForm/Page4";
import Page5 from "../components/FeedbackForm/Page5";
import Page6 from "../components/FeedbackForm/Page6";
import Page7 from "../components/FeedbackForm/Page7";
import NextPrevButtons from "../components/FeedbackForm/NextPrevButtons";

export default function FeedbackForm() {
  const [formData, setFormData] = React.useState({
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
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSliderChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleCheckboxChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRadioChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSelectChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="feedback_form_container">
      <div className="feedback_form gap-8">
        <Page1
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />

        <Page2
          formData={formData}
          handleSliderChange={handleSliderChange}
          handleRadioChange={handleRadioChange}
          handleSelectChange={handleSelectChange}
        />
        <Page3 handleInputChange={handleInputChange} formData={formData} />

        <Page4
          formData={formData}
          handleCheckboxChange={handleCheckboxChange}
        />

        <Page5
          formData={formData}
          handleSliderChange={handleSliderChange}
          handleRadioChange={handleRadioChange}
        />

        <Page6
          formData={formData}
          handleInputChange={handleInputChange}
          handleRadioChange={handleRadioChange}
        />

        <Page7 formData={formData} handleInputChange={handleInputChange} />

        <NextPrevButtons formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}
