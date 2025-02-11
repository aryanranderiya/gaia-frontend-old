import { HeroUIProvider } from "@heroui/system";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function UIProviderLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useNavigate();
  return <HeroUIProvider navigate={navigate}>{children}</HeroUIProvider>;
}
