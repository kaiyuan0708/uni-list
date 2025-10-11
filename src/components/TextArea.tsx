import styles from "./TextArea.module.css";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: TextAreaProps) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
    />
  );
}
