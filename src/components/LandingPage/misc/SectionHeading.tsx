export function SectionHeading({
  heading,
  subheading,
  icon,
  smallHeading = false,
}: {
  heading: string;
  subheading: string;
  icon: any;
  smallHeading?: boolean;
}) {
  return (
    <div className="sm:p-0 p-7 z-[1] relative">
      <div
        className={`${
          smallHeading ? "sm:text-3xl" : "sm:text-4xl"
        } text-2xl font-bold flex items-center gap-4 mb-2`}
      >
        {icon}
        <span>{heading}</span>
      </div>
      <div
        className={` text-foreground-500 max-w-screen-md ${
          smallHeading ? "text-md" : "text-lg"
        }`}
      >
        {subheading}
      </div>
    </div>
  );
}
