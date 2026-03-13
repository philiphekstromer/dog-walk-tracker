import { SettingsDrawer } from "./SettingsDrawer";
import styles from "./Header.module.css";

type HeaderProps = {
  intervalHours: number;
  onChangeInterval: (hours: number) => void;
};

export const Header = ({ intervalHours, onChangeInterval }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <h1>Dog Walk Timer</h1>
      <SettingsDrawer
        intervalHours={intervalHours}
        onChangeInterval={onChangeInterval}
      />
    </div>
  );
};
