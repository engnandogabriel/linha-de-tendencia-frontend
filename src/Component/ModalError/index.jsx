import React from "react";
import { Modal, Alert } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa"; // Ícone de Exclamação

const ModalError = ({ showModal, setShowModal, message }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      dialogClassName="modal-error" // Estilo customizado
    >
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <FaExclamationCircle style={{ marginRight: "10px" }} />
          Erro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Alert variant="danger">{message}</Alert>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalError;
