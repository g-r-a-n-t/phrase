import React from 'react'
import { IoIosClose } from 'react-icons/io'
import {
  Modal, ModalBody
} from 'reactstrap';

export function SimpleModal ({ onDone, children }) {
  const close = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={ onDone }><IoIosClose size={32}/></button>

  return (
    <Modal isOpen={true} size="lg" toggle={ onDone } external={ close }>
      <ModalBody>
        { children }
      </ModalBody>
    </Modal>
  )
}
