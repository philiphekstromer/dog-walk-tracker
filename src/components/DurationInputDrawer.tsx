import { useAppDrawer } from "../hooks/useAppDrawer";
import { AppDrawer } from "./AppDrawer";
import { Button } from "./Button";
import { Plus } from "lucide-react";
import { format, set, isValid, getTime } from "date-fns";
import { useState } from "react";
import { Timepicker } from "./Timepicker";

type DurationInputDrawerProps = {
  startCountdown: (timestamp: number) => void;
  addWalk: (minutes: number, timestamp: number) => void;
};

export const DurationInputDrawer = ({
  startCountdown,
  addWalk,
}: DurationInputDrawerProps) => {
  const appDrawer = useAppDrawer();

  //Function to get the current time in 'HH:mm' format
  const getCurrentTimeString = (): string => {
    const now = new Date();
    return format(now, "HH:mm");
  };

  //State to hold the selected time for the walk. It is initialized to the current time in 'HH:mm' format.
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeString());

  //State to hold error messages to display to the user
  const [error, setError] = useState<string | null>(null);

  const getTimestampFromTimeString = (timeString: string): number => {
    // Parse the time string to get hours and minutes
    const [hoursRaw, minutesRaw] = timeString.split(":");

    // Convert the parsed strings to numbers
    const hours = parseInt(hoursRaw, 10);
    const minutes = parseInt(minutesRaw, 10);

    // Create a date object for today with the specified hours and minutes
    const dateObject = set(new Date(), {
      hours: hours,
      minutes: minutes,
      seconds: 0,
      milliseconds: 0,
    });

    //Validate the created date object
    if (!isValid(dateObject)) {
      throw new Error("Wrong time format. Expected: HH:mm");
    }

    if (dateObject.getTime() > Date.now()) {
      // If the selected time is in the future, throw an error
      throw new Error(
        "Are you walking your dog in the future? Pick the present time or some time before that!",
      );
    }

    //return the timestamp (milliseconds since epoch) for the created date object
    return getTime(dateObject);
  };

  //function that is called when the user has selected walk duration. It adds the walk to history, starts the countdown for the next walk and closes the app drawer.
  const handleCompleteWalk = (minutes: number) => {
    try {
      setError(null);
      const walkTimestamp = getTimestampFromTimeString(selectedTime);
      addWalk(minutes, walkTimestamp);
      startCountdown(walkTimestamp);
      appDrawer.close();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setSelectedTime(getCurrentTimeString()); //Reset the time input to the current time if there is an error
    }
  };

  //function to open the app drawer and snap it to the desired position when the user clicks the walk done button.
  const handleOpenDurationInput = () => {
    appDrawer.open();
    setTimeout(() => {
      appDrawer.snapTo(0.6); //Snap to 60% of the screen height
    }, 0);
  };

  return (
    <>
      <AppDrawer drawer={appDrawer}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          Finished walking at{" "}
          <Timepicker
            value={selectedTime}
            onChange={(time) => {
              setSelectedTime(time);
              setError(null);
            }}
          />
          {error && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "0.875rem",
                padding: "0.5rem",
                backgroundColor: "#fee2e2",
                borderRadius: "0.375rem",
              }}
            >
              {error}
            </div>
          )}
          How long was the walk?
          <Button variant="primary" onClick={() => handleCompleteWalk(15)}>
            15 minutes
          </Button>
          <Button variant="primary" onClick={() => handleCompleteWalk(30)}>
            30 minutes
          </Button>
          <Button variant="primary" onClick={() => handleCompleteWalk(45)}>
            45 minutes
          </Button>
        </div>
      </AppDrawer>
      <Button variant="fab" icon={Plus} onClick={handleOpenDurationInput}>
        Add walk
      </Button>
    </>
  );
};
