import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  hasPrev?: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, hasPrev = page > 0, hasNext, onPrev, onNext }: PaginationProps) {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={onPrev}
      >
        ← Previous
      </button>

      <span className={styles.pageInfo}>Page {page + 1}</span>

      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={onNext}
      >
        Next →
      </button>
    </div>
  );
}
