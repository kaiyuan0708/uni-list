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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Add Remark</h3>
        <TextArea
          value={remark}
          onChange={setRemark}
          rows={4}
          placeholder="Enter your remark..."
        />
        <div className={styles.actions}>
          <Button title="Cancel" disabled={false} onClick={onCancel} />
          <Button title="Save" disabled={false} onClick={() => onSave(remark)} />
        </div>
      </div>
    </div>
  );
}
