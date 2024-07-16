import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { LinkBackwardIcon } from "@/components/icons";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center w-screen flex-col gap-4">
      <span className="text-6xl">404</span>
      <span className="text-4xl">Page Not Found</span>
      <Button
        onClick={() => navigate(-1)}
        startContent={
          <LinkBackwardIcon fill="foreground" color="transparent" />
        }
        variant="shadow"
        size="md"
        color="primary"
      >
        Go Back
      </Button>
    </div>
  );
}
