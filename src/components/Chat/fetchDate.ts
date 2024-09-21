const nth = (date) => {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default function fetchDate() {
  const now = new Date();

  const month = now.toLocaleString(navigator.language, {
    month: "short",
  });

  const year = now.toLocaleString(navigator.language, {
    year: "2-digit",
  });

  const time = now
    .toLocaleString(navigator.language, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  const date = now.getDate();
  return {
    fullDate: `${time}, ${date}${nth(date)} ${month} ${year}`,
    time: time,
    date: date,
    month: month,
    year: year,
  };
}

export function parseDate(previousDate) {
  const currentDate = fetchDate();
  const parsedDate = { ...currentDate };

  if (previousDate && previousDate.month === currentDate.month)
    parsedDate.month = "";

  if (previousDate && previousDate.year === currentDate.year)
    parsedDate.year = "";

  if (previousDate && previousDate.date === currentDate.date)
    parsedDate.date = "";

  previousDate = currentDate;
  return `${parsedDate.time} ${parsedDate.date}${!!parsedDate.date ? nth(parsedDate.date) : ""} ${parsedDate.month} ${parsedDate.year}`.trim();
}
