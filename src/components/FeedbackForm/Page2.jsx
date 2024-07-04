import { Select, SelectItem } from "@nextui-org/select";

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

const DevicesOperatingSystemsSelects = ({
  devices,
  operatingSystems,
  formData,
  handleDataChange,
}) => (
  <>
    <Select
      isRequired
      label="Which devices do you use regularly? (Select all that apply)"
      selectionMode="multiple"
      variant="underlined"
      size="md"
      aria-label="Select devices you use regularly"
      defaultSelectedKeys={formData.devices}
      onSelectionChange={(value) =>
        handleDataChange("devices", Array.from(value))
      }
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
      defaultSelectedKeys={formData.operatingSystems}
      onSelectionChange={(value) =>
        handleDataChange("operatingSystems", Array.from(value))
      }
      classNames={{ label: "text-left" }}
    >
      {operatingSystems.map((os) => (
        <SelectItem key={os.key}>{os.label}</SelectItem>
      ))}
    </Select>
  </>
);

const occupations = [
  { key: "student", label: "Student" },
  { key: "professional", label: "Professional" },
  { key: "self_employed", label: "Self-employed" },
  { key: "unemployed", label: "Unemployed" },
  { key: "retired", label: "Retired" },
];

const ageRanges = [
  { key: "under-18", label: "Under 18" },
  { key: "18-24", label: "18-24" },
  { key: "25-34", label: "25-34" },
  { key: "35-44", label: "35-44" },
  { key: "45-54", label: "45-54" },
  { key: "55-64", label: "55-64" },
  { key: "65-and-over", label: "65 and over" },
];

const AgeOccupationSelects = ({ formData, handleDataChange }) => (
  <>
    <Select
      isRequired
      label="Select your age range"
      variant="underlined"
      size="md"
      classNames={{ label: "text-left" }}
      defaultSelectedKeys={[formData.ageRange]}
      onSelectionChange={(value) =>
        handleDataChange("ageRange", Array.from(value)[0] || null)
      }
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
      classNames={{ label: "text-left" }}
      defaultSelectedKeys={[formData.occupation]}
      onSelectionChange={(value) =>
        handleDataChange("occupation", Array.from(value)[0] || null)
      }
    >
      {occupations.map((occupation) => (
        <SelectItem key={occupation.key} value={occupation.key}>
          {occupation.label}
        </SelectItem>
      ))}
    </Select>
  </>
);

export default function Page2({ formData, handleDataChange }) {
  if (formData.currentPage === 2)
    return (
      <>
        <DevicesOperatingSystemsSelects
          devices={devices}
          operatingSystems={operatingSystems}
          formData={formData}
          handleDataChange={handleDataChange}
        />

        <AgeOccupationSelects
          formData={formData}
          handleDataChange={handleDataChange}
        />
      </>
    );
}
