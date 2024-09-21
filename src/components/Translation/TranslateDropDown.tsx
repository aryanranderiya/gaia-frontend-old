// import { useConvoHistory } from "@/contexts/ConversationHistory";
// import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
// import { Avatar } from "@nextui-org/avatar";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@nextui-org/dropdown";
// import * as React from "react";
// import { LanguageSkillIcon } from "../icons";
// import { languages } from "./Languages";
// import { FC, useEffect, useState } from "react";

// interface TranslateDropdownProps {
//   trigger: React.ReactNode;
//   text: string;
//   index: number;
// }

// const TranslateDropdown: FC<TranslateDropdownProps> = ({
//   trigger,
//   // text,
//   // index,
// }) => {
//   // const { conversationHistory, setConversationHistory } = useConvoHistory();

//   // const [sourceLang, setSourceLang] = useState<string>("english");
//   // const [targetLang, setTargetLang] = useState<string>("en");

//   // useEffect(() => {
//   //   TranslateText();
//   // }, []);

//   // const TranslateText = async (
//   //   source: string,
//   //   target: string
//   // ): Promise<void> => {
//   //   // try {
//   //   //   const response = await axios.post(
//   //   //     `https://translate.aryanranderiya1478.workers.dev/`,
//   //   //     {
//   //   //       text,
//   //   //       source_lang: "english",
//   //   //       target_lang: "gujarati",
//   //   //     },
//   //   //     {
//   //   //       headers: {
//   //   //         "Content-Type": "application/json",
//   //   //       },
//   //   //     }
//   //   //   );
//   //   //   console.log(response);
//   //   // } catch (error) {
//   //   //   console.error(error);
//   //   //   toast.error("Uh oh! Something went wrong.", {
//   //   //     classNames: {
//   //   //       toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
//   //   //       title: " text-sm",
//   //   //       description: "text-sm",
//   //   //     },
//   //   //     duration: 3000,
//   //   //     description:
//   //   //       "There was a problem with translating text. Please try again later.\n",
//   //   //   });
//   //   // }
//   // };

//   // const setLanguage = (language: string): void => {
//   //   // setSourceLang(targetLang);
//   //   // setTargetLang(language);
//   //   // TranslateText(targetLang, language);
//   // };

//   return (
//     <Dropdown classNames={{ content: "dark" }}>
//       <DropdownTrigger>{trigger}</DropdownTrigger>
//       <DropdownMenu aria-label="Translate" className="p-0">
//         <DropdownItem isReadOnly closeOnSelect={false} className="dark m-0 p-">
//           <Autocomplete
//             description="Select a language to translate from"
//             label="Search a Language"
//             defaultSelectedKey="en"
//             color="primary"
//             variant="faded"
//             size="lg"
//             defaultItems={languages}
//             // onSelectionChange={setLanguage}
//             // selectedKey={targetLang}
//             startContent={<LanguageSkillIcon className="text-foreground" />}
//             popoverProps={{
//               offset: 10,
//               classNames: {
//                 base: "rounded-large",
//                 content: "dark text-foreground",
//               },
//             }}
//             listboxProps={{
//               emptyContent: "No Language Found",
//               selectionMode: "single",
//             }}
//             className="text-foreground"
//           >
//             {(item: Iteranble<{ value: string; flag: string; label: string }>) => (
//               <AutocompleteItem
//                 key={item.value}
//                 value={item.value}
//                 // classNames={{ dialog: "dark" }}
//                 startContent={
//                   <Avatar alt="UK" className="w-6 h-6" src={item.flag} />
//                 }
//               >
//                 {item.label}
//               </AutocompleteItem>
//             )}
//           </Autocomplete>
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default TranslateDropdown;
