import { useState, useEffect } from "react";
import "./App.css";
import { SettingsDrawer } from "./components/SettingsDrawer";

const STORAGE_KEY = "dog-walk-next"; //Key to store the next walk time in localStorage

function App() {
  // ----- STATE --------
  // State for settings
  const [intervalHours, setIntervalHours] = useState<number>(() => {
    const stored = localStorage.getItem("intervalHours");
    return stored ? Number(stored) : 6;
  });

  //State for countdown logic
  const [now, setNow] = useState(Date.now);

  const [nextWalkTime, setNextWalkTime] = useState<number | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : null;
  });

  // ----- STORAGE --------

  // Persist storage of the interval between walks
  useEffect(() => {
    localStorage.setItem("intervalHours", String(intervalHours));
  }, [intervalHours]);

  // Persistant storage of the next walk time
  useEffect(() => {
    if (nextWalkTime) {
      localStorage.setItem(STORAGE_KEY, String(nextWalkTime));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [nextWalkTime]);

  // --------

  // ----- COUNTDOWN -----

  // Make countdown tick every second
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // Format the time into hours and minutes
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const remainingTime = nextWalkTime ? nextWalkTime - now : null; // Calculate remaining time until the next walk

  const isActiveWalk = remainingTime !== null && remainingTime > 0; // Check if there's an active countdown

  const TIME_BETWEEN_WALKS = intervalHours * 60 * 60 * 1000; // Convert hours to milliseconds

  // Start a new countdown for the next walk
  const startCountdown = () => {
    const nextWalk = Date.now() + TIME_BETWEEN_WALKS;
    setNextWalkTime(nextWalk);
  };

  // --------

  return (
    <>
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>Dog Walk Timer</h1>

        <SettingsDrawer
          intervalHours={intervalHours}
          onChangeInterval={setIntervalHours}
        />

        {isActiveWalk ? (
          <h2>{formatTime(remainingTime)}</h2>
        ) : (
          <h2>No active countdown</h2>
        )}

        <button onClick={startCountdown}>Done walking</button>
      </div>
    </>
  );
}

export default App;
