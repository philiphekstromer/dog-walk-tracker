import { useState, useEffect } from "react";
import "./App.css";
import { SettingsDrawer } from "./components/SettingsDrawer";
import { useWalks } from "./hooks/useWalks";
import { useCountdown } from "./hooks/useCountdown";
import {
  formatWalkDate,
  formatCountdownTime,
} from "./utilities/FormatDateAndTime";
import { useWalkCompletion } from "./hooks/useWalkCompletion";

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

  // --- COUNTDOWN ---
  const { startCountdown, remainingTime, status } = useCountdown({
    intervalHours,
    nextWalkTime,
    setNextWalkTime,
  });

  // --- WALK HISTORY ---

  const { walks, addWalk, deleteWalk } = useWalks(); // Custom hook to manage walk history

  //--- APP LOGIC ---
  const { isDurationSettingsOpen, handleWalkDone, completeWalk } =
    useWalkCompletion({
      startCountdown,
      addWalk,
    }); // Custom hook to manage the logic when a walk is completed

  //--- RENDER ---
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          height: "90dvh",
        }}
      >
        <h1>Dog Walk Timer</h1>
        <SettingsDrawer
          intervalHours={intervalHours}
          onChangeInterval={setIntervalHours}
        />
        {status === "active" && remainingTime !== null ? (
          <h2>{formatCountdownTime(remainingTime)}</h2>
        ) : status === "expired" ? (
          <h2>Time for a walk!</h2>
        ) : status === "idle" ? (
          <h2>Ready to start tracking walks!</h2>
        ) : null}

        <h2>Walk history</h2>
        <div
          style={{
            display: "flex",
            flex: 1,
            overflowY: "auto",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "stretch",
          }}
        >
          {walks.map((walk) => (
            <div key={walk.id} className="history-card">
              {walk.minutes} min {formatWalkDate(walk.createdAt)}
              <button
                style={{
                  background: "red",
                  color: "white",
                  padding: "0.25rem",
                }}
                onClick={() => deleteWalk(walk.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {isDurationSettingsOpen && (
          <div className="card">
            How long was the walk?
            <button onClick={() => completeWalk(15)}>15 minutes</button>
            <button onClick={() => completeWalk(30)}>30 minutes</button>
            <button onClick={() => completeWalk(45)}>45 minutes</button>
          </div>
        )}
        <button onClick={handleWalkDone}>Done walking</button>
      </div>
    </>
  );
}

export default App;
