// src/utils/calendarUtils.ts

import tinycolor from "tinycolor2";

import { GoogleCalendarEvent } from "@/types/calendarTypes";

// Group events by a date string like "day dayOfWeek"
export function groupEventsByDate(
  events: GoogleCalendarEvent[],
): Record<string, GoogleCalendarEvent[]> {
  const grouped: Record<string, GoogleCalendarEvent[]> = {};

  events.forEach((event) => {
    const [day, dayOfWeek] = formatDateDay(event);
    const eventDate = `${day} ${dayOfWeek}`;

    if (!grouped[eventDate]) {
      grouped[eventDate] = [];
    }
    grouped[eventDate].push(event);
  });

  return grouped;
}

// Format the day and day of week from an event's start date.
export function formatDateDay(event: GoogleCalendarEvent): [string, string] {
  const startDate = new Date(event.start.date || event.start.dateTime || "");
  const day = startDate.getDate().toString();
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(startDate);

  return [day, dayOfWeek];
}

// Format event time range if dateTime is available.
export function formatEventDate(event: GoogleCalendarEvent): string | null {
  if (event.start.dateTime && event.end?.dateTime) {
    const startDateTime = new Date(event.start.dateTime);
    const endDateTime = new Date(event.end.dateTime);

    return `${new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(startDateTime)} - ${new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(endDateTime)}`;
  }

  return null;
}

// Determine which icon to use based on event type and transparency.
export function getEventIcon(event: GoogleCalendarEvent): string {
  switch (event.eventType) {
    case "birthday":
      return "🎂";
    case "outOfOffice":
      return "🏖️";
    default:
      if (event.transparency === "transparent") {
        return "🔔";
      }

      return "📅";
  }
}

// Determine which color to use for the event (as a Tailwind class).
export function getEventColor(event: GoogleCalendarEvent): string {
  switch (event.eventType) {
    case "birthday":
      return "bg-pink-500 hover:bg-pink-600";
    case "outOfOffice":
      return "bg-teal-500 hover:bg-teal-600";
    default:
      if (event.transparency === "transparent") {
        return "bg-purple-500 hover:bg-purple-600";
      }

      return "bg-blue-500 hover:bg-blue-600";
  }
}

export function isTooDark(color: string, threshold: number = 0.04): boolean {
  const luminance = tinycolor(color).getLuminance();

  return luminance < threshold;
}
