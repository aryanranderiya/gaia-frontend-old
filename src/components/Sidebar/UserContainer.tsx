import { useUser } from "@/contexts/UserContext";
import useFetchUser from "@/hooks/useFetchUser";
import { User } from "@nextui-org/user";
import SettingsMenu from "./SettingsMenu";
import { Spinner } from "@nextui-org/spinner";

const UserContainer: React.FC = () => {
  const { user } = useUser();
  useFetchUser();

  return (
    <div className="user_container p-4 absolute bottom-0 left-0 flex-col">
      <div className="flex relative py-4 my-4 px-3 justify-between items-center hover:bg-zinc-900 rounded-xl transition-all">
        Syncing...
        <Spinner size="sm" />
        <div className="absolute h-[2px] bottom-1 left-3 w-1/3 bg-[#00bbff]" />
      </div>

      <div className="user_container_inner">
        <User
          name={`${user?.name}`}
          className="text-nowrap"
          avatarProps={{
            src: user?.profile_picture,
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
