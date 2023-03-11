import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  GlobalStyles,
  Layout,
  Searchbar,
  ImageGallry,
  Button,
  Loader,
} from 'components';
import { fetchImages } from 'services';
import { errorToast } from 'helpers';

export const App = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abotrController = new AbortController();

    if (query === '') {
      return;
    }

    setError(null);
    setIsLoading(true);
    async function getImages() {
      try {
        const { hits: incomeImages, totalHits: totalImages } =
          await fetchImages(query, page, abotrController);
        if (totalImages < 1) {
          errorToast('Nothing was found... Try againe');
        } else {
          setImages(prevImages => [...prevImages, ...incomeImages]);
          setTotalImages(totalImages);
        }
      } catch (error) {
        setError(error);
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();

    return () => {
      abotrController.abort();
    };
  }, [page, query]);

  const onFormSubmit = incomingQuery => {
    if (incomingQuery === query) {
      return;
    }

    setQuery(incomingQuery);
    setImages([]);
    setPage(1);
    setTotalImages(null);
    setError(null);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Toaster />
      <GlobalStyles />
      <header className="header">
        <Searchbar onFormSubmit={onFormSubmit} />
      </header>
      <main>
        <Layout>
          <h1 className="visually-hidden">Image-finder</h1>
          <ImageGallry images={images} />
          {images.length < totalImages && <Button loadMore={onLoadMore} />}
          {isLoading && <Loader />}
          {error &&
            errorToast(
              'Something went wrong... Please try againe later and check error type in console!'
            )}
        </Layout>
      </main>
    </>
  );
};
