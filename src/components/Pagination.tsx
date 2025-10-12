import clsx from "clsx";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  hasPrev?: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export function Pagination({
  page,
  hasPrev = page > 0,
  hasNext,
  onPrev,
  onNext,
  className,
}: PaginationProps) {
  return (
    <nav className={clsx(styles.container, className)} aria-label="Pagination">
      <button
        type="button"
        className={clsx(styles.button, !hasPrev && styles.disabled)}
        disabled={!hasPrev}
        onClick={onPrev}
      >
        ← Previous
      </button>

      <span className={styles.pageInfo} aria-live="polite">
        Page {page + 1}
      </span>

      <button
        type="button"
        className={clsx(styles.button, !hasNext && styles.disabled)}
        disabled={!hasNext}
        onClick={onNext}
      >
        Next →
      </button>
    </nav>
  );
}
