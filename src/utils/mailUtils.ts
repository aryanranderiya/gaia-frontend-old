import { EmailData } from "@/pages/Mail";

export function parseEmail(from: string): { name: string; email: string } {
  // Improved email parsing
  const match = from.match(/^(.*?)\s*<(.+?)>$/) || from.match(/(.+)/);

  if (match) {
    return {
      name: match[1] ? match[1].trim().replace(/^"|"$/g, "") : "",
      email: match[2] || match[1],
    };
  }

  return {
    name: "",
    email: from,
  };
}

export function transformEmail(message: any): EmailData {
  return {
    id: message.id,
    from: message.from,
    subject: message.subject,
    time: message.time,
    snippet: message.snippet || message.body?.slice(0, 100),
  };
}
