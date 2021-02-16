import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Dropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <Ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        <Li>
          <StyledLink
            className="dropdown-link"
            to="/companion"
            onClick={() => setClick(false)}
          >
            <img className="Pin" src={'/images/ultra-pin.png'} /> Companion
          </StyledLink>
          <Break />
        </Li>
        <Li>
          <StyledLink
            className="dropdown-link"
            to="/resell"
            onClick={() => setClick(false)}
          >
            <img className="Pin" src={'/images/ultra-pin.png'} /> Buy & Sell
          </StyledLink>
          <Break />
        </Li>
        <Li>
          <StyledLink
            className="dropdown-link"
            to="/review"
            onClick={() => setClick(false)}
          >
            <img className="Pin" src={'/images/ultra-pin.png'} /> Review
          </StyledLink>
          <Break />
        </Li>
      </Ul>
    </>
  );
}

export function MyDropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <Ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        <Li>
          <StyledLink
            className="dropdown-link"
            to="/fessport"
            onClick={() => setClick(false)}
          >
            <img className="Pin" src={'/images/ultra-pin.png'} /> My Fessport
          </StyledLink>
          <Break />
        </Li>
        <Li>
          <StyledLink
            className="dropdown-link"
            to="/wishlist"
            onClick={() => setClick(false)}
          >
            <img className="Pin" src={'/images/ultra-pin.png'} /> Wish List
          </StyledLink>
          <Break />
        </Li>
      </Ul>
    </>
  );
}

const Li = styled.li`
  background: transparent;
  cursor: pointer;
`;

const Ul = styled.ul`
  width: 10%;
  position: absolute;
  top: 70px;
  list-style: none;
  margin-left: 5px;
  text-align: left;
`;

const Break = styled.div`
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 1px;
  opacity: 0.5;
  position: relative;
  background: linear-gradient(to right, white 0%, #999 100%);
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #ccc;
  padding: 10px;

  &:hover {
    color: white;
    .Pin {
      transform: rotate(270deg);
      transition: all 0.1s ease-out;
    }
  }

  .Pin {
    width: 0.7rem;
    align-items: center;
  }
`;
