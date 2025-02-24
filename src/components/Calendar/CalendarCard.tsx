import { Clock } from "lucide-react";

import { GoogleCalendar, GoogleCalendarEvent } from "@/types/calendarTypes";
import {
  formatEventDate,
  getEventColor,
  getEventIcon,
  isTooDark,
} from "@/utils/calendarUtils";

interface CalendarCardProps {
  event: GoogleCalendarEvent;
  onClick: () => void;
  calendars: GoogleCalendar[];
}

const CalendarCard = ({ event, onClick, calendars }: CalendarCardProps) => {
  const calendar = calendars?.find((cal) => cal.id === event.organizer.email);
  const color = calendar?.backgroundColor || getEventColor(event);
  const backgroundColor = isTooDark(color) ? "#ffffff" : color;
  const icon = getEventIcon(event);

  return (
    <div
      className="text-white p-4 rounded-lg shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden"
      onClick={onClick}
    >
      <div
        className="absolute inset-0 border-l-5 z-[2]"
        style={{ borderColor: backgroundColor }}
      />
      <div className="flex items-center gap-2 relative z-[1]">
        <span className="text-xl">{icon}</span>
        <div className="font-bold text-lg">{event.summary}</div>
      </div>
      {formatEventDate(event) && (
        <div
          className="text-sm mt-2 relative z-[1] opacity-70 flex items-center gap-1"
          style={{ color: backgroundColor }}
        >
          <Clock height={17} width={17} />
          {formatEventDate(event)}
        </div>
      )}
      <div
        className="absolute inset-0 z-[0] opacity-25 rounded-lg w-full"
        style={{ backgroundColor }}
      />
    </div>
  );
};

export default CalendarCard;
