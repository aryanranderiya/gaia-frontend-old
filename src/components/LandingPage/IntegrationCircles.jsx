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
        className="orbiting_circles_mid border-none bg-transparent"
        duration={30}
        delay={30}
        radius={135}
        bgcircle={false}
      >
        <GoogleCalendar />
      </OrbitingCircles>
      <OrbitingCircles
        className="orbiting_circles_mid border-none bg-transparent"
        duration={30}
        delay={40}
        radius={135}
        bgcircle={false}
      >
        <Gmail />
      </OrbitingCircles>
      <OrbitingCircles
        className="orbiting_circles_mid border-none bg-transparent"
        duration={30}
        delay={50}
        radius={135}
        bgcircle={false}
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
        className="orbiting_circles_inner border-none bg-transparent"
        radius={70}
        duration={20}
        reverse
        bgcircle={false}
      >
        <Notion />
      </OrbitingCircles>
      <OrbitingCircles
        className="orbiting_circles_inner border-none bg-transparent"
        radius={70}
        duration={20}
        delay={20}
        reverse
        bgcircle={false}
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
        className="orbiting_circles_outer border-none bg-transparent"
        radius={200}
        duration={25}
        reverse
      >
        <SmartPhone01Icon width={"40px"} height="40px" />
      </OrbitingCircles>

      <OrbitingCircles
        className="orbiting_circles_outer border-none bg-transparent"
        radius={200}
        duration={25}
        delay={26}
        reverse
      >
        <ComputerIcon width={"40px"} height="40px" />
      </OrbitingCircles>
      <OrbitingCircles
        className="orbiting_circles_outer border-none bg-transparent"
        radius={200}
        duration={25}
        delay={17}
        reverse
      >
        <Watch02Icon width={"40px"} height="40px" />
      </OrbitingCircles>
    </>
  );
}

export default function IntegrationCircles() {
  return (
    <div className="flex w-screen items-center justify-center md:scale-100 ">
      <div className="relative flex h-screen w-full items-center justify-center rounded-lg md:shadow-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-zinc-900 relative">
          Integrated with Workspaces
        </span>

        <MiddleIcons />
        <InnerIcons />
        <OuterIcons />
      </div>
    </div>
  );
}
