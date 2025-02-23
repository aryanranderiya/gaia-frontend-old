// src/components/Calendar.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoogleCalendar, GoogleCalendarEvent } from "@/types/calendarTypes";
import { apiauth } from "@/utils/apiaxios";
import {
  formatEventDate,
  getEventColor,
  getEventIcon,
  groupEventsByDate,
  isTooDark,
} from "@/utils/calendarUtils";
import { Spinner } from "@heroui/spinner";
import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CalendarSelector from "./CalendarSelector";
import CalendarEventDialog from "./CalendarEventDialog";

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
          <Clock width={17} height={17} />
          {formatEventDate(event)}
        </div>
      )}
      <div
        style={{ backgroundColor }}
        className="absolute inset-0 z-[0] opacity-25 rounded-lg w-full"
      />
    </div>
  );
};

export default function Calendar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>(
    []
  );
  const [selectedEvent, setSelectedEvent] =
    useState<GoogleCalendarEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const eventIdsRef = useRef<Set<string>>(new Set());
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

  useEffect(() => {
    fetchCalendars();
  }, []);

  useEffect(() => {
    console.log(selectedEvent);
  }, [selectedEvent]);

  useEffect(() => {
    // Set up Intersection Observer for infinite scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && !!nextPageToken) {
          fetchEvents(nextPageToken); // Fetch next page
        }
      },
      { rootMargin: "0px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, nextPageToken]);

  const fetchCalendars = async () => {
    try {
      const response = await apiauth.get("/calendar/list");
      setCalendars(response.data.items);

      // Find the primary calendar and set it as selected
      const primaryCalendar = response.data.items.find(
        (cal: { primary: boolean }) => cal.primary === true
      );
      if (primaryCalendar) {
        setSelectedCalendars([primaryCalendar.id]);
        // Fetch events for the primary calendar
        fetchEvents(null, [primaryCalendar.id]);
      }

      const response2 = await apiauth.get("/calendar/all/events");
      console.log(response2);
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  };

  const fetchEvents = async (
    pageToken: string | null = null,
    calendarIds: string[] | null = null
  ) => {
    if (calendarEvents.length <= 0) setLoading(true);

    try {
      const allEvents: GoogleCalendarEvent[] = [];
      const calendarsToFetch = calendarIds || selectedCalendars;
      for (const calendarId of calendarsToFetch) {
        const response = await apiauth.get<{
          events: GoogleCalendarEvent[];
          nextPageToken: string | null;
        }>(`/calendar/${calendarId}/events`, {
          params: { page_token: pageToken },
        });

        allEvents.push(...response.data.events);
        if (response.data.nextPageToken) {
          setNextPageToken(response.data.nextPageToken);
        }
      }

      // Filter out duplicates and add new events
      const newEvents = allEvents.filter(
        (event) => !eventIdsRef.current.has(event.id)
      );
      newEvents.forEach((event) => eventIdsRef.current.add(event.id));

      // Merge new events with existing events, sort by start date, and update state
      setCalendarEvents((prev) => {
        const mergedEvents = [...prev, ...newEvents];
        return mergedEvents.sort((a, b) => {
          const dateA = new Date(a.start.dateTime || a.start.date || "");
          const dateB = new Date(b.start.dateTime || b.start.date || "");
          return dateA.getTime() - dateB.getTime();
        });
      });
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (event: GoogleCalendarEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleCalendarSelect = (calendarId: string) => {
    if (loading) return; // Prevent actions when still loading

    setSelectedCalendars((prev) => {
      const newSelection = prev.includes(calendarId)
        ? prev.filter((id) => id !== calendarId)
        : [...prev, calendarId];

      // If a calendar is deselected, remove its events
      if (!newSelection.includes(calendarId)) {
        setCalendarEvents((prevEvents) =>
          prevEvents.filter((event) => event.organizer.email !== calendarId)
        );
        eventIdsRef.current = new Set(
          Array.from(eventIdsRef.current).filter((id) =>
            calendarEvents.find(
              (event) => event.id === id && event.organizer.email !== calendarId
            )
          )
        );
      } else {
        // If a new calendar is selected, fetch its events
        fetchEvents(null, [calendarId]);
      }

      return newSelection;
    });
  };

  useEffect(() => {
    if (selectedCalendars.length > 0) {
      fetchEvents();
    }
  }, [selectedCalendars]);

  return (
    <>
      <div className="flex flex-col justify-between h-full relative">
        <div className="flex items-center flex-col gap-2">
          <div className="font-bold text-center text-5xl pb-6">
            Your Calendar
          </div>
          <CalendarSelector
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            onCalendarSelect={handleCalendarSelect}
          />
        </div>

        <ScrollArea>
          <div className="flex flex-wrap gap-4 justify-center pb-8 max-w-screen-sm mx-auto">
            {Object.entries(groupEventsByDate(calendarEvents)).map(
              ([date, events]) => {
                const [day, dayOfWeek] = date.split(" ");
                return (
                  <div key={date} className="w-full flex gap-7">
                    <div className="text-lg font-bold text-center min-w-[60px] max-w-[60px] min-h-[60px] max-h-[60px] rounded-full bg-zinc-700 flex items-center break-words p-3 justify-center leading-none flex-col">
                      <div className="font-normal text-sm text-foreground-600">
                        {dayOfWeek}
                      </div>
                      <div>{day}</div>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center w-full">
                      {events.map((event) => (
                        <CalendarCard
                          key={event.id}
                          event={event}
                          onClick={() => handleEventClick(event)}
                          calendars={calendars}
                        />
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
          {loading && (
            <div className="h-[80vh] flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <div ref={observerRef} className="h-1" />
        </ScrollArea>
        <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" />
      </div>
      {selectedEvent && (
        <CalendarEventDialog
          event={selectedEvent}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
}
