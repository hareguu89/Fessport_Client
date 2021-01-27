import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ArtistListContainer from '../containers/ArtistListContainer';

const ArtistListPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <ArtistListContainer />;
};

export default withRouter(ArtistListPage);
