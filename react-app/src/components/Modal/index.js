import React from 'react'
import { IoIosClose } from 'react-icons/io'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'

export function SimpleModal ({ children, width = '800px', onDone }) {
  const close = <button
      className="close"
      style={{ position: 'absolute', top: '15px', right: '15px' }}
      onClick={ onDone }
    >
      <IoIosClose size={32}/>
    </button>

  return (
    <Modal
      size="xl"
      isOpen={ true }
      toggle={ onDone }
      external={ close }
      style={{ width: width }}
    >
      <ModalBody>
        { children }
      </ModalBody>
    </Modal>
  )
}

SimpleModal.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired
}
