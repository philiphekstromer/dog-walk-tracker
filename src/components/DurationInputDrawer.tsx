import { useAppDrawer } from "../hooks/useAppDrawer";
import { AppDrawer } from "./AppDrawer";
import Button from "./Button";

type DurationInputDrawerProps = {
  startCountdown: () => void;
  addWalk: (date: number) => void;
};

export const DurationInputDrawer = ({
  startCountdown,
  addWalk,
}: DurationInputDrawerProps) => {
  const appDrawer = useAppDrawer();

  //function that is called when the user has selected walk duration. It adds the walk to history, starts the countdown for the next walk and closes the app drawer.
  const handleCompleteWalk = (minutes: number) => {
    addWalk(minutes);

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
          How long was the walk?
          <button onClick={() => handleCompleteWalk(15)}>15 minutes</button>
          <button onClick={() => handleCompleteWalk(30)}>30 minutes</button>
          <button onClick={() => handleCompleteWalk(45)}>45 minutes</button>
        </div>
      </AppDrawer>
      <Button variant="primary" onClick={handleOpenDurationInput}>
        Walk done
      </Button>
    </>
  );
};
