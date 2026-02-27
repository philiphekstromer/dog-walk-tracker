import { format, isToday, isYesterday } from "date-fns";

export const formatWalkDate = (createdAt: number | Date): string => {
  const date = new Date(createdAt);

  const timeString = format(date, "HH:mm");

  if (isToday(date)) {
    return `today at ${timeString}`;
  }

  if (isYesterday(date)) {
    return `yesterday at ${timeString}`;
  }

  return `${format(date, "d MMM")} at ${timeString}`;
};
