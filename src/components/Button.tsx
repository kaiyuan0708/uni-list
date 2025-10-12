import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export function Button({
  title,
  disabled = false,
  onClick,
  variant = "primary",
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
