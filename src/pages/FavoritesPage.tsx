import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Button } from "../components/Button";
import { RemarkModal } from "../components/RemarkModal";

export function FavoritesPage() {
  const { favorites, removeFavorite, updateRemark } = useFavorites();
  const [editing, setEditing] = useState<string | null>(null);
  return (
    <div>
      <p>Favorites Page</p>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.name} style={{ marginBottom: "12px" }}>
            <strong>{fav.name}</strong> - {fav.country}
            <div>
              <p>
                <em>Remark:</em> {fav.remark || "(none)"}
              </p>
              <p>
                Added on{" "}
                {new Date(fav.added_time).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
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
                onSave={(remark) => {
                  updateRemark(fav.name, remark);
                  setEditing(null);
                }}
                onCancel={() => setEditing(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
