import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Code,
  GraduationCap,
  Handshake,
} from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface TargetCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  img: string;
  current: TargetData | null;
  setCurrent: Dispatch<SetStateAction<TargetData>>;
}

interface TargetData {
  title: string;
  description: string;
  icon: ReactNode;
  img: string;
}

const TargetCard = ({
  title,
  description,
  icon,
  img,
  current,
  setCurrent,
}: TargetCardProps) => (
  <div
    onClick={() => setCurrent({ title, description, icon, img })}
    className={cn(
      current?.title === title && current?.description === description
        ? "text-white "
        : "text-foreground-400 hover:text-foreground-600",
      "cursor-pointer transition-all"
    )}
  >
    <div className="font-medium text-2xl flex items-center gap-2">
      {icon}
      {title}
    </div>
    <div className="text-lg">{description}</div>
  </div>
);

const targetData: TargetData[] = [
  {
    title: "For Students",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod temporibus debitis fugit possimus odio amet reprehenderit mollitia recusandae vero quis.",
    icon: <GraduationCap />,
    img: "/landing/screenshot.png",
  },
  {
    title: "For Professionals",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod temporibus debitis fugit possimus odio amet reprehenderit mollitia recusandae vero quis.",
    icon: <BriefcaseBusiness />,
    img: "/landing/screenshot.png",
  },
  {
    title: "For Businesses",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod temporibus debitis fugit possimus odio amet reprehenderit mollitia recusandae vero quis.",
    icon: <Handshake />,
    img: "/landing/screenshot.png",
  },
  {
    title: "For Developers",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod temporibus debitis fugit possimus odio amet reprehenderit mollitia recusandae vero quis.",
    icon: <Code />,
    img: "/landing/screenshot.png",
  },
];

export default function TargetAudience() {
  const [current, setCurrent] = useState<TargetData>(targetData[0]);

  return (
    <div className="w-screen flex items-center min-h-screen justify-center pt-32 flex-col">
      <div className="w-full max-w-screen-xl py-5 space-y-2">
        <div className="font-medium text-5xl">For Everyone</div>
        <div className="font-normal text-md w-[30%] text-foreground-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum,
          assumenda.
        </div>
      </div>
      <div className="max-w-screen-xl w-full bg-zinc-900 min-h-[80vh] rounded-3xl outline outline-zinc-900 flex flex-col p-10 overflow-hidden items-center">
        <div className="w-full justify-start gap-10 grid grid-cols-4">
          {targetData.map((item, index) => (
            <TargetCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              img={item.img}
              current={current}
              setCurrent={setCurrent}
            />
          ))}
        </div>
        <img
          src={current.img}
          alt="GAIA Screenshot"
          className="relative top-[10vh] rounded-2xl outline-zinc-700 outline-[4px] outline overflow-hidden min-w-[95%] max-w-[95%]"
        />
      </div>
    </div>
  );
}
