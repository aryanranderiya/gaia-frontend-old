import {
  CalendarIcon,
  FileUploadIcon,
  GoogleDriveIcon,
  LanguageSkillIcon,
  Mail01Icon,
  PinIcon,
  BubbleChatLockIcon,
} from "../icons";

const list = [
  // {
  //   title: "Personalised",
  //   description: "Tailored to your preferences",
  //   icon: <AccountSetting02Icon width={35} height={35} />,
  // },
  {
    title: "Multi-Lingual",
    description: "Support for multiple languages",
    icon: <LanguageSkillIcon width={35} height={35} />,
  },
  // {
  //   title: "Cross-Platform",
  //   description: "Available on multiple devices",
  //   icon: <ComputerPhoneSyncIcon width={35} height={35} />,
  // },
  // {
  //   title: "Voice Activated",
  //   description: "Activated using your voice",
  //   icon: <VoiceIcon width={35} height={35} />,
  // },

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
    title: "End-to-End Encryption",
    description: "Support for End to End Encryption for increased privacy",
    icon: <BubbleChatLockIcon width={35} height={35} />,
  },

  // {
  //   title: "Internet",
  //   description: "Connected to the web",
  //   icon: <InternetIcon width={35} height={35} />,
  // },
  // {
  //   title: "Goal Management",
  //   description: "Track & Manage your goals",
  //   icon: <Target02Icon width={35} height={35} />,
  // },
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
  {
    description: "and many more features coming soon...",
  },
];

export function Feature({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="md:w-[32%] w-full flex flex-col gap-2 bg-black bg-opacity-50 px-5 py-3 rounded-xl hover:-translate-y-2 hover:bg-opacity-70 transition-all min-h-full">
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
      <span className="font-medium text-3xl">Coming Soon!</span>
      <div className="flex rounded-3xl bg-foreground-50 my-6 p-10 flex-wrap gap-2 gap-y-5 justify-around md:w-[55vw] h-fit ">
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
