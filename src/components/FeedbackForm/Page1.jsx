import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

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
  {
    key: "ios",
    label: "iOS",
  },
  { key: "android", label: "Android" },
  { key: "windows", label: "Windows" },
  { key: "macos", label: "macOS" },
  { key: "linux", label: "Linux" },
  { key: "other", label: "Other" },
];

const AgeOccupationSelects = ({ formData, handleSelectChange }) => (
  <div className="flex w-full md:gap-7 md:flex-row flex-col gap-8">
    <Select
      isRequired
      label="Select your age range"
      variant="underlined"
      size="md"
      value={formData.ageRange}
      onValueChange={(value) => handleSelectChange("ageRange", value)}
      classNames={{ label: "text-left" }}
    >
      {ageRanges.map((age) => (
        <SelectItem key={age.key} value={age.key}>
          {age.label}
        </SelectItem>
      ))}
    </Select>

    <Select
      isRequired
      label="Select your occupation"
      variant="underlined"
      size="md"
      value={formData.occupation}
      onValueChange={(value) => handleSelectChange("occupation", value)}
      classNames={{ label: "text-left" }}
    >
      {occupations.map((occupation) => (
        <SelectItem key={occupation.key} value={occupation.key}>
          {occupation.label}
        </SelectItem>
      ))}
    </Select>
  </div>
);

const EmailInput = ({ formData, handleInputChange }) => (
  <Input
    type="email"
    label="Email"
    isRequired
    placeholder="Enter your email"
    isClearable
    size="md"
    color="primary"
    variant="underlined"
    value={formData.email}
    onValueChange={(value) => handleInputChange("email", value)}
  />
);

const DevicesOperatingSystemsSelects = ({
  devices,
  operatingSystems,
  formData,
}) => (
  <div className="flex w-full md:gap-7 md:flex-row flex-col gap-8">
    <Select
      isRequired
      label="Which devices do you use regularly? (Select all that apply)"
      selectionMode="multiple"
      variant="underlined"
      size="md"
      aria-label="Select devices you use regularly"
      value={formData.devices}
      onValueChange={(value) => handleSelectChange("devices", value)}
      classNames={{ label: "text-left" }}
    >
      {devices.map((device) => (
        <SelectItem key={device.key}>{device.label}</SelectItem>
      ))}
    </Select>

    <Select
      isRequired
      label="Which operating systems do you use? (Select all that apply)"
      selectionMode="multiple"
      variant="underlined"
      size="md"
      aria-label="Select operating systems you use"
      value={formData.operatingSystems}
      onValueChange={(value) => handleSelectChange("operatingSystems", value)}
      classNames={{ label: "text-left" }}
    >
      {operatingSystems.map((os) => (
        <SelectItem key={os.key}>{os.label}</SelectItem>
      ))}
    </Select>
  </div>
);

export default function Page1({
  formData,
  handleInputChange,
  handleSelectChange,
}) {
  if (formData.currentPage === 1)
    return (
      <>
        <EmailInput formData={formData} handleInputChange={handleInputChange} />

        <AgeOccupationSelects
          formData={formData}
          handleSelectChange={handleSelectChange}
        />

        <DevicesOperatingSystemsSelects
          devices={devices}
          operatingSystems={operatingSystems}
          formData={formData}
        />
      </>
    );
}
