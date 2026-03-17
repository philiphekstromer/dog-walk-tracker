import styles from "./Card.module.css";
import clsx from "clsx";

export type CardProps = {
  children: React.ReactNode;
  variant?: "list";
};

export const Card = ({ children, variant = "list" }: CardProps) => (
  <div className={clsx(styles.card, variant === "list" && styles.listCard)}>
    {children}
  </div>
);
