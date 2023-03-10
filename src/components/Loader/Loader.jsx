import { FidgetSpinner } from 'react-loader-spinner';
import { SpinnerContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <SpinnerContainer>
      <FidgetSpinner
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#F4442E"
      />
    </SpinnerContainer>
  );
};
