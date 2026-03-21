import styles from "./Timepicker.module.css";

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Timepicker = ({ value, onChange }: TimePickerProps) => {
  return (
    <input
      className={styles.timepicker}
      aria-label="Time"
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
