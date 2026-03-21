type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Timepicker = ({ value, onChange }: TimePickerProps) => {
  return (
    <input
      aria-label="Time"
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
