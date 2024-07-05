import {
  LanguageSkillIcon,
  ComputerPhoneSyncIcon,
  VoiceIcon,
  PinIcon,
  AccountSetting02Icon,
  FileUploadIcon,
  GoogleDriveIcon,
  CalendarIcon,
  Mail01Icon,
  InternetIcon,
  Target02Icon,
} from "../icons";

const list = [
  {
    title: "Personalised",
    description: "Customised & tailored to your preferences",
    icon: <AccountSetting02Icon width={35} height={35} />,
  },
  {
    title: "Multi-Lingual",
    description: "Support for multiple languages",
    icon: <LanguageSkillIcon width={35} height={35} />,
  },
  {
    title: "Cross-Platform",
    description: "Available on multiple devices",
    icon: <ComputerPhoneSyncIcon width={35} height={35} />,
  },
  {
    title: "Voice Activated",
    description: "Activated using your voice",
    icon: <VoiceIcon width={35} height={35} />,
  },

  {
    title: "Save Messages",
    description: "Pin & save messages for later",
    icon: <PinIcon width={35} height={35} />,
  },
  {
    title: "File Upload",
    description: "Supports document & media uploads",
    icon: <FileUploadIcon width={35} height={35} />,
  },
  {
    title: "Internet",
    description: "Connected to the web for better responses",
    icon: <InternetIcon width={35} height={35} />,
  },
  {
    title: "Goal Management",
    description: "Track & Manage your goals",
    icon: <Target02Icon width={35} height={35} />,
  },
  {
    title: "Integrated",
    description: "Integrate into existing workspaces",
    icon: (
      <div className="flex gap-2">
        <GoogleDriveIcon width={35} height={35} />
        <CalendarIcon width={35} height={35} />
        <Mail01Icon width={35} height={35} />
      </div>
    ),
  },
];

export function Feature({ icon, title, description }) {
  return (
    <div className="md:w-[32%] w-full flex flex-col gap-2 max-h-fit bg-black bg-opacity-40 px-5 py-3 rounded-xl hover:-translate-y-2 hover:bg-opacity-70 transition-all">
      {icon}
      <span className="font-medium text-xl">{title}</span>
      <span className="text-foreground text-opacity-45 text-md">
        {description}
      </span>
    </div>
  );
}

export default function FeatureList() {
  return (
    <div className="flex justify-center items-center p-5 flex-col min-h-screen ">
      <span className="font-medium text-3xl">Upcoming Feature list</span>
      <div className="flex rounded-3xl bg-zinc-800 my-6 p-10 flex-wrap gap-2 gap-y-5  justify-around md:w-[60vw] h-fit ">
        {list.map((item, index) => (
          <Feature
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
