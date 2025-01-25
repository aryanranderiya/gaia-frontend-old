import { Checkbox } from "@nextui-org/checkbox";
import { Chip } from "@nextui-org/chip";
import { Clock } from "lucide-react";
import { BookIcon1 } from "../icons";

const StaticSidebar = ({
  hover1,
  isVisible,
}: {
  hover1: boolean;
  isVisible: boolean;
}) => {
  // Static data for the sidebar
  const label = "Machine Learning Fundamentals";
  const details = [
    "Understand supervised and unsupervised learning",
    "Learn regression, classification, clustering",
    "Familiarize with cross-validation",
  ];
  const estimatedTime = "1 month";
  // const isComplete = false; // Static completion status
  const resources = [
    "Machine Learning Crash Course",
    "Scikit-learn Documentation",
    "Cross-Validation Tutorial",
  ];

  return (
    <div
      className={`sm:fixed relative sm:right-3 sm:bottom-3 bg-zinc-800 max-w-[350px] p-2 rounded-xl  flex-col gap-3 z-10 shadow-lg outline outline-2 outline-zinc-950 sm:flex hidden 
     ${hover1 ? "sm:brightness-50" : "brightness-100"} 
        ${isVisible ? `sm:opacity-100` : "sm:opacity-0"} transition-all
    `}
    >
      <div className="p-4 space-y-2">
        <div className="text-xl font-medium">{label}</div>
        <div className="text-md -mt-2 text-foreground-600 pb-4">
          {details.join(", ")}
        </div>
        <div className="space-y-4">
          {estimatedTime && (
            <Chip
              size="lg"
              color="primary"
              variant="flat"
              startContent={
                <div className="flex items-center gap-1 text-md">
                  <Clock width={18} />
                  Estimated Time:
                </div>
              }
            >
              <span className="text-white text-md pl-1">{estimatedTime}</span>
            </Chip>
          )}

          <Chip
            variant="flat"
            color="success"
            size="lg"
            startContent={
              <Checkbox
                color="success"
                radius="full"
                // isSelected={isComplete}
                // onValueChange={handleCheckboxClick} // No need for a function, as it's static
              >
                Mark as Complete
              </Checkbox>
            }
          />
        </div>
      </div>

      {resources && resources.length > 0 ? (
        <div className="bg-black bg-opacity-40 p-5 rounded-xl">
          <div className="flex text-md font-medium gap-2 items-center pb-2">
            <BookIcon1 width={18} />
            Resources
          </div>
          <div className="text-sm">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={`https://www.google.com/search?q=${resource.split("+")}`}
                target="__blank"
                className="hover:text-[#00bbff] underline underline-offset-4"
              >
                <li>{resource}</li>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div>No resources available.</div>
      )}
    </div>
  );
};

export default StaticSidebar;
