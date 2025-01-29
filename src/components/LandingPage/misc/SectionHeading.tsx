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
    <div>
      <div
        className={`${
          smallHeading ? "sm:text-3xl" : "sm:text-5xl"
        } text-2xl font-bold flex items-center gap-4 mb-2`}
      >
        {icon}
        <span>{heading}</span>
      </div>
      <div
        className={` text-foreground-500 max-w-screen-sm ${
          smallHeading ? "text-md" : "text-lg"
        }`}
      >
        {subheading}
      </div>
    </div>
  );
}
