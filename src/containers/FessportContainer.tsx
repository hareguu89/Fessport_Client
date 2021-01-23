import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Collector from '../components/Collector';
import Badge from '../components/Badge';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getUserInfoAsync } from '../modules/userInfo';

const FessportContainer = (): JSX.Element => {
  const { postSucess, data, loading, error } = useSelector(
    (state: RootState) => state.userInfo.userInfo,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      // const accessToken = localStorage.getItem('accessToken');
      dispatch(getUserInfoAsync.request('acc'));
      console.log('FessportContainer useEffect');
    } else {
      if (postSucess) {
        // const accessToken = localStorage.getItem('accessToken');
        dispatch(getUserInfoAsync.request('acc'));
        console.log('정보가 업데이트 되었습니다. FessportContainer useEffect.');
      }
    }
  }, [data, postSucess]);

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && (
        <p style={{ textAlign: 'center' }}>
          Error!!! 다시 시도해주세요. 뒤로가기.
        </p>
      )}
      {data && (
        <FessportPresenter>
          <UserInfo
            id={data.id}
            nickName={data.nickName}
            email={data.email}
            image={data.image}
          />
          <Collector visit={data.visit} />
          <Badge badge={data.badge} />
        </FessportPresenter>
      )}
    </>
  );
};

const FessportPresenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export default withRouter(FessportContainer);
