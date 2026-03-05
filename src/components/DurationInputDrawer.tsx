import { useAppDrawer } from "../hooks/useAppDrawer";
import { useWalkCompletion } from "../hooks/useWalkCompletion";
import { AppDrawer } from "./AppDrawer";
import { useEffect } from "react";

type DurationInputDrawerProps = {
  startCountdown: () => void;
  addWalk: (date: number) => void;
};

export const DurationInputDrawer = ({
  startCountdown,
  addWalk,
}: DurationInputDrawerProps) => {
  const appDrawer = useAppDrawer();

  const { isDurationSettingsOpen, handleWalkDone, completeWalk } =
    useWalkCompletion({
      startCountdown,
      addWalk,
    }); // Custom hook to manage the logic when a walk is completed

  // Open/close bottom sheet when durationSettingsOpen state changes
  useEffect(() => {
    if (isDurationSettingsOpen) {
      appDrawer.open();
      //wait for the bottom sheet to open before snapping to the desired position. This ensures that the snapTo function is called after the bottom sheet has been rendered and is ready to be manipulated.
      setTimeout(() => {
        appDrawer.snapTo(0.6); // Snap to 50% of the screen height
      }, 0);
    } else {
      appDrawer.close();
    }
  }, [isDurationSettingsOpen, appDrawer]);

  return (
    <>
      <AppDrawer drawer={appDrawer}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          How long was the walk?
          <button onClick={() => completeWalk(15)}>15 minutes</button>
          <button onClick={() => completeWalk(30)}>30 minutes</button>
          <button onClick={() => completeWalk(45)}>45 minutes</button>
        </div>
      </AppDrawer>
      <button onClick={handleWalkDone}>Walk done</button>
    </>
  );
};
