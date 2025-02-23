import { GoogleCalendar } from "@/types/calendarTypes";
import { isTooDark } from "@/utils/calendarUtils";
import { Chip, useCheckbox, VisuallyHidden } from "@heroui/react";
import { Eye, EyeOffIcon } from "lucide-react";

interface CalendarChipProps {
  calendar: GoogleCalendar;
  selected: boolean;
  onSelect: (id: string) => void;
}

function CalendarChip({ calendar, selected, onSelect }: CalendarChipProps) {
  const baseColor = calendar.backgroundColor;
  const computedColor = isTooDark(baseColor) ? "#ffffff" : baseColor;
  // const contrastingTextColor = getContrastingColor(computedColor);

  const { getBaseProps, getLabelProps, getInputProps } = useCheckbox({
    defaultSelected: selected,
  });

  return (
    <div
      className="rounded-lg relative cursor-pointer min-w-full"
      onClick={() => onSelect(calendar.id)}
    >
      <label {...getBaseProps()} className="relative z-10 min-w-full">
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <Chip
          className="text-center items-center "
          variant="faded"
          {...(getLabelProps() as any)}
          style={{
            maxWidth: "100%",
            minWidth: "100%",
            backgroundColor: selected ? `${computedColor}30` : undefined,
            margin: "0",
            borderWidth: "0px",
            color: computedColor,
            borderRadius: "7px",
          }}
          startContent={
            selected ? (
              <Eye className="mr-1" />
            ) : (
              <EyeOffIcon className="mr-1" />
            )
          }
        >
          <div className="text-sm">{calendar.summary}</div>
        </Chip>
      </label>
    </div>
  );
}

interface CalendarSelectorProps {
  calendars: GoogleCalendar[];
  selectedCalendars: string[];
  onCalendarSelect: (calendarId: string) => void;
}

export default function CalendarSelector({
  calendars,
  selectedCalendars,
  onCalendarSelect,
}: CalendarSelectorProps) {
  return (
    <div className="flex flex-col fixed bottom-5 right-5 px-3 min-w-[220px] py-3 gap-1 justify-center pb-4 bg-zinc-800 rounded-xl max-h-[70vh] flex-nowrap overflow-y-scroll">
      <div className="text-sm font-medium mb-2">Your Calendars</div>
      {calendars &&
        calendars.length > 0 &&
        calendars
          .sort((a, b) => a.summary.localeCompare(b.summary))
          .map((calendar) => (
            <CalendarChip
              key={calendar.id}
              calendar={calendar}
              selected={selectedCalendars.includes(calendar.id)}
              onSelect={onCalendarSelect}
            />
          ))}
    </div>
  );
}
