import SiteName from "../components/SiteName";
import SidebarTopButtons from "../components/Sidebar/SidebarTopButtons";
import ChatsList from "../components/Sidebar/ChatsList";
import UserContainer from "../components/Sidebar/UserContainer";
import Hr from "../components/HorizontalRuler";
import { Button } from "@nextui-org/button";
import { StarsIcon } from "../components/icons";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div>
          <SiteName />

          <div className="px-1">
            <Button
              variant="shadow"
              color="primary"
              className="w-full flex justify-between my-4"
            >
              Coming Soon?
              <StarsIcon />
            </Button>
          </div>

          <SidebarTopButtons />
          <Hr />
          <ChatsList />
        </div>
        <UserContainer />
      </div>
    </>
  );
}
