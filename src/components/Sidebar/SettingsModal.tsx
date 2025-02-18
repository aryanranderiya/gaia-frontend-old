import { cn } from "@/lib/utils";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Switch } from "@heroui/switch";
import { Eraser } from "lucide-react";
import { useState } from "react";
import { Logout02Icon, Mail01Icon, UserIcon } from "../icons";

interface SidebarItem {
  key: string;
  label: string;
}

// Define the available sidebar sections.
const sidebarItems: SidebarItem[] = [
  { key: "general", label: "General" },
  { key: "privacy", label: "Privacy" },
  { key: "account", label: "Account" },
];
function AccountSection({ setModalAction }) {
  return (
    <div className="flex flex-col gap-2 min-h-full">
      <h3 className="mb-3">Account</h3>

      <div className="flex w-full justify-between items-center gap-5">
        <div className="flex flex-col w-full bg-black/40 p-3 gap-2 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Mail01Icon className="text-foreground-300" />
              Email
            </div>
            <div className="flex items-center gap-3  text-foreground-500">
              user@gmail.com
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UserIcon className="text-foreground-300" />
              Name
            </div>
            <div className="flex items-center gap-3 text-foreground-500 text-left">
              lorem ipsum
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl">
          <Avatar
            src="https://github.com/aryanranderiya.png"
            size="lg"
            className="aspect-square"
          />

          <Button size="sm" variant="flat">
            Change image
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-3">
          <Logout02Icon className="text-foreground-300" color={undefined} />
          Logout
        </div>
        <Button
          radius="sm"
          variant="flat"
          color="danger"
          className="w-1/5"
          onPress={() => setModalAction("logout")}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

function PrivacySection() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-3">Privacy</h3>

      <div className="flex justify-between items-center">
        <Switch
          disabled={true}
          isSelected={false}
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse min-w-full bg-content1 hover:bg-content2 items-center transition-all",
              "justify-between cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
          }}
        >
          <div className=" !text-foreground-400">
            Switch on end-to-end Encryption for all chats?
          </div>
        </Switch>
      </div>
    </div>
  );
}

function GeneralSection({ setModalAction }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-3">General</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Eraser className="text-foreground-300" />
          Delete all chats
        </div>
        <Button
          variant="flat"
          color="danger"
          className="w-1/5"
          radius="sm"
          onPress={() => setModalAction("clear_chats")}
        >
          Delete all
        </Button>
      </div>
    </div>
  );
}

export default function SettingsModal({
  openSettings,
  setOpenSettings,
  setModalAction,
}: {
  openSettings: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [activeSection, setActiveSection] = useState("general");

  // Render the main content based on the active section.
  const renderSectionContent = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSection setModalAction={setModalAction} />;
      case "privacy":
        return <PrivacySection />;
      case "account":
        return <AccountSection setModalAction={setModalAction} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={openSettings} onOpenChange={setOpenSettings} backdrop="blur">
      <ModalContent className="max-w-4xl min-h-[400px]">
        <ModalBody className="flex flex-row p-5">
          <div className="w-1/4 border-r border-r-[#ffffff20] pr-4">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.key}>
                  <Button
                    radius="sm"
                    variant={activeSection === item.key ? "solid" : "light"}
                    onPress={() => setActiveSection(item.key)}
                    className="w-full justify-start"
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 pl-4">{renderSectionContent()}</div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
