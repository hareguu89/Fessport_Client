import React, { useEffect, useState } from 'react';
import { IVisit } from '../api/userInfo';
import styled from 'styled-components';

interface IProps {
  visit: IVisit[] | null;
}

interface IPosition {
  y: number;
  x: number;
}

const Collector = ({ visit }: IProps): JSX.Element => {
  const [position, setPosition] = useState<IPosition[]>([]);
  const makePosition = (visit: IVisit[]): void => {
    const dposition = [];
    for (let i = 0; i < visit.length; i++) {
      let dy: number = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
      let dx: number = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
      dposition.push({ y: dy, x: dx });
      for (let n = 0; n < i; n++) {
        if (i === 0) {
          break;
        }
        if (
          Math.abs(dposition[n].y - dy) < 150 &&
          Math.abs(dposition[n].x - dx) < 150
        ) {
          dy = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
          dx = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
          n = -1;
        } else {
          dposition[i] = { y: dy, x: dx };
        }
      }
    }
    setPosition(dposition);
  };

  useEffect(() => {
    if (visit) {
      makePosition(visit);
      console.log('Collector useEffect');
    }
  }, []);

  return (
    <CollectorPresenter>
      <BackgroundImage src={'/images/visa.jpg'} />
      {visit &&
        position.length === visit.length &&
        visit.map((item, index) => (
          <FestivalStamp
            key={item.id}
            src={item.image}
            y={position[index].y}
            x={position[index].x}
          />
        ))}
    </CollectorPresenter>
  );
};

const CollectorPresenter = styled.div`
  position: relative;
  margin-top: 50px;
`;

const BackgroundImage = styled.img`
  position: relative;
  width: 1200px;
  height: 700px;
  border-radius: 30px;
  opacity: 0.9;
  z-index: -1;
`;

const FestivalStamp = styled.img<{ y: number; x: number }>`
  object-fit: contain;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: 200px;
  height: 200px;
`;

export default Collector;
