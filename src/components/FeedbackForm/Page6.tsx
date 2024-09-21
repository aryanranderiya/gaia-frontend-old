import ScaleSlider from "./ScaleSlider";

import { RadioGroup, Radio } from "@nextui-org/radio";

const CustomisationScaleSlider = ({ formData, handleDataChange }) => (
  <ScaleSlider
    title={
      <>
        What level of <b>customisation</b> do you expect from a personalized AI
        assistant?
      </>
    }
    value={formData.customisationLevel}
    onChange={(value) => handleDataChange("customisationLevel", value)}
    lowest="minimal customisation"
    highest="full customisation"
  />
);

const MobileAppDownloadScaleSlider = ({ formData, handleDataChange }) => (
  <ScaleSlider
    title={
      <>
        How likely are you to Download a <b>Mobile App</b>?
      </>
    }
    value={formData.mobileAppLikelihood}
    onChange={(value) => handleDataChange("mobileAppLikelihood", value)}
  />
);

const AccountCreationScaleSlider = ({ formData, handleDataChange }) => (
  <ScaleSlider
    title={
      <>
        How comfortable are you with <b>creating an account</b> on a website to
        use a digital assistant?
      </>
    }
    value={formData.accountCreation}
    onChange={(value) => handleDataChange("accountCreation", value)}
  />
);

export default function Page6({ formData, handleDataChange }) {
  if (formData.currentPage === 6)
    return (
      <>
        <CustomisationScaleSlider
          formData={formData}
          handleDataChange={handleDataChange}
        />
        <MobileAppDownloadScaleSlider
          formData={formData}
          handleDataChange={handleDataChange}
        />
        <AccountCreationScaleSlider
          formData={formData}
          handleDataChange={handleDataChange}
        />
      </>
    );
}
