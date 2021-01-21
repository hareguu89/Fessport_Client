import React, { useEffect, useState } from 'react';
import { IBadge } from '../api/userInfo';
import styled from 'styled-components';

interface IProps {
  badge: IBadge[] | null;
}

const Badge = ({ badge }: IProps): JSX.Element => {
  return (
    <BadgePresenter>
      <BackgroundImage src={'/images/visa.jpg'} />
      <TitleName>페스티벌 정복</TitleName>
      <TitleBox>
        {badge &&
          badge
            .filter((item, index) => index < 5)
            .map((item) => (
              <BadgeBox key={item.id}>
                <BadgeImage key={item.id} src={item.image} get={item.get} />
                <BadegName key={item.id}>{item.name}</BadegName>
              </BadgeBox>
            ))}
      </TitleBox>
      <TitleName>세계 정복</TitleName>
      <TitleBox>
        {badge &&
          badge
            .filter((item, index) => index >= 5 && index < 10)
            .map((item) => (
              <BadgeBox key={item.id}>
                <BadgeImage key={item.id} src={item.image} get={item.get} />
                <BadegName key={item.id}>{item.name}</BadegName>
              </BadgeBox>
            ))}
      </TitleBox>
      <TitleName>장르 정복</TitleName>
      <TitleBox>
        {badge &&
          badge
            .filter((item, index) => index >= 10 && index < 15)
            .map((item) => (
              <BadgeBox key={item.id}>
                <BadgeImage key={item.id} src={item.image} get={item.get} />
                <BadegName key={item.id}>{item.name}</BadegName>
              </BadgeBox>
            ))}
      </TitleBox>
    </BadgePresenter>
  );
};

const BadgePresenter = styled.div`
  position: relative;
  /* display: flex;
  flex-direction: column; */
  width: 1200px;
  height: 800px;
  padding-left: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1200px;
  height: 800px;
  border-radius: 30px;
  opacity: 0.9;
  z-index: -1;
`;

const TitleName = styled.div`
  font-size: 1.5rem;
  margin-top: 50px;
`;

const TitleBox = styled.div`
  display: flex;
`;

const BadgeBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-top: 10px;
`;

const BadgeImage = styled.img<{ get: boolean }>`
  object-fit: contain;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  opacity: ${(props) => (props.get ? 1 : 0.8)};
  mix-blend-mode: ${(props) => (props.get ? 'normal' : 'luminosity')};
`;

const BadegName = styled.div`
  font-size: 1rem;
  align-self: center;
  margin-top: 10px;
`;

export default Badge;
