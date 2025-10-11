import styles from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps {
  title: string;
  disabled: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  title,
  disabled = false,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        disabled && styles.disabled
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
