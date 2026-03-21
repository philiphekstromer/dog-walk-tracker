import styles from "./Progress.module.css";

export type ProgressProps = {
  value: number;
  max: number;
};

export const Progress = ({ value, max }: ProgressProps) => {
  return <progress value={value} max={max} className={styles.progressBar} />;
};
