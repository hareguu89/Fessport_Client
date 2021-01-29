import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Companion from '../components/Companion';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync } from '../modules/board';
import { postParticAsync } from '../modules/participant';

const CompanionContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardAsync.request('companion'));
  }, []);

  return (
    <>
      <Container>
        <Header>
          <h2 className="companion_head">Companion</h2>
          <div className="companion_sub">
            페스티벌에 같이갈 동행을 구하세요!
          </div>
        </Header>
        <Companion />
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

export default CompanionContainer;
