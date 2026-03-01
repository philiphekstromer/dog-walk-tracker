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

// Format the time into hours and minutes
export const formatCountdownTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
