import OrbitingCircles from "../MagicUI/orbiting-circles";
import {
  GoogleCalendar,
  GoogleDrive,
  Github,
  Notion,
  ComputerIcon,
  SmartPhone01Icon,
  Gmail,
  Watch02Icon,
} from "../icons";

function MiddleIcons() {
  return (
    <>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        duration={30}
        delay={30}
        radius={150}
      >
        <GoogleCalendar />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        duration={30}
        delay={40}
        radius={150}
      >
        <Gmail />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        duration={30}
        delay={50}
        radius={150}
      >
        <GoogleDrive />
      </OrbitingCircles>
    </>
  );
}

function InnerIcons() {
  return (
    <>
      <OrbitingCircles
        className="h-[40px] w-[40px] border-none bg-transparent"
        radius={70}
        duration={20}
        reverse
      >
        <Notion />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[40px] w-[40px] border-none bg-transparent"
        radius={70}
        duration={20}
        delay={20}
        reverse
      >
        <Github />
      </OrbitingCircles>
    </>
  );
}

function OuterIcons() {
  return (
    <>
      <OrbitingCircles
        className="h-[60px] w-[60px] border-none bg-transparent"
        radius={230}
        duration={25}
        reverse
      >
        <SmartPhone01Icon width={"40px"} height="40px" />
      </OrbitingCircles>

      <OrbitingCircles
        className="h-[60px] w-[60px] border-none bg-transparent"
        radius={230}
        duration={25}
        delay={19}
        reverse
      >
        <ComputerIcon width={"40px"} height="40px" />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[60px] w-[60px] border-none bg-transparent"
        radius={230}
        duration={25}
        delay={15}
        reverse
      >
        <Watch02Icon width={"40px"} height="40px" />
      </OrbitingCircles>
    </>
  );
}

export default function IntegrationCircles() {
  return (
    <div className="flex w-screen items-center justify-center">
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Integrated with Workspaces
        </span>

        <MiddleIcons />
        <InnerIcons />
        <OuterIcons />
      </div>
    </div>
  );
}
