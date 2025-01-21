import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Switch } from "@nextui-org/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Category = {
  id: string;
  name: string;
  color: string;
};

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  categoryId: string;
  isAllDay: boolean;
};

type ViewType =
  | "day"
  | "2day"
  | "3day"
  | "4day"
  | "5day"
  | "6day"
  | "7day"
  | "month"
  | "year";

const defaultCategories: Category[] = [
  { id: "work", name: "Work", color: "#4285F4" },
  { id: "personal", name: "Personal", color: "#34A853" },
  { id: "family", name: "Family", color: "#FBBC05" },
  { id: "other", name: "Other", color: "#EA4335" },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  // const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const categories = defaultCategories;
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    start: new Date(),
    end: new Date(),
    categoryId: "personal",
    isAllDay: false,
  });
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewType, setViewType] = useState<ViewType>("month");
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [dragEnd, setDragEnd] = useState<Date | null>(null);
  const [previewEvent, setPreviewEvent] = useState<Omit<Event, "id"> | null>(
    null
  );
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const days = ["1", "2", "3", "4", "5", "6", "7"];
      if (days.includes(e.key)) {
        setViewType(e.key === "1" ? "day" : (`${e.key}day` as ViewType));
      } else if (e.key === "m") {
        setViewType("month");
      } else if (e.key === "y") {
        setViewType("year");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const addOrUpdateEvent = () => {
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id ? { ...editingEvent, ...newEvent } : e
        )
      );
    } else if (newEvent.title) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      categoryId: "personal",
      isAllDay: false,
    });
    setShowEventDialog(false);
    setEditingEvent(null);
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowEventDialog(true);
  };

  // const handleDayClick = (date: Date) => {
  //   const newEventStart = new Date(date);
  //   newEventStart.setHours(new Date().getHours());
  //   const newEventEnd = new Date(newEventStart);
  //   newEventEnd.setHours(newEventStart.getHours() + 1);
  //   setNewEvent({ ...newEvent, start: newEventStart, end: newEventEnd });
  //   setShowEventDialog(true);
  // };

  const handleDragStart = (date: Date) => {
    setDragStart(date);
    setDragEnd(date);
    setPreviewEvent({
      title: "New Event",
      start: date,
      end: new Date(date.getTime() + 60 * 60 * 1000),
      categoryId: newEvent.categoryId,
      isAllDay: false,
    });
  };

  const handleDragMove = (date: Date) => {
    if (dragStart) {
      setDragEnd(date);
      setPreviewEvent((prev) =>
        prev
          ? {
              ...prev,
              start: new Date(Math.min(dragStart.getTime(), date.getTime())),
              end: new Date(
                Math.max(dragStart.getTime(), date.getTime()) +
                  24 * 60 * 60 * 1000
              ),
            }
          : null
      );
    }
  };

  const handleDragEnd = () => {
    if (dragStart && dragEnd) {
      const newEventStart = new Date(
        Math.min(dragStart.getTime(), dragEnd.getTime())
      );
      const newEventEnd = new Date(
        Math.max(dragStart.getTime(), dragEnd.getTime()) + 24 * 60 * 60 * 1000
      );
      setNewEvent({ ...newEvent, start: newEventStart, end: newEventEnd });
      setShowEventDialog(true);
    }
    setDragStart(null);
    setDragEnd(null);
    setPreviewEvent(null);
  };

  const parseNaturalLanguage = () => {
    const words = naturalLanguageInput.toLowerCase().split(" ");
    const newEvent: Omit<Event, "id"> = {
      title: "",
      start: new Date(),
      end: new Date(),
      categoryId: "personal",
      isAllDay: false,
    };

    let dateSet = false;
    let timeSet = false;

    words.forEach((word, index) => {
      if (word === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        newEvent.start = tomorrow;
        newEvent.end = new Date(tomorrow);
        dateSet = true;
      } else if (word === "at" && !timeSet) {
        const time = words[index + 1];
        const [hours, minutes] = time.split(":");
        newEvent.start.setHours(parseInt(hours), parseInt(minutes) || 0);
        newEvent.end = new Date(newEvent.start);
        newEvent.end.setHours(newEvent.start.getHours() + 1);
        timeSet = true;
      } else if (["work", "personal", "family", "other"].includes(word)) {
        newEvent.categoryId = word;
      } else if (
        word === "allday" ||
        (word === "all" && words[index + 1] === "day")
      ) {
        newEvent.isAllDay = true;
      }
    });

    if (!dateSet) {
      newEvent.start.setHours(9, 0);
      newEvent.end = new Date(newEvent.start);
      newEvent.end.setHours(10, 0);
    }

    newEvent.title = words
      .filter(
        (w) =>
          ![
            "tomorrow",
            "at",
            "work",
            "personal",
            "family",
            "other",
            "allday",
            "all",
            "day",
          ].includes(w)
      )
      .join(" ");

    setNewEvent(newEvent);
    setShowEventDialog(true);
    setNaturalLanguageInput("");
  };

  const handleNaturalLanguageKeyDown = (
    e: ReactKeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      parseNaturalLanguage();
    }
  };

  const renderDayView = (date: Date, daysToShow: number = 1) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = Array.from({ length: daysToShow }, (_, i) => {
      const day = new Date(date);
      day.setDate(day.getDate() + i);
      return day;
    });

    return (
      <div className={`grid grid-cols-[auto,repeat(${daysToShow},1fr)] gap-2`}>
        <div></div>
        {days.map((day) => (
          <div key={day.toISOString()} className="text-center font-bold">
            {day.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
        ))}
        <div className="row-span-full">
          {hours.map((hour) => (
            <div key={hour} className="h-12 text-right pr-2">
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day.toISOString()} className="relative">
            {hours.map((hour) => {
              const cellDate = new Date(day.setHours(hour));
              const isCurrentDay =
                cellDate.toDateString() === new Date().toDateString();
              return (
                <div
                  key={cellDate.toISOString()}
                  className={`h-12 border-t relative ${
                    isCurrentDay ? "bg-primary/20" : ""
                  }`}
                  onMouseDown={() => handleDragStart(cellDate)}
                  onMouseMove={() => handleDragMove(cellDate)}
                  onMouseUp={handleDragEnd}
                >
                  {events
                    .filter(
                      (event) => event.start <= cellDate && event.end > cellDate
                    )
                    .map((event) => (
                      <div
                        key={event.id}
                        className="absolute left-0 right-0 text-white p-1 text-xs rounded overflow-hidden"
                        style={{
                          backgroundColor: categories.find(
                            (c) => c.id === event.categoryId
                          )?.color,
                          top: `${(event.start.getMinutes() / 60) * 48}px`,
                          height: `${Math.max(
                            16,
                            ((event.end.getTime() - event.start.getTime()) /
                              (60 * 60 * 1000)) *
                              48
                          )}px`,
                        }}
                        onClick={() => handleEventClick(event)}
                      >
                        {event.title}{" "}
                        {!event.isAllDay &&
                          `(${event.start.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} - ${event.end.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })})`}
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderMonthView = (date: Date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const weeks = [];
    let currentWeek = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {weeks.flat().map((day, index) => {
          const isCurrentMonth = day.getMonth() === date.getMonth();
          const isCurrentDay = day.toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              className={`h-32 ${
                isCurrentMonth
                  ? "bg-zinc-500 bg-opacity-35"
                  : "bg-zinc-700 bg-opacity-20"
              } ${
                isCurrentDay ? "ring-2 ring-primary bg-primary-500" : ""
              } rounded-lg overflow-y-auto p-2 cursor-pointer`}
              onClick={() => {
                setCurrentDate(day);
                setViewType("day");
              }}
              onMouseDown={() => handleDragStart(day)}
              onMouseMove={() => handleDragMove(day)}
              onMouseUp={handleDragEnd}
            >
              <div className={"font-bold mb-1"}>{day.getDate()}</div>
              {events
                .filter((event) => event.start <= day && event.end > day)
                .map((event) => (
                  <div
                    key={event.id}
                    className="text-xs text-white p-1 rounded mb-1 truncate cursor-pointer"
                    style={{
                      backgroundColor: categories.find(
                        (c) => c.id === event.categoryId
                      )?.color,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    {event.title}{" "}
                    {!event.isAllDay &&
                      `(${event.start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })})`}
                  </div>
                ))}
              {previewEvent &&
                previewEvent.start <= day &&
                previewEvent.end > day && (
                  <div className="text-xs bg-primary/50 text-white p-1 rounded mb-1 truncate">
                    {previewEvent.title}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderYearView = (year: number) => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

    return (
      <div className="grid grid-cols-4 gap-4">
        {months.map((month) => (
          <div
            key={month.toISOString()}
            className="rounded-xl p-2 cursor-pointer bg-zinc-700 bg-opacity-80 "
            onClick={() => {
              setCurrentDate(month);
              setViewType("month");
            }}
          >
            <h3 className="text-center font-bold mb-2">
              {month.toLocaleString("default", { month: "long" })}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className="text-center font-bold">
                  {day}
                </div>
              ))}
              {Array.from(
                { length: new Date(year, month.getMonth() + 1, 0).getDate() },
                (_, i) => i + 1
              ).map((day) => {
                const currentDay = new Date(year, month.getMonth(), day);
                const isCurrentDay =
                  currentDay.toDateString() === new Date().toDateString();
                const hasEvents = events.some(
                  (event) => event.start <= currentDay && event.end > currentDay
                );
                return (
                  <div
                    key={day}
                    className={`text-center ${
                      isCurrentDay ? "bg-primary text-primary-foreground" : ""
                    } ${
                      hasEvents ? "bg-secondary text-secondary-foreground" : ""
                    } rounded-full`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCalendar = () => {
    switch (viewType) {
      case "day":
      case "2day":
      case "3day":
      case "4day":
      case "5day":
      case "6day":
      case "7day":
        return renderDayView(currentDate, parseInt(viewType) || 1);
      case "month":
        return renderMonthView(currentDate);
      case "year":
        return renderYearView(currentDate.getFullYear());
      default:
        return null;
    }
  };

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    switch (viewType) {
      case "day":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "2day":
      case "3day":
      case "4day":
      case "5day":
      case "6day":
      case "7day":
        newDate.setDate(newDate.getDate() - parseInt(viewType));
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    switch (viewType) {
      case "day":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "2day":
      case "3day":
      case "4day":
      case "5day":
      case "6day":
      case "7day":
        newDate.setDate(newDate.getDate() + parseInt(viewType));
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="container mx-auto p-4 select-none h-full" ref={calendarRef}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentDate(new Date())}
            variant="flat"
            color="primary"
          >
            Today
          </Button>
          <Button
            onClick={navigatePrevious}
            isIconOnly
            variant="flat"
            color="primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={navigateNext}
            isIconOnly
            variant="flat"
            color="primary"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select
            value={viewType}
            onChange={(e) => setViewType(e.target.value as ViewType)}
            placeholder="Select View"
            className="w-32"
            variant="bordered"
            color="primary"
          >
            <SelectItem key="day" value="day">
              Day
            </SelectItem>
            <SelectItem key="2day" value="2day">
              2 Days
            </SelectItem>
            <SelectItem key="3day" value="3day">
              3 Days
            </SelectItem>
            <SelectItem key="4day" value="4day">
              4 Days
            </SelectItem>
            <SelectItem key="5day" value="5day">
              5 Days
            </SelectItem>
            <SelectItem key="6day" value="6day">
              6 Days
            </SelectItem>
            <SelectItem key="7day" value="7day">
              Week
            </SelectItem>
            <SelectItem key="month" value="month">
              Month
            </SelectItem>
            <SelectItem key="year" value="year">
              Year
            </SelectItem>
            {/* </SelectContent> */}
          </Select>
        </div>
      </div>

      <div className="flex mb-4">
        <Input
          placeholder="Add event (e.g. 'Meeting tomorrow at 3:00 for work')"
          value={naturalLanguageInput}
          onChange={(e) => setNaturalLanguageInput(e.target.value)}
          onKeyDown={handleNaturalLanguageKeyDown}
          className="flex-grow mr-2"
          radius="full"
          variant="faded"
          color="primary"
          size="lg"
        />
        <Button
          onClick={parseNaturalLanguage}
          variant="shadow"
          color="primary"
          radius="full"
          size="lg"
        >
          Add
        </Button>
      </div>

      {renderCalendar()}

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="dark bg-zinc-900 text-foreground rounded-2xl border-none">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="allDay" className="text-right">
                All Day
              </Label>
              <Switch
                id="allDay"
                isSelected={newEvent.isAllDay}
                onValueChange={(checked: boolean) =>
                  setNewEvent({ ...newEvent, isAllDay: checked })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start
              </Label>
              <Input
                id="start"
                type={newEvent.isAllDay ? "date" : "datetime-local"}
                value={
                  newEvent.isAllDay
                    ? newEvent.start.toISOString().split("T")[0]
                    : newEvent.start.toISOString().slice(0, 16)
                }
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: new Date(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End
              </Label>
              <Input
                id="end"
                type={newEvent.isAllDay ? "date" : "datetime-local"}
                value={
                  newEvent.isAllDay
                    ? newEvent.end.toISOString().split("T")[0]
                    : newEvent.end.toISOString().slice(0, 16)
                }
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: new Date(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>

              <Select
                placeholder="Select category"
                className="col-span-3"
                selectedKeys={newEvent.categoryId}
                onSelectionChange={(value: string) =>
                  setNewEvent({ ...newEvent, categoryId: value })
                }
                classNames={{
                  listboxWrapper: "rounded-lg m-0",
                  popoverContent: "bg-zinc-600 hover:bg-zinc-400",
                }}
              >
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center text-white">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <Button onClick={addOrUpdateEvent}>
            {editingEvent ? "Update Event" : "Add Event"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
