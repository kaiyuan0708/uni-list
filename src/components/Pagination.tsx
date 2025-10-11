import { Button } from "./Button";

interface PaginationProps {
  page: number;
  hasNext: boolean;
  hasPrev?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Simple reusable pagination control.
 */
export function Pagination({
  page,
  hasNext,
  hasPrev = page > 0,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "16px",
      }}
    >
      <Button title="Previous" disabled={!hasPrev} onClick={onPrev} />
      <span style={{ minWidth: 60, textAlign: "center" }}>Page {page + 1}</span>
      <Button title="Next" disabled={!hasNext} onClick={onNext} />
    </div>
  );
}
