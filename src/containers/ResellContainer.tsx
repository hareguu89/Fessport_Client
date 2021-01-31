import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Resell from '../components/Resell';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync } from '../modules/board';

const ResellContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardAsync.request('601252586adcbda1c23a9303'));
  }, []);

  return (
    <>
      <Container>
        <Header>
          <h2 className="companion_head">Buy & Sell</h2>
          <div className="companion_sub">원하는 티켓을 사고 팔아 보세요!</div>
        </Header>
        <Resell />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100px;
  display: center;
  padding-top: 5rem;
`;

const Header = styled.div`
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  .companion_head {
    display: block;
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
    color: white;
  }
  .companion_sub {
    display: block;
    text-align: center;
    font-size: 1rem;
    color: #6b7280;
    margin-top: 1.75rem;
    margin-bottom: 3rem;
  }
`;

export default ResellContainer;
