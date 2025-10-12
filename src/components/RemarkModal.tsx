import { useState } from "react";
import { Button } from "./Button";
import { TextArea } from "./TextArea";
import styles from "./RemarkModal.module.css";

interface RemarkModalProps {
  initialRemark?: string;
  onSave: (remark: string) => void;
  onCancel: () => void;
}

export function RemarkModal({
  initialRemark = "",
  onSave,
  onCancel,
}: RemarkModalProps) {
  const [remark, setRemark] = useState(initialRemark);

  return (
    <div className={styles.remarkModalOverlay}>
      <div className={styles.remarkModalBox}>
        <h3 className={styles.remarkModalTitle}>Add Remark</h3>
        <TextArea
          value={remark}
          onChange={setRemark}
          rows={4}
          placeholder="Enter your remark..."
        />
        <div className={styles.remarkModalActions}>
          <Button title="Cancel" onClick={onCancel} />
          <Button title="Save" onClick={() => onSave(remark)} />
        </div>
      </div>
    </div>
  );
}
