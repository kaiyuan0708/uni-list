import { useState } from "react";
import { Button } from "./Button";
import { RemarkModal } from "./RemarkModal";
import styles from "./FavoritesItem.module.css";

interface FavoriteItemProps {
  name: string;
  country: string;
  remark?: string;
  added_time: number;
  onRemove: (name: string) => void;
  onSaveRemark: (name: string, remark: string) => void;
}

export function FavoritesItem({
  name,
  country,
  remark,
  added_time,
  onRemove,
  onSaveRemark,
}: FavoriteItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newRemark: string) => {
    onSaveRemark(name, newRemark);
    setIsEditing(false);
  };

  return (
    <article className={styles.favItemCard}>
      <header className={styles.favItemHeader}>
        <h3 className={styles.favItemName}>{name}</h3>
        <span className={styles.favItemCountry}>{country}</span>
      </header>

      <p className={styles.favItemRemark}>
        <strong>Remark:</strong> <span>{remark?.trim() || "(none)"}</span>
      </p>

      <p className={styles.favItemDate}>
        Added on{" "}
        {new Date(added_time).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div className={styles.favItemActions}>
        <Button
          title="Edit Remark"
          disabled={false}
          onClick={() => setIsEditing(true)}
        />
        <Button
          title="Remove"
          variant="danger"
          disabled={false}
          onClick={() => onRemove(name)}
        />
      </div>

      {isEditing && (
        <RemarkModal
          initialRemark={remark}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </article>
  );
}
