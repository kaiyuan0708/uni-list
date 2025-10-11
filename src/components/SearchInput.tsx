import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  withIcon?: boolean;
}

export function SearchInput({
  value,
  placeholder = "Search...",
  onChange,
  withIcon = true,
}: SearchInputProps) {
  return (
    <div className={styles.container}>
      {withIcon && <span className={styles.icon}>🔍</span>}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}