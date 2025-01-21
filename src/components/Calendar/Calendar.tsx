import { apiauth } from "@/utils/apiaxios";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import { CalendarAdd01Icon } from "../icons";
import { ScrollArea } from "../ui/scroll-area";
import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Checkbox } from "@nextui-org/checkbox";

interface GoogleCalendarDateTime {
  date?: string;
  dateTime?: string;
  timeZone?: string;
}

interface GoogleCalendarPerson {
  email: string;
  self?: boolean;
}

interface BirthdayProperties {
  contact: string;
  type: "birthday";
}

interface GoogleCalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: GoogleCalendarPerson;
  organizer: GoogleCalendarPerson;
  start: GoogleCalendarDateTime;
  end: GoogleCalendarDateTime;
  recurrence?: string[];
  transparency?: "opaque" | "transparent";
  visibility?: "default" | "public" | "private";
  iCalUID: string;
  sequence: number;
  reminders?: {
    useDefault: boolean;
  };
  birthdayProperties?: BirthdayProperties;
  eventType?: "default" | "birthday" | "outOfOffice";
}

interface CalendarCardProps {
  event: GoogleCalendarEvent;
  onClick: () => void;
}

interface GoogleCalendar {
  id: string;
  summary: string;
  backgroundColor: string;
  primary: boolean;
}

function formatEventDate(event: GoogleCalendarEvent): string {
  // Handle all-day events
  if (event.start.date) {
    const startDate = new Date(event.start.date);
    // For single-day events
    if (event.start.date === event.end?.date) {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(startDate);
    }
    // For multi-day events
    const endDate = new Date(event.end?.date || event.start.date);
    endDate.setDate(endDate.getDate() - 1); // Adjust end date since it's exclusive
    return `${new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(startDate)} - ${new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(endDate)}`;
  }

  // Handle events with specific times
  if (event.start.dateTime && event.end?.dateTime) {
    const startDateTime = new Date(event.start.dateTime);
    const endDateTime = new Date(event.end.dateTime);

    return `${new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(startDateTime)} - ${new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(endDateTime)}`;
  }

  return "Date not specified";
}

function getEventIcon(event: GoogleCalendarEvent): string {
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

function getEventColor(event: GoogleCalendarEvent): string {
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
const CalendarCard = ({ event, onClick, calendars }: CalendarCardProps) => {
  const calendar = calendars?.find((cal) => cal.id === event.organizer.email);
  const backgroundColor = calendar?.backgroundColor || getEventColor(event);
  const icon = getEventIcon(event);

  return (
    <div
      className="text-white bg-opacity-65 p-4 rounded-lg shadow-md cursor-pointer w-full transition-colors duration-200 relative z-[1] overflow-hidden"
      onClick={onClick}
    >
      <div className="flex items-center gap-2  relative z-[1]">
        <span className="text-xl">{icon}</span>
        <div className="font-bold text-lg">{event.summary}</div>
      </div>
      <div className="text-sm mt-2  relative z-[1]">
        {formatEventDate(event)}
      </div>
      <div
        style={{ backgroundColor }}
        className="absolute inset-0 z-[0] opacity-50 rounded-lg"
      ></div>
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
  const eventIdsRef = useRef<Set<string>>(new Set()); // Use `ref` for stable reference
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

  useEffect(() => {
    fetchCalendars();
  }, []);

  useEffect(() => {
    // Set up Intersection Observer for infinite scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && nextPageToken) {
          fetchEvents(nextPageToken); // Fetch next page
        }
      },
      { rootMargin: "300px" }
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

      // Find the primary calendar
      const primaryCalendar = response.data.items.find(
        (cal) => cal.primary === true
      );
      if (primaryCalendar) {
        setSelectedCalendars([primaryCalendar.id]);
        // Fetch events for the primary calendar
        fetchEvents(null, [primaryCalendar.id]);
      }
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  };

  const fetchEvents = async (
    pageToken: string | null = null,
    calendarIds: string[] | null = null
  ) => {
    // Prevent overlapping requests
    if (loading || (!pageToken && calendarEvents.length > 0)) return;

    setLoading(true);
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

        console.log(response.data);

        allEvents.push(...response.data.events);
        if (response.data.nextPageToken) {
          setNextPageToken(response.data.nextPageToken);
        }
      }

      const filteredEvents = allEvents.filter((event) => {
        // Avoid duplicates by checking against the reference Set
        if (eventIdsRef.current.has(event.id)) {
          return false;
        }
        eventIdsRef.current.add(event.id); // Add to deduplication set
        return true;
      });

      // Append unique events to the state
      setCalendarEvents((prev) => [...prev, ...filteredEvents]);
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
    setSelectedCalendars((prev) => {
      const newSelection = prev.includes(calendarId)
        ? prev.filter((id) => id !== calendarId)
        : [...prev, calendarId];

      setCalendarEvents([]);
      eventIdsRef.current.clear();
      setNextPageToken(null);

      setTimeout(() => fetchEvents(null, newSelection), 0);

      return newSelection;
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full relative">
        <div className="flex items-center flex-col gap-2">
          <div className="font-bold text-center text-5xl">Calendar</div>
          <div className="text-center text-md pb-6 max-w-screen-md">
            Manage your calendar events
          </div>
          <div className="flex flex-wrap gap-4 justify-center pb-4">
            {!!calendars &&
              calendars?.length > 0 &&
              calendars.map((calendar) => (
                <Checkbox
                  key={calendar.id}
                  isSelected={selectedCalendars.includes(calendar.id)}
                  onValueChange={() => handleCalendarSelect(calendar.id)}
                  color={calendar.backgroundColor.replace("#", "") as any}
                >
                  {calendar.summary}
                </Checkbox>
              ))}
          </div>
        </div>

        <ScrollArea>
          <div className="flex flex-wrap gap-4 justify-center pb-8 max-w-screen-sm mx-auto">
            {calendarEvents?.map((event) => (
              <CalendarCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
                calendars={calendars}
              />
            ))}
          </div>

          {loading && (
            <div className="h-[80vh] flex items-center justify-center">
              <Spinner />
            </div>
          )}

          <div ref={observerRef} className="h-1"></div>
        </ScrollArea>

        <div className="absolute left-0 bottom-6 flex justify-center items-center w-full z-10">
          <Button
            variant="shadow"
            color="primary"
            size="lg"
            radius="full"
            className="font-semibold gap-2"
          >
            <CalendarAdd01Icon width={23} height={23} />
            Create a new event
          </Button>
        </div>
        <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" />
      </div>
      {selectedEvent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>{getEventIcon(selectedEvent)}</span>
                {selectedEvent.summary}
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-2">
              <p className="flex items-center gap-2">
                <strong>Date:</strong> {formatEventDate(selectedEvent)}
              </p>
              {selectedEvent.eventType && (
                <p>
                  <strong>Event Type:</strong> {selectedEvent.eventType}
                </p>
              )}
              <p>
                <strong>Creator:</strong> {selectedEvent.creator.email}
              </p>
              <p>
                <strong>Organizer:</strong> {selectedEvent.organizer.email}
              </p>
              <p>
                <strong>Status:</strong> {selectedEvent.status}
              </p>
              {selectedEvent.recurrence && (
                <p>
                  <strong>Recurrence:</strong>{" "}
                  {selectedEvent.recurrence[0].replace("RRULE:", "")}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
