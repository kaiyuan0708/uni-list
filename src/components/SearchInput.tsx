interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  placeholder,
  onChange,
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder || ""}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
