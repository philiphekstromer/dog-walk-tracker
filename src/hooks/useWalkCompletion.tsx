import { useState } from "react";

type WalkCompletionProps = {
  startCountdown: () => void;
  addWalk: (date: number) => void;
};

export const useWalkCompletion = ({
  startCountdown,
  addWalk,
}: WalkCompletionProps) => {
  const [isDurationSettingsOpen, setIsDurationSettingsOpen] = useState(false); // State to control the visibility of the duration settings modal

  // Function to handle when the button to mark a walk as done is clicked
  const handleWalkDone = () => {
    setIsDurationSettingsOpen(true);
  };

  // Function add the walk to history and start the countdown for the next walk
  const completeWalk = (minutes: number) => {
    addWalk(minutes);

    startCountdown();

    setIsDurationSettingsOpen(false);
  };

  return { isDurationSettingsOpen, handleWalkDone, completeWalk };
};
