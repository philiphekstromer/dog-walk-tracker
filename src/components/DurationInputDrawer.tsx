import { useAppDrawer } from "../hooks/useAppDrawer";
import { AppDrawer } from "./AppDrawer";
import { Button } from "./Button";
import { Plus } from "lucide-react";
import { format, set, isValid, getTime } from "date-fns";
import { useState } from "react";
import { Timepicker } from "./Timepicker";

type DurationInputDrawerProps = {
  startCountdown: () => void;
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

  /**
   * Tar en tidssträng (t.ex. "14:30") och skapar en timestamp för IDAG.
   */
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
      throw new Error("Ogiltigt tidsformat. Förväntat format: HH:mm");
    }

    //return the timestamp (milliseconds since epoch) for the created date object
    return getTime(dateObject);
  };

  // Get the timestamp for the walk based on the selected time string
  const walkTimestamp = getTimestampFromTimeString(selectedTime);

  //function that is called when the user has selected walk duration. It adds the walk to history, starts the countdown for the next walk and closes the app drawer.
  const handleCompleteWalk = (minutes: number) => {
    addWalk(minutes, walkTimestamp);

    startCountdown();

    appDrawer.close();
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
          <Timepicker value={selectedTime} onChange={setSelectedTime} />
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
