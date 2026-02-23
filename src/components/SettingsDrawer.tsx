type SettingsDrawerProps = {
  intervalHours: number;
  onChangeInterval: (hours: number) => void;
};

export const SettingsDrawer = ({
  intervalHours,
  onChangeInterval,
}: SettingsDrawerProps) => {
  return (
    //This should be a drawer, but for simplicity, it's currently just a card with buttons. Will be replaced with a proper drawer in the future.
    <div className="card">
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
    </div>
  );
};
