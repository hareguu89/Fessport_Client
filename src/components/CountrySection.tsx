import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MapModalPoster from './MapModalPoster';

interface IProps {
  id: number;
  name: string;
  y: number;
  x: number;
  flageImage: string;
  festival: IFestival[];
}

interface IFestival {
  id: number;
  name: string;
  thumbnail: string;
}

const CountrySection = ({
  id,
  name,
  y,
  x,
  flageImage,
  festival,
}: IProps): JSX.Element => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [dy, setDy] = useState<number>(300);
  const [dx, setDx] = useState<number>(150);
  useEffect(() => {
    setDy(y);
    setDx(x);
    console.log('CountrySection useEffect');
  }, [y, x]);

  return (
    <CountryPresenter y={dy} x={dx}>
      <Circle1 hover={isHover} />
      <Circle2 hover={isHover} />
      <Circle3 hover={isHover} />
      <CircleImage src={'/images/ultra.png'} hover={isHover} />
      <Pin1 src={'/images/ultra-pin.png'} hover={isHover} />
      <Pin2 hover={isHover} />
      <div
        onMouseEnter={() => {
          setIsHover(!isHover);
        }}
        onMouseLeave={() => {
          setIsHover(!isHover);
        }}
      >
        <ModalFrame isHover={isHover}>
          <CountryLink to={`/festival/list?country=${name}`}>
            <FlagImage src={flageImage} />
            {name}
          </CountryLink>
          <PosterPresenter>
            {festival.map((item) => (
              <MapModalPoster
                key={item.id}
                id={item.id}
                name={item.name}
                thumbnail={item.thumbnail}
              />
            ))}
          </PosterPresenter>
        </ModalFrame>
        <CountryImage key={id} src={flageImage} alt={name} hover={isHover} />
      </div>
    </CountryPresenter>
  );
};

const CountryPresenter = styled.div<{ y: number; x: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: all 1.5s ease-in-out;
`;

const Circle1 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: ${(props) => (props.hover ? 100 : 44)}px;
  height: ${(props) => (props.hover ? 100 : 44)}px;
  border: 1px solid rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  animation: changeColor 1s linear infinite;
  @keyframes changeColor {
    0% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
    }
    50% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0)});
    }
    100% {
      border: 1px solid
        rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
    }
  }
`;

const Circle2 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: ${(props) => (props.hover ? 90 : 40)}px;
  height: ${(props) => (props.hover ? 90 : 40)}px;
  border: 1px solid rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const Circle3 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: ${(props) => (props.hover ? 55 : 24)}px;
  height: ${(props) => (props.hover ? 55 : 24)}px;
  border: 2px solid rgba(120, 192, 204, ${(props) => (props.hover ? 0.6 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const CircleImage = styled.img<{ hover: boolean }>`
  position: absolute;
  width: 150px;
  height: 150px;
  opacity: ${(props) => (props.hover ? 0.8 : 0)};
  transition: all 0.5s ease-in-out;
`;

const Pin1 = styled.img<{ hover: boolean }>`
  position: absolute;
  top: ${(props) => (props.hover ? -50 : 0)}px;
  width: 20px;
  height: 20px;
  opacity: ${(props) => (props.hover ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

const Pin2 = styled.div<{ hover: boolean }>`
  position: absolute;
  width: 45px;
  height: 45px;
  &:before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
  animation: rotateClockwise 1.5s linear infinite;
  @keyframes rotateClockwise {
    100% {
      transform: rotate(360deg);
    }
  }
  &:before {
    background: white;
    opacity: ${(props) => (props.hover ? 0.8 : 0)};
    transition: all 0.5s ease-in-out;
  }
`;

const ModalFrame = styled.div<{ isHover: boolean }>`
  visibility: ${(props) => (props.isHover ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -10px;
  left: 20px;
  width: 600px;
  height: 300px;
  border: 20px solid transparent;
  border-radius: 30px;
  background-clip: padding-box;
  background-color: black;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  transition: all 0.4s;
  z-index: 100;
`;

const CountryLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: 20px 0px 10px 30px;
  color: #fff;
  font-size: 1.5em;
`;

const FlagImage = styled.img`
  object-fit: contain;
  margin-right: 10px;
  width: 25px;
  height: 25px;
`;

const PosterPresenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
`;

const CountryImage = styled.img<{ hover: boolean }>`
  object-fit: contain;
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(148, 242, 255, ${(props) => (props.hover ? 0.8 : 0.4)});
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  z-index: 99;
`;

export default CountrySection;
