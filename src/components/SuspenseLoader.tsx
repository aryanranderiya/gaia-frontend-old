import { Spinner } from "@nextui-org/spinner";

export default function SuspenseLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
}
