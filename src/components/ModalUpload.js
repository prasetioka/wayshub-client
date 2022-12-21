import React from "react"
import Modal from "react-bootstrap/Modal"

function ModalUpload({ show, hide }) {
  return (
    <Modal
      show={show}
      onHide={hide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="bg-secondary">
        <h4 className="text-center m-0 px-5 py-4 text-white">
          Uploading Files, Please Wait...
        </h4>
      </Modal.Body>
    </Modal>
  )
}

export default ModalUpload