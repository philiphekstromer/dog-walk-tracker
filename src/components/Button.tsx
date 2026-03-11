import styles from "./Button.module.css";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface ButtonProps {
  icon?: LucideIcon;
  onClick: () => void;
  children?: React.ReactNode;
  variant: "primary" | "secondary" | "icon" | "fab";
}

export const Button = ({
  icon: IconComponent,
  onClick,
  children,
  variant = "primary",
}: ButtonProps) => (
  <button
    className={clsx(
      styles.button,
      variant === "primary" && styles.primary,
      variant === "secondary" && styles.secondary,
      variant === "icon" && styles.icon,
      variant === "fab" && styles.fab,
    )}
    onClick={onClick}
  >
    {IconComponent && <IconComponent size={20} />}
    {children}
  </button>
);
