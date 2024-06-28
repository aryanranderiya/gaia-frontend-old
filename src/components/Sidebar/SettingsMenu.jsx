import { Button } from "@nextui-org/button";
import {
  ThreeDotsMenu,
  Settings01Icon,
  BlushBrush02Icon,
  Logout02Icon,
} from "../icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

export default function SettingsMenu() {
  const items = [
    {
      key: "settings",
      label: (
        <div className="flex items-center gap-4">
          <Settings01Icon width={20} color="text-foreground" />
          Settings
        </div>
      ),
    },
    {
      key: "customise",
      label: (
        <div className="flex items-center gap-4">
          <BlushBrush02Icon width={20} color="text-foreground" />
          Customisation
        </div>
      ),
    },
    {
      color: "danger",
      key: "logout",
      label: (
        <div className="flex items-center gap-4">
          <Logout02Icon width={20} color="#f31260" />
          Logout
        </div>
      ),
    },
  ];

  return (
    <Dropdown className="dark text-foreground">
      <DropdownTrigger>
        <Button isIconOnly variant="light" aria-label="Three Dots Menu">
          <ThreeDotsMenu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={!!item.color || "default"}
            className={!!item.color && "text-danger"}
            textValue={item.key}
          >
            <span className="font-bold">{item.label}</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
