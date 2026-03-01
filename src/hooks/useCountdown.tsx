import { useState, useEffect } from "react";

type CountdownProps = {
  intervalHours: number;
  nextWalkTime: number | null;
  setNextWalkTime: (time: number | null) => void;
};

type CountdownStatus = "idle" | "active" | "expired";

export const useCountdown = ({
  intervalHours,
  nextWalkTime,
  setNextWalkTime,
}: CountdownProps) => {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const remainingTime = nextWalkTime ? nextWalkTime - now : null; // Calculate remaining time until the next walk

  let status: CountdownStatus;

  if (!nextWalkTime) {
    status = "idle";
  } else if (remainingTime !== null && remainingTime > 0) {
    status = "active";
  } else {
    status = "expired";
  }

  const TIME_BETWEEN_WALKS = intervalHours * 60 * 60 * 1000; // Convert hours to milliseconds

  const startCountdown = () => {
    const nextWalk = Date.now() + TIME_BETWEEN_WALKS;
    setNextWalkTime(nextWalk);
  };

  return { startCountdown, remainingTime, status };
};
