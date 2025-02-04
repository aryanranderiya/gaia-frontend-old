import { Loader } from "lucide-react";
export default function SuspenseLoader({
  fullHeight = false,
}: {
  fullHeight?: boolean;
}) {
  return (
    <div
      className={`w-full ${
        fullHeight ? "h-screen" : "h-full"
      } flex items-center justify-center p-3`}
    >
      <Loader className="animate-spin text-primary" width={30} height={30} />
      {/* <Spinner size="lg" color="primary" /> */}
    </div>
  );
}
