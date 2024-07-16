import StarterEmoji from "@/components/Chat/StarterEmoji";
import { Tabs, Tab } from "@nextui-org/tabs";
import {
  GoogleDriveIcon,
  Target02Icon,
  Timer02Icon,
  WorkflowSquare03Icon,
  Calendar01Icon,
} from "@/components/icons";

export function OptionsTab(key, icon, title, content) {
  return (
    <Tab
      key={key}
      title={
        <div className="flex items-center gap-1">
          {icon}
          {title}
        </div>
      }
    >
      {content}
    </Tab>
  );
}

export default function Explore() {
  const color = "group-data-[selected=true]:black";
  const tabData = [
    {
      key: "drive",
      icon: <GoogleDriveIcon color={color} />,
      title: "Google Drive",
      content: "Coming Soon",
    },
    {
      key: "calendar",
      icon: <Calendar01Icon color={color} />,
      title: "Google Calendar",
      content: "Coming Soon",
    },
    {
      key: "schedule",
      icon: <Timer02Icon color={color} />,
      title: "Schedule",
      content: "Coming Soon",
    },
    {
      key: "projects",
      icon: <WorkflowSquare03Icon color={color} />,
      title: "Projects",
      content: "Coming Soon",
    },
    {
      key: "target",
      icon: <Target02Icon color={color} />,
      title: "Goals",
      content: "Coming Soon",
    },
  ];
  return (
    <div className="main_chat">
      <div className="starter_container2">
        <StarterEmoji />
      </div>

      <div className="h-full">
        <Tabs
          aria-label="Options"
          classNames={{
            base: "w-full flex justify-center px-0 ",
            tabList: "rounded_class flex-wrap justify-center px-0",
            cursor:
              "w-full bg-[#22d3ee] rounded_class group-data-[selected=true]:bg-[#00bbff]",
            tab: "w-fit",
            tabContent:
              "group-data-[selected=true]:text-[black] font-bold rounded-full",
            panel: "h-full",
          }}
        >
          {tabData.map((tab) => (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center gap-1">
                  {tab.icon}
                  {tab.title}
                </div>
              }
            >
              <div className="h-full w-full flex justify-center items-center">
                {tab.content}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
