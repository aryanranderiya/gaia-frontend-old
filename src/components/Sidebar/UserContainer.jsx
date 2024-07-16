import { User } from "@nextui-org/user";
import SettingsMenu from "./SettingsMenu";
import { useUserInfoContext } from "@/contexts/UserInfo";

export default function UserContainer() {
  const { userInfo } = useUserInfoContext();

  return (
    <div className="user_container p-4 absolute bottom-0 left-0">
      <div className="user_container_inner">
        <User
          name={`${userInfo?.firstName} ${userInfo?.lastName}`}
          avatarProps={{
            src: userInfo?.profilePicture,
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
        <SettingsMenu />
      </div>
    </div>
  );
}
