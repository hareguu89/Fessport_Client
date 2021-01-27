import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ArtistDetailContainer from '../containers/ArtistDetailContainer';

const ArtistDetailPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <ArtistDetailContainer />;
};

export default withRouter(ArtistDetailPage);
