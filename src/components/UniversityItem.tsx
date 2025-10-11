import type { University } from "../api/universityApi";
import { useFavorites } from "../context/FavoritesContext";
import { Button } from "./Button";
import { useState } from "react";
import { RemarkModal } from "./RemarkModal";

interface UniversityItemProps {
  university: University;
}

export function UniversityItem({ university }: UniversityItemProps) {
  const { favorites, addFavorite, removeFavorite, updateRemark } =
    useFavorites();
  const [showModal, setShowModal] = useState(false);

  const fav = favorites.find((f) => f.name === university.name);
  const isFavorite = !!fav;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(university.name);
    } else {
      setShowModal(true);
      // addFavorite({ name: university.name, country: university.country });
    }
  };

  return (
    <li>
      <p>name: {university.name}</p>
      <p>country: {university.country}</p>
      {university.web_pages.map((web) => (
        <p>
          <a href={web} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        </p>
      ))}
      <div>
        <Button
          disabled={false}
          title={isFavorite ? "⭐ Remove Favorite" : "☆ Add Favorite"}
          onClick={handleToggleFavorite}
        />
        {isFavorite && (
          <Button
            disabled={false}
            title="Edit Remark"
            onClick={() => setShowModal(true)}
          />
        )}
        {showModal && (
          <RemarkModal
            initialRemark={fav?.remark}
            onSave={(remark) => {
              if (!isFavorite)
                addFavorite({
                  name: university.name,
                  country: university.country,
                  remark,
                });
              else updateRemark(university.name, remark);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </li>
  );
}
