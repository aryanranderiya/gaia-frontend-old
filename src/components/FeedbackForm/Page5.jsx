import ScaleSlider from "./ScaleSlider";

import { RadioGroup, Radio } from "@nextui-org/radio";

const CustomisationScaleSlider = ({ formData, handleSliderChange }) => (
  <ScaleSlider
    title={
      <>
        What level of <b>customisation</b> do you expect from a personalized AI
        assistant?
      </>
    }
    value={formData.customisationLevel}
    onChange={(value) => handleSliderChange("customisationLevel", value)}
    lowest="minimal customisation"
    highest="full customisation"
  />
);

const MobileAppDownloadScaleSlider = ({ formData, handleSliderChange }) => (
  <ScaleSlider
    title={
      <>
        How likely are you to Download a <b>Mobile App</b>?
      </>
    }
    value={formData.mobileAppLikelihood}
    onChange={(value) => handleSliderChange("mobileAppLikelihood", value)}
  />
);

const AccountCreationScaleSlider = ({ formData, handleSliderChange }) => (
  <ScaleSlider
    title={
      <>
        How comfortable are you with <b>creating an account</b> on a website to
        use a digital assistant?
      </>
    }
    value={formData.accountCreation}
    onChange={(value) => handleSliderChange("accountCreation", value)}
  />
);

export default function Page5({
  formData,
  handleSliderChange,
  handleRadioChange,
}) {
  if (formData.currentPage === 5)
    return (
      <>
        <CustomisationScaleSlider
          formData={formData}
          handleSliderChange={handleSliderChange}
        />
        <MobileAppDownloadScaleSlider
          formData={formData}
          handleSliderChange={handleSliderChange}
        />
        <AccountCreationScaleSlider
          formData={formData}
          handleSliderChange={handleSliderChange}
        />
      </>
    );
}
