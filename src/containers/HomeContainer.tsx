import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CountrySection from '../components/CountrySection';
import Loader from '../pages/Loader';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getMapDataAsync } from '../modules/map';

const HomeContainer = (): JSX.Element => {
  const { data, loading, error } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      console.log('🐸🐸🐸🐸 Map Data useEffect 🐸🐸🐸🐸');
      dispatch(getMapDataAsync.request());
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <p style={{ textAlign: 'center' }}>Error!!!</p>}
      {data && (
        <HomePresenter>
          <SubMapImage src={'/images/dots.png'} />
          <MapPresenter>
            <MapImage src={'/images/themapp.jpg'} />
            {/* <GridImage src={'/images/gridd.png'} /> */}
            {data.map((country) => (
              <CountrySection
                key={country._id}
                _id={country._id}
                name={country.name}
                y={country.y}
                x={country.x}
                flagImage={country.flagImage}
                festival={country.festival}
              />
            ))}
          </MapPresenter>
        </HomePresenter>
      )}
    </>
  );
};

const HomePresenter = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* margin-top: 50px; */
`;

const SubMapImage = styled.img`
  position: absolute;
  width: 1250px;
  height: 600px;
  z-index: 98;
`;

const MapPresenter = styled.div`
  position: relative;
  width: 1250px;
  height: 595px;
`;

const MapImage = styled.img`
  object-fit: fill;
  position: absolute;
  width: 1250px;
  height: 600px;
`;

const GridImage = styled.img`
  position: absolute;
  width: 1250px;
  height: 100vh;
`;

export default withRouter(HomeContainer);
