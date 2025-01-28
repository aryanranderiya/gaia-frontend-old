import { Spinner } from "@heroui/spinner";

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
      <Spinner size="lg" color="primary" />
    </div>
  );
}
