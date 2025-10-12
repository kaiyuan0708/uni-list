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
    <li className={styles.item}>
      <div className={styles.info}>
        <strong>{name}</strong> — {country}
      </div>

      <div className={styles.remark}>
        <em>Remark:</em> {remark || "(none)"}
      </div>

      <div className={styles.date}>
        Added on{" "}
        {new Date(added_time).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <div className={styles.actions}>
        <Button
          disabled={false}
          title="Edit Remark"
          onClick={() => setIsEditing(true)}
        />
        <Button
          disabled={false}
          title="Remove"
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
    </li>
  );
}
