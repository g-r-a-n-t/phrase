import React from 'react'
import { IoIosClose } from 'react-icons/io'
import PropTypes from 'prop-types'
import {
  Modal, ModalBody
} from 'reactstrap'

export function SimpleModal ({ children, onDone }) {
  const close = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={ onDone }><IoIosClose size={32}/></button>

  return (
    <Modal isOpen={true} size="xl" toggle={ onDone } external={ close }>
      <ModalBody>
        { children }
      </ModalBody>
    </Modal>
  )
}

SimpleModal.propTypes = {
  children: PropTypes.element.isRequired,
  onDone: PropTypes.func.isRequired
}
