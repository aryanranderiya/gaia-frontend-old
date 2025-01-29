"use client";

import { ReactNode } from "react";

interface Layout1Props {
  children: ReactNode;
  heading: string;
  subheading: string;
  icon?: ReactNode;
  extraHeading?: ReactNode;
}

export default function LandingPage1Layout({
  children,
  heading,
  subheading,
  icon,
  extraHeading,
}: Layout1Props) {
  return (
    <div className="sm:h-full sm:min-h-fit h-screen flex flex-col justify-start items-center sm:gap-7 w-full p-4 bg-zinc-950 rounded-3xl outline outline-zinc-900 hover:outline-primary transition-all">
      <div className="flex items-start flex-col justify-start gap-5 w-full">
        <div className="flex items-start gap-3 flex-col">
          {icon}
          <div>
            <h2 className="text-2xl font-semibold text-white">{heading}</h2>
            <p className="text-md text-gray-400">{subheading}</p>
          </div>
          {extraHeading}
        </div>
      </div>
      <div className="w-full p-3 sm:p-0 rounded-3xl space-y-5">{children}</div>
    </div>
  );
}
