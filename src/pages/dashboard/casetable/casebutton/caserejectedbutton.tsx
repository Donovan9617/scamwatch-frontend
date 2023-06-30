import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const CaseRejectedButton: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean | undefined>(
    false
  );
  const handleReject: () => void = () => {
    setShowConfirmation(true);
  };
  const handleConfirmReject: () => void = () => {
    // Send API to the backend to update the status of the case to Rejected
    setShowConfirmation(false);
  };
  const handleCloseConfirmation: () => void = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button onClick={handleReject} variant="danger" size="sm">
        Reject
      </Button>
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reject</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reject this case?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmReject}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
