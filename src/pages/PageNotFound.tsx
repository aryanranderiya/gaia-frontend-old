import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import { LinkBackwardIcon } from "@/components/Misc/icons";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center w-screen flex-col gap-4">
      <span className="text-6xl font-bold">404</span>
      <span className="text-4xl">Page Not Found</span>
      <Button
        className="font-medium text-lg mt-3"
        color="primary"
        size="md"
        startContent={
          <LinkBackwardIcon color="transparent" fill="foreground" />
        }
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
}
