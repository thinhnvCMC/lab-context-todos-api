import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsTodoChange from '@/forms/todos/TodoForm'

const ModalsTodoCreate = ({ close, onSubmit, title, initialValues }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsTodoChange initialValues={initialValues} onSubmit={onSubmit} />
    </Modal.Body>
  </Modal>
)
ModalsTodoCreate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.shape
}

ModalsTodoCreate.defaultProps = {
  initialValues: {
    title: ''
  }
}

export default ModalsTodoCreate
