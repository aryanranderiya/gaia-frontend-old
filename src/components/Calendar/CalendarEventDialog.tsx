import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoogleCalendarEvent } from "@/types/calendarTypes";
import { formatEventDate, getEventIcon } from "@/utils/calendarUtils";
import {
  Bell,
  Calendar as CalendarIcon,
  Clock,
  Edit3,
  History,
  Info,
  Link2,
  Repeat,
  User,
} from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface CalendarEventDialogProps {
  event: GoogleCalendarEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalendarEventDialog: React.FC<CalendarEventDialogProps> = ({
  event,
  open,
  onOpenChange,
}) => {
  const InfoSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-zinc-800 rounded-xl p-4 space-y-3">
      {!!title && <span className="text-medium font-medium">{title}</span>}
      {children}
    </div>
  );

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string | null;
  }) => {
    if (!value) return null;

    const content = (
      <div className="flex items-center gap-3 text-zinc-300">
        <div className="w-6 h-6 flex items-center justify-center text-zinc-400">
          <Icon size={16} />
        </div>
        <span className="font-medium text-zinc-400">{label}:</span>
        <span className="text-zinc-200">{value}</span>
      </div>
    );

    return content;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!bg-zinc-900 border-none max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-zinc-800">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-xl">
              {getEventIcon(event)}
            </div>
            <span className="font-bold text-xl text-zinc-100">
              {event.summary}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Essential Event Details */}
          <InfoSection title="Event Details">
            <InfoItem
              icon={Clock}
              label="Date"
              value={formatEventDate(event)}
            />
            {event.description && (
              <div className="flex gap-3 mt-2">
                <div className="w-6 h-6 flex items-center justify-center text-zinc-400">
                  <Edit3 size={16} />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-zinc-400">
                    Description:
                  </span>
                  <p className="mt-1 text-zinc-300">{event.description}</p>
                </div>
              </div>
            )}

            <InfoItem
              icon={CalendarIcon}
              label="Start"
              value={
                event.start?.dateTime
                  ? new Date(event.start.dateTime).toLocaleString()
                  : event.start?.date || null
              }
            />
            <InfoItem
              icon={CalendarIcon}
              label="End"
              value={
                event.end?.dateTime
                  ? new Date(event.end.dateTime).toLocaleString()
                  : event.end?.date || null
              }
            />
          </InfoSection>

          {/* Accordion Sections for Less Important Info */}
          <Accordion type="single" collapsible className="space-y-4  my-2">
            <AccordionItem
              value="people"
              className="border-none  bg-zinc-800 rounded-xl"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <span className="text-medium font-medium">People</span>
              </AccordionTrigger>
              <AccordionContent className="bg-zinc-800 px-4 pb-4 mt-1 rounded-b-lg">
                <InfoItem
                  icon={User}
                  label="Creator"
                  value={event.creator?.email || null}
                />
                <InfoItem
                  icon={User}
                  label="Organizer"
                  value={event.organizer?.email || null}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Recurrence Section */}
            {event.recurrence && (
              <AccordionItem value="recurrence" className="border-none">
                <AccordionTrigger className="bg-zinc-800 rounded-xl px-4 py-3 hover:no-underline">
                  <span className="text-lg font-semibold">Recurrence</span>
                </AccordionTrigger>
                <AccordionContent className=" px-4 pb-4 mt-1 rounded-b-lg">
                  <InfoItem
                    icon={Repeat}
                    label="Pattern"
                    value={event.recurrence[0].replace("RRULE:", "")}
                  />
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Additional Details Section */}
            <AccordionItem
              value="additional"
              className="border-none bg-zinc-800 rounded-xl"
            >
              <AccordionTrigger className=" px-4 py-3 hover:no-underline">
                <span className="text-medium font-medium">
                  Additional Details
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 mt-1 rounded-b-lg">
                <InfoItem
                  icon={Info}
                  label="Status"
                  value={event.status || null}
                />
                <InfoItem
                  icon={Bell}
                  label="Reminders"
                  value={event.reminders?.useDefault ? "Default" : "Custom"}
                />
                <InfoItem
                  icon={Info}
                  label="Event Type"
                  value={event.eventType || null}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="technical"
              className="border-none bg-zinc-800 rounded-xl"
            >
              <AccordionTrigger className=" px-4 py-3 hover:no-underline">
                <span className="text-medium font-medium">
                  Technical Details
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 mt-1 rounded-b-lg space-y-3">
                <InfoItem
                  icon={History}
                  label="Created"
                  value={
                    event.created
                      ? new Date(event.created).toLocaleString()
                      : null
                  }
                />
                <InfoItem
                  icon={History}
                  label="Updated"
                  value={
                    event.updated
                      ? new Date(event.updated).toLocaleString()
                      : null
                  }
                />
                <InfoItem
                  icon={Info}
                  label="iCalUID"
                  value={event.iCalUID || null}
                />
                <InfoItem
                  icon={Info}
                  label="Sequence"
                  value={event.sequence?.toString() || null}
                />
                {event.htmlLink && (
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-6 h-6 flex items-center justify-center text-zinc-400">
                      <Link2 size={16} />
                    </div>
                    <span className="font-medium text-zinc-400">Link:</span>
                    <a
                      href={event.htmlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline truncate max-w-[300px]"
                    >
                      {event.htmlLink}
                    </a>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarEventDialog;
