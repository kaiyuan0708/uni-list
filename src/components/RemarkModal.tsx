import { useState } from "react";
import { Button } from "./Button";

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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "16px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>Add Remark</h3>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          rows={4}
          style={{ width: "100%", marginBottom: "8px" }}
        />
        <div style={{ textAlign: "right" }}>
          <Button disabled={false} title="Cancel" onClick={onCancel} />
          <Button
            disabled={false}
            title="Save"
            onClick={() => onSave(remark)}
          />
        </div>
      </div>
    </div>
  );
}
