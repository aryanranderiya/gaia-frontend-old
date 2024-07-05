import { useNavigate } from "react-router-dom";
import { CommentAdd01Icon } from "../icons";
import { Button } from "@nextui-org/button";
export default function FeedbackFormBtn({ props }) {
  const navigate = useNavigate();
  return (
    <Button
      radius="full"
      className="font-medium"
      variant="light"
      onClick={() => navigate("/feedback")}
      endContent={<CommentAdd01Icon color="primary" width="20" height="20" />}
      {...props}
    >
      Fill the Survey
    </Button>
  );
}
