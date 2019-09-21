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

SimpleModal.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired
}
