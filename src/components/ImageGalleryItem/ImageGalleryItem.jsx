import PropTypes from 'prop-types';
import { useState } from 'react';
import { Image } from './ImageGalleryItem.styled';
import { Modal } from 'components';

const html = document.querySelector('html');

export const ImageGalleryItem = ({
  imageData: { tags, webformatURL, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    html.classList.add('modalOpen');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    html.classList.remove('modalOpen');
  };

  return (
    <>
      <Image src={webformatURL} alt={tags} onClick={handleOpenModal} />
      {isModalOpen && (
        <Modal closeModal={handleCloseModal} src={largeImageURL} alt={tags} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
};
