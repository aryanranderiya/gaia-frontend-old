import { parseEmail } from "@/utils/mailUtils";

export const EmailFrom = ({ from }: { from: string }) => {
  const { name, email } = parseEmail(from);
  return <strong>{name ? name : email}</strong>;
};
