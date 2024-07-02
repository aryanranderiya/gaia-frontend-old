import OrbitingCircles from "../MagicUI/orbiting-circles";
import { GoogleCalendar, GoogleDrive, Github, Notion } from "../icons";

export default function IntegrationCircles() {
  const Icons = {
    gitHub: () => <Github />,
    notion: () => <Notion />,
    googleDrive: () => <GoogleDrive />,
    gcalendar: () => <GoogleCalendar />,
  };
  return (
    <div className="flex w-screen items-center justify-center">
      <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Integrated with Workspaces
        </span>

        <OrbitingCircles
          className="h-[30px] w-[30px] border-none bg-transparent"
          duration={20}
          delay={20}
          radius={80}
        >
          <Icons.gcalendar />
        </OrbitingCircles>
        <OrbitingCircles
          className="h-[30px] w-[30px] border-none bg-transparent"
          duration={20}
          delay={10}
          radius={80}
        >
          <Icons.notion />
        </OrbitingCircles>

        {/* Outer Circles (reverse) */}
        <OrbitingCircles
          className="h-[50px] w-[50px] border-none bg-transparent"
          radius={190}
          duration={20}
          reverse
        >
          <Icons.googleDrive />
        </OrbitingCircles>
        <OrbitingCircles
          className="h-[50px] w-[50px] border-none bg-transparent"
          radius={190}
          duration={20}
          delay={20}
          reverse
        >
          <Icons.gitHub />
        </OrbitingCircles>
      </div>
    </div>
  );
}
