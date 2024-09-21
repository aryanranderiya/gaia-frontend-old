import { User } from "@nextui-org/user";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const UserContainer: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="user_container p-4 absolute bottom-0 left-0">
      <div className="user_container_inner">
        <User
          name={`${user?.firstName} ${user?.lastName}`}
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
          }}
        />
        <div className="flex items-center gap-2 font-medium text-sm">
          <p>
            {user?.firstName} {user?.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
