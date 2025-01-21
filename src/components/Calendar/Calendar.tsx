import { apiauth } from "@/utils/apiaxios";
import { Checkbox } from "@nextui-org/checkbox";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

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
  calendars: GoogleCalendar[];
}

interface GoogleCalendar {
  id: string;
  summary: string;
  backgroundColor: string;
  primary: boolean;
}

function groupEventsByDate(
  events: GoogleCalendarEvent[]
): Record<string, GoogleCalendarEvent[]> {
  const grouped: Record<string, GoogleCalendarEvent[]> = {};

  events.forEach((event) => {
    const [day, dayOfWeek] = formatDateDay(event);
    const eventDate = `${day} ${dayOfWeek}`;

    if (!grouped[eventDate]) grouped[eventDate] = [];

    grouped[eventDate].push(event);
  });

  return grouped;
}

function formatDateDay(event: GoogleCalendarEvent): [string, string] {
  const startDate = new Date(event.start.date || event.start.dateTime || "");

  const day = startDate.getDate().toString();
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(startDate);

  return [day, dayOfWeek];
}

function formatEventDate(event: GoogleCalendarEvent): string | null {
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
      <div className="flex items-center gap-2 relative z-[1]">
        <span className="text-xl">{icon}</span>
        <div className="font-bold text-lg">{event.summary}</div>
      </div>
      <div className="text-sm mt-2 relative z-[1] opacity-70">
        {formatEventDate(event)}
      </div>
      <div
        style={{ backgroundColor }}
        className="absolute inset-0 z-[0] opacity-50 rounded-lg w-full"
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

      // Find the primary calendar
      const primaryCalendar = response.data.items.find(
        (cal: { primary: boolean }) => cal.primary === true
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

      // Merge new events with existing events, sort, and update state
      setCalendarEvents((prev) => {
        const mergedEvents = [...prev, ...newEvents];
        console.log(mergedEvents);

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
          <div className="font-bold text-center text-5xl">Calendar</div>
          <div className="text-center text-md pb-6 max-w-screen-md">
            Manage your calendar events
          </div>
          <div className="flex flex-wrap gap-4 justify-center pb-4">
            {!!calendars &&
              calendars?.length > 0 &&
              calendars.map((calendar, index) => (
                <div
                  style={{
                    backgroundColor: `${calendar.backgroundColor}50`,
                  }}
                  key={index}
                  className="py-2 px-4 rounded-lg"
                >
                  <Checkbox
                    key={calendar.id}
                    isSelected={selectedCalendars.includes(calendar.id)}
                    onValueChange={() => handleCalendarSelect(calendar.id)}
                    color="default"
                  >
                    <div className="font-medium text-white">
                      {calendar.summary}
                    </div>
                  </Checkbox>
                </div>
              ))}
          </div>
        </div>

        <ScrollArea>
          <div className="flex flex-wrap gap-4 justify-center pb-8 max-w-screen-sm mx-auto">
            {Object.entries(groupEventsByDate(calendarEvents)).map(
              ([date, events]) => {
                const [day, dayOfWeek] = date.split(" ");

                return (
                  <div key={date} className="w-full flex gap-7">
                    <div className="text-lg font-bold text-center min-w-[60px] max-w-[60px] min-h-[60px] max-h-[60px] rounded-full bg-[#00bbff] flex items-center break-words p-3 justify-center leading-none flex-col">
                      <div className="font-normal text-sm text-[#b7ecff]">
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

          <div ref={observerRef} className="h-1"></div>
        </ScrollArea>
        {/* 
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
        </div> */}
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
