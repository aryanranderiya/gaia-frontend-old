import { User } from "@nextui-org/user";
import SettingsMenu from "./SettingsMenu";
import { UserCircleIcon } from "../icons";
export default function UserContainer() {
  return (
    <div className="user_container">
      <div className="user_container_inner">
        <User
          name="Aryan"
          avatarProps={{
            src: "https://github.com/aryanranderiya.png",
            showFallback: true,
            isBordered: true,
            fallback: <UserCircleIcon height={30} width={30} />,
            size: "sm",
          }}
        />
        <SettingsMenu />
      </div>
    </div>
  );
}
