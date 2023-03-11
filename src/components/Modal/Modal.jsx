import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, alt, src }) => {
  useEffect(() => {
    const onEscapeClick = e => {
      if (e.code !== 'Escape') {
        return;
      }
      closeModal();
    };

    window.addEventListener('keydown', onEscapeClick);

    return () => {
      window.removeEventListener('keydown', onEscapeClick);
    };
  }, [closeModal]);

  const onOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeModal();
  };

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalWindow>
        <img src={src} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
