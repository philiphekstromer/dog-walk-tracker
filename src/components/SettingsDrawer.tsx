import { useAppDrawer } from "../hooks/useAppDrawer";
import { AppDrawer } from "./AppDrawer";

type SettingsDrawerProps = {
  intervalHours: number;
  onChangeInterval: (hours: number) => void;
};

export const SettingsDrawer = ({
  intervalHours,
  onChangeInterval,
}: SettingsDrawerProps) => {
  const appDrawer = useAppDrawer();

  const handleButtonPress = () => {
    appDrawer.open();
    //wait for the bottom sheet to open before snapping to the desired position. This ensures that the snapTo function is called after the bottom sheet has been rendered and is ready to be manipulated.
    setTimeout(() => {
      appDrawer.snapTo(0.7); // Snap to 50% of the screen height
    }, 0);
  };

  return (
    <>
      <AppDrawer drawer={appDrawer}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          Set interval between walks:
          <button
            style={{
              backgroundColor: intervalHours === 4 ? "#1a1a1a" : "#ccc",
            }}
            onClick={() => onChangeInterval(4)}
          >
            4
          </button>
          <button
            style={{
              backgroundColor: intervalHours === 6 ? "#1a1a1a" : "#ccc",
            }}
            onClick={() => onChangeInterval(6)}
          >
            6
          </button>
        </div>
      </AppDrawer>
      <button onClick={handleButtonPress}>Settings</button>
    </>
  );
};
