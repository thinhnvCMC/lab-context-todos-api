import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsTodoItemChange from '@/forms/todos/TodoItemForm'

const ModalsTodoItemCreate = ({ close, onSubmit, title, initialValues }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsTodoItemChange initialValues={initialValues} onSubmit={onSubmit} />
    </Modal.Body>
  </Modal>
)
ModalsTodoItemCreate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.shape
}

ModalsTodoItemCreate.defaultProps = {
  initialValues: {
    TodoItems: [
      {
        name: '',
        checked: false
      }
    ]
  }
}
export default ModalsTodoItemCreate
