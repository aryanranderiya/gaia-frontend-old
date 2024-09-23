import { useUser } from "@/contexts/UserContext";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { useNavigate } from "react-router-dom";
import { Settings01Icon } from "../icons";

const UserContainer: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="user_container p-4 absolute bottom-0 left-0">
      <div className="user_container_inner">
        <User
          name={`${user?.firstName} ${user?.lastName}`}
          className="text-nowrap"
          avatarProps={{
            src: user?.profilePicture,
            showFallback: true,
            isBordered: true,
            fallback: (
              <img
                src="https://links.aryanranderiya.com/l/default_user"
                className="min-h-[35px] min-w-[35px]"
              />
            ),
            size: "sm",
            className: "min-w-[30px]",
          }}
        />

        <Button
          isIconOnly
          variant="light"
          radius="full"
          size="sm"
          onPress={() => navigate("/settings")}
        >
          <Settings01Icon width={21} color="foreground" />
        </Button>
      </div>
    </div>
  );
};

export default UserContainer;
