export function SectionHeading({
  heading,
  subheading,
  icon,
}: {
  heading: string;
  subheading: string;
  icon: any;
}) {
  return (
    <div>
      <div className="sm:text-5xl text-2xl font-bold flex items-center gap-2 mb-3">
        {icon}
        <span>{heading}</span>
      </div>
      <div className="text-lg text-foreground-500">{subheading}</div>
    </div>
  );
}
