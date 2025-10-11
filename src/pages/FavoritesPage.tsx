import { useState, useMemo } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Button } from "../components/Button";
import { RemarkModal } from "../components/RemarkModal";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 5;

export function FavoritesPage() {
  const { favorites, removeFavorite, updateRemark } = useFavorites();
  const [editing, setEditing] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const paginated = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return favorites.slice(start, end);
  }, [favorites, page]);

  const hasNext = (page + 1) * ITEMS_PER_PAGE < favorites.length;

  const handleSaveRemark = (name: string, remark: string) => {
    updateRemark(name, remark);
    setEditing(null);
  };

  return (
    <div>
      <p>Favorites Page</p>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <>
          <ul style={{ padding: 0 }}>
            {paginated.map((fav) => (
              <li
                key={fav.name}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                  listStyle: "none",
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <strong>{fav.name}</strong> — {fav.country}
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <em>Remark:</em> {fav.remark || "(none)"}
                </div>

                <div style={{ fontSize: "12px", color: "#666" }}>
                  Added on{" "}
                  {new Date(fav.added_time).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                  <Button
                    disabled={false}
                    title="Edit Remark"
                    onClick={() => setEditing(fav.name)}
                  />
                  <Button
                    disabled={false}
                    title="Remove"
                    onClick={() => removeFavorite(fav.name)}
                  />
                </div>

                {editing === fav.name && (
                  <RemarkModal
                    initialRemark={fav.remark}
                    onSave={(remark) => handleSaveRemark(fav.name, remark)}
                    onCancel={() => setEditing(null)}
                  />
                )}
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            hasNext={hasNext}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => (hasNext ? p + 1 : p))}
          />
        </>
      )}
    </div>
  );
}
