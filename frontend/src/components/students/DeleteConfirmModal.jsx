import { Trash2 } from "lucide-react";

function DeleteConfirmModal({ studentName, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="delete-modal">
                <div className="delete-icon" aria-hidden="true">
                    <Trash2 size={34} />
                </div>

                <h2>Delete Student</h2>
                <p>
                    This will permanently delete <strong>{studentName}</strong>.
                    This action cannot be undone.
                </p>

                <div className="modal-actions">
                    <button className="secondary-button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="danger-button" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;
