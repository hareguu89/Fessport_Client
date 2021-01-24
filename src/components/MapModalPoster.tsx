import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  _id: string;
  name: string;
  thumbnail: string;
}

const MapModalPoster = ({ _id, name, thumbnail }: IProps): JSX.Element => {
  return (
    <FestivalLink key={_id} to={`/festival/detail/${_id}`}>
      <FestivalName>{name}</FestivalName>
      <PosterImage src={thumbnail} />
    </FestivalLink>
  );
};

const FestivalLink = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const FestivalName = styled.span`
  color: #fff;
  font-size: 1em;
`;

const PosterImage = styled.img`
  object-fit: cover;
  margin-top: 5px;
  width: 100px;
  height: 150px;
  border: 1px solid rgba(120, 192, 204, 0);
  border-radius: 5px;
  opacity: 0.6;
  transform: scale(1);
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 1px solid rgba(120, 192, 204, 0.8);
    opacity: 1;
    transform: scale(1.1);
  }
`;

export default MapModalPoster;
