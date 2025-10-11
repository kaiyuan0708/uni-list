import { useState } from "react";
import type { University } from "../api/universityApi";
import { useFavorites } from "../context/FavoritesContext";
import { Button } from "./Button";
import { RemarkModal } from "./RemarkModal";
import styles from "./UniversityItem.module.css";

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
    <li className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{university.name}</h3>
        <span className={styles.country}>{university.country}</span>
      </div>

      <div className={styles.body}>
        {university.web_pages.map((web) => (
          <a
            key={web}
            href={web}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Visit Website
          </a>
        ))}
      </div>

      <div className={styles.actions}>
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
