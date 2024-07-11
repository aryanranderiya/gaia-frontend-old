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
  const month_year = now.toLocaleString(navigator.language, {
    month: "short",
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
  // return `${time}, ${date}${nth(date)} ${month_year}`;
  return time;
}
