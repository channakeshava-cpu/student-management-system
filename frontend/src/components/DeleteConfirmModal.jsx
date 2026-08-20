import { Trash2 } from "lucide-react";

function DeleteConfirmModal({ studentName, onConfirm, onCancel }) {

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <div className="delete-icon">
                    <Trash2 size={40}/>
                </div>

                <h2>Delete Student</h2>

                <p>
                    Are you sure you want to delete
                    <strong> {studentName}</strong>?
                </p>

                <div className="delete-actions">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm-delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteConfirmModal;