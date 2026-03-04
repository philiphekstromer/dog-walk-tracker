import { BottomSheet, useBottomSheet } from "@plainsheet/react";

type SettingsDrawerProps = {
  intervalHours: number;
  onChangeInterval: (hours: number) => void;
};

export const SettingsDrawer = ({
  intervalHours,
  onChangeInterval,
}: SettingsDrawerProps) => {
  const bottomSheet = useBottomSheet({
    rootStyle: { backgroundColor: "transparent" },
    backdropColor: "rgba(0, 0, 0, 0.4)",
  });

  const handleButtonPress = () => {
    bottomSheet.open();
    //wait for the bottom sheet to open before snapping to the desired position. This ensures that the snapTo function is called after the bottom sheet has been rendered and is ready to be manipulated.
    setTimeout(() => {
      bottomSheet.snapTo(0.5); // Snap to 50% of the screen height
    }, 0);
  };

  return (
    <>
      <BottomSheet {...bottomSheet.props}>
        Set interval between walks:
        <button
          style={{
            padding: "0.25rem 0.5rem",
            backgroundColor: intervalHours === 4 ? "#1a1a1a" : "#ccc",
          }}
          onClick={() => onChangeInterval(4)}
        >
          4
        </button>
        <button
          style={{
            padding: "0.25rem 0.5rem",
            backgroundColor: intervalHours === 6 ? "#1a1a1a" : "#ccc",
          }}
          onClick={() => onChangeInterval(6)}
        >
          6
        </button>
      </BottomSheet>
      <button onClick={handleButtonPress}>Settings</button>
    </>
  );
};
