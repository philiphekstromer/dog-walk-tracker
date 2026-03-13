import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { ReleaseNotesDrawer } from "./components/ReleaseNotesDrawer";
import { useWalks } from "./hooks/useWalks";
import { useCountdown } from "./hooks/useCountdown";
import {
  formatWalkDate,
  formatCountdownTime,
} from "./utilities/FormatDateAndTime";
import { DurationInputDrawer } from "./components/DurationInputDrawer";
import { Button } from "./components/Button";
import { Trash2 } from "lucide-react";
import { Header } from "./components/Header";

function App() {
  // --- STATES ---

  // State for settings
  const [intervalHours, setIntervalHours] = useState<number>(() => {
    const stored = localStorage.getItem("intervalHours");
    return stored ? Number(stored) : 6;
  });

  //State for countdown logic
  const [nextWalkTime, setNextWalkTime] = useState<number | null>(() => {
    const stored = localStorage.getItem("nextWalkTime");
    return stored ? Number(stored) : null;
  });

  // --- STORAGE ---

  // Persist storage of the interval between walks
  useEffect(() => {
    localStorage.setItem("intervalHours", String(intervalHours));
  }, [intervalHours]);

  // Persistant storage of the next walk time
  useEffect(() => {
    if (nextWalkTime) {
      localStorage.setItem("nextWalkTime", String(nextWalkTime));
    } else {
      localStorage.removeItem("nextWalkTime");
    }
  }, [nextWalkTime]);

  // --- APP LOGIC ---

  const { startCountdown, remainingTime, status } = useCountdown({
    intervalHours,
    nextWalkTime,
    setNextWalkTime,
  }); //Custom hook to manage the countdown logic for the next walk

  const { walks, addWalk, deleteWalk } = useWalks(); // Custom hook to manage walk history

  // Set status to idle when there are no walks in history. This is to reset the app to the initial state after all walks have been deleted.
  useEffect(() => {
    if (walks.length === 0 && nextWalkTime !== null) {
      setNextWalkTime(null);
    }
  }, [walks, nextWalkTime]);

  //--- RENDER ---
  return (
    <>
      <ReleaseNotesDrawer
        snapHeightPercent={0.4}
        version="0.2.0"
        content={
          <>
            <ul>
              <li>
                Added a drawer for settings and walk duration. It's the drawer
                you're seeing now!
              </li>
              <li>
                Made a better Toggle Button for setting time between walks.
              </li>
            </ul>
          </>
        }
      />
      <div className={styles.mainContainer}>
        <Header
          intervalHours={intervalHours}
          onChangeInterval={setIntervalHours}
        />
        {status === "active" && remainingTime !== null ? (
          <h2>{formatCountdownTime(remainingTime)}</h2>
        ) : status === "expired" ? (
          <h2>Time for a walk!</h2>
        ) : status === "idle" ? (
          <h3>Ready to start tracking walks!</h3>
        ) : null}

        <h2>Walk history</h2>
        <div className={styles.historyList}>
          {walks.map((walk) => (
            <div key={walk.id} className={styles.historyCard}>
              {walk.minutes} min {formatWalkDate(walk.createdAt)}
              <Button
                variant="icon"
                icon={Trash2}
                onClick={() => deleteWalk(walk.id)}
              ></Button>
            </div>
          ))}
        </div>
        <DurationInputDrawer
          startCountdown={startCountdown}
          addWalk={addWalk}
        />
      </div>
    </>
  );
}

export default App;
