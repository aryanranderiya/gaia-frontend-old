import { useUser } from "@/contexts/UserContext";
import useFetchUser from "@/hooks/useFetchUser";
import { User } from "@nextui-org/user";
import SettingsMenu from "./SettingsMenu";

const UserContainer: React.FC = () => {
  const { user } = useUser();
  useFetchUser();

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

        <SettingsMenu />
      </div>
    </div>
  );
};

export default UserContainer;
