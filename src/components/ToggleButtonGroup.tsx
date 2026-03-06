import styles from "./ToggleButtonGroup.module.css";

type ToggleButtonGroupProps = {
  activeValue: number;
  onSelect: (value: number) => void;
  options?: number[];
  unit?: string;
};

const ToggleButtonGroup = ({
  activeValue,
  onSelect,
  options = [4, 6, 8],
  unit = "h",
}: ToggleButtonGroupProps) => {
  return (
    <div className={styles.container}>
      {options.map((value) => {
        // Determine if this specific button is active
        const isActive = activeValue === value;

        // Combine classes: always use .toggleButton,
        // add .active only if isActive is true.
        const buttonClass = `${styles.toggleButton} ${isActive ? styles.active : ""}`;

        return (
          <button
            key={value}
            className={buttonClass}
            onClick={() => onSelect(value)}
          >
            {value}
            {unit}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleButtonGroup;
