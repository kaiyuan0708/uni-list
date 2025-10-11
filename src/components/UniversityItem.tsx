import { useState } from "react";
import type { University } from "../api/universityApi";
import { useFavorites } from "../context/FavoritesContext";
import { Button } from "./Button";
import { RemarkModal } from "./RemarkModal";

interface UniversityItemProps {
  university: University;
}

export function UniversityItem({ university }: UniversityItemProps) {
  const { favorites, addFavorite, removeFavorite, updateRemark } =
    useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const favorite = favorites.find((f) => f.name === university.name);
  const isFavorite = Boolean(favorite);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(university.name);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSaveRemark = (remark: string) => {
    if (!isFavorite) {
      addFavorite({
        name: university.name,
        country: university.country,
        remark,
      });
    } else {
      updateRemark(university.name, remark);
    }
    setIsModalOpen(false);
  };

  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
        listStyle: "none",
      }}
    >
      <div>
        <p>
          <strong>{university.name}</strong>
        </p>
        <p>{university.country}</p>

        {university.web_pages.map((web) => (
          <p key={web}>
            <a href={web} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </p>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <Button
          disabled={false}
          title={isFavorite ? "⭐ Remove Favorite" : "☆ Add Favorite"}
          onClick={handleToggleFavorite}
        />
        {isFavorite && (
          <Button
            disabled={false}
            title="Edit Remark"
            onClick={() => setIsModalOpen(true)}
          />
        )}
      </div>

      {isModalOpen && (
        <RemarkModal
          initialRemark={favorite?.remark}
          onSave={handleSaveRemark}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </li>
  );
}
