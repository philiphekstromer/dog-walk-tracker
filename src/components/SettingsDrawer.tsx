import { useAppDrawer } from "../hooks/useAppDrawer";
import { AppDrawer } from "./AppDrawer";
import ToggleButton from "./ToggleButtonGroup";

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
      appDrawer.snapTo(0.7); // Snap to 70% of the screen height
    }, 0);
  };

  return (
    <>
      <AppDrawer drawer={appDrawer}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          Set interval between walks:
          <ToggleButton
            activeValue={intervalHours}
            onSelect={onChangeInterval}
            options={[4, 6, 8]} // You can customize these options as needed
            unit="h"
          />
        </div>
      </AppDrawer>
      <button onClick={handleButtonPress}>Settings</button>
    </>
  );
};
