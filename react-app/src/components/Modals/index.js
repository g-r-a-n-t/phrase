import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'

export function SimpleModal ({ children, isOpen, setOpen }) {
  const close = <button
    className="close"
    style={{ position: 'absolute', top: '15px', right: '15px' }}
    onClick={ () => setOpen(false) }
  >
    <IoIosClose size={32}/>
  </button>

  return (
    <Modal
      size="lg"
      isOpen={ isOpen }
      toggle={ () => setOpen(false) }
      external={ close }
    >
      <ModalBody>
        { children }
      </ModalBody>
    </Modal>
  )
}

SimpleModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export function Modalize ({ children, content }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <div onClick={ () => setOpen(true) } style={{ cursor: 'pointer' }}>
        { children }
      </div>
      <SimpleModal isOpen={ isOpen } setOpen={ setOpen }>
        { content }
      </SimpleModal>
    </>
  )
}

Modalize.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired
}
