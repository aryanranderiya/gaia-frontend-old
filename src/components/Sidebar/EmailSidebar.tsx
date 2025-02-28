import { Button } from "@heroui/button";
import {
    InboxIcon,
    LabelImportantIcon,
    LicenseDraftIcon,
    QuillWrite01Icon,
    Sent02Icon,
    TimeScheduleIcon
} from "../Misc/icons";

type MailItem = {
  label: string;
  icon: React.ElementType;
};

const mailItems: MailItem[] = [
  { label: "Inbox", icon: InboxIcon },
  { label: "Important", icon: LabelImportantIcon },
  { label: "Sent", icon: Sent02Icon },
  { label: "Drafts", icon: LicenseDraftIcon },
  { label: "Scheduled", icon: TimeScheduleIcon },
  //   { label: "Trash", icon: LicenseDraftIcon },
];

type MailButtonProps = {
  label: string;
  Icon: React.ElementType;
};

function MailButton({ label, Icon }: MailButtonProps) {
  return (
    <Button
      startContent={<Icon color={undefined} className="mr-1" />}
      className="text-start justify-start pl-2 text-foreground-600"
      variant="light"
      radius="sm"
    >
      {label}
    </Button>
  );
}

type MailContainerProps = {
  items: MailItem[];
};

function MailContainer({ items }: MailContainerProps) {
  return (
    <div className="flex h-full flex-col px-2">
      <div className="text-sm text-foreground-500 px-1 font-medium pb-1">
        Mail
      </div>
      {items.map((item, index) => (
        <MailButton key={index} label={item.label} Icon={item.icon} />
      ))}
    </div>
  );
}

export default function EmailSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="my-5 w-full">
        <Button
          className="w-full justify-start text-medium font-medium"
          color="primary"
        >
          <QuillWrite01Icon color={undefined} width={22} />
          Compose
        </Button>
      </div>
      <MailContainer items={mailItems} />
    </div>
  );
}
