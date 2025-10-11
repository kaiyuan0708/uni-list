interface ButtonProps {
  title: string;
  disabled: boolean;
  onClick?: () => void;
}

export function Button({ title, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
}
