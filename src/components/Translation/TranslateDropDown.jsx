import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { LanguageSkillIcon } from "../icons";
import * as React from "react";
import { Avatar } from "@nextui-org/avatar";

export default function TranslateDropdown({ trigger }) {
  const languages = [
    { key: "en", label: "English", flag: "https://flagcdn.com/gb.svg" },
  ];

  return (
    <Dropdown classNames={{ content: "dark" }}>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu aria-label="Translate" className="p-0">
        <DropdownItem isReadOnly closeOnSelect="false" className="dark m-0 p-">
          <Autocomplete
            description="Select a lanauge to translate from"
            label="Search a Language"
            defaultSelectedKey="en"
            defaultItems={languages}
            startContent={<LanguageSkillIcon className="text-foreground" />}
            // classNames={{ content: "dark" }}
            popoverProps={{
              offset: 10,
              classNames: {
                base: "rounded-large",
                content: "dark text-foreground",
              },
            }}
            listboxProps={{
              emptyContent: "No Language Found",
            }}
          >
            {(item) => (
              <AutocompleteItem
                key={item.value}
                value={item.value}
                classNames={{ dialog: "dark" }}
                startContent={
                  <Avatar alt="UK" className="w-6 h-6" src={item.flag} />
                }
              >
                {item.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
