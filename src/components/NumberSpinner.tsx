import { Button } from "./Button";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import styles from "./NumberSpinner.module.css";

type NumberSpinnerProps = {
  value: number;
  min: number;
  max: number;
  onUpdate: (newValue: number) => void;
};

export const NumberSpinner = ({
  value,
  min,
  max,
  onUpdate,
}: NumberSpinnerProps) => {
  const increment = () => {
    if (value < max) onUpdate(value + 5);
  };

  const decrement = () => {
    if (value > min) onUpdate(value - 5);
  };

  return (
    <div className={styles.numberspinner}>
      <Button variant="icon" onClick={decrement}>
        <Minus />
      </Button>
      <input
        className={styles.input}
        type="number"
        value={value}
        onChange={(e) => onUpdate(Number(e.target.value))}
      />
      <Button variant="icon" onClick={increment}>
        <Plus />
      </Button>
    </div>
  );
};
