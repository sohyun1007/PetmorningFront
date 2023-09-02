import LayoutContainer from '../../../components/Layout/LayoutContainer';
import CreateLetterContainer from './CreateLetterContainer';

const Create = () => {
  return <LayoutContainer children={<CreateLetterContainer />} isMain={true} />;
};

export default Create;
