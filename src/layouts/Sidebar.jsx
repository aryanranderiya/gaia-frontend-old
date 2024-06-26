import SiteName from "../components/SiteName";
import SidebarTopButtons from "../components/Sidebar/SidebarTopButtons";
import ChatsList from "../components/Sidebar/ChatsList";
import UserContainer from "../components/Sidebar/UserContainer";
import Hr from "../components/HorizontalRuler";
export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div>
          <SiteName />
          <SidebarTopButtons />
          <Hr />
          <ChatsList />
        </div>
        <UserContainer />
      </div>
    </>
  );
}
