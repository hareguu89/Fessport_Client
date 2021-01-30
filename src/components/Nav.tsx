import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Dropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const MenuItems = [
    {
      title: 'Companions',
      path: '/companion',
      cName: 'dropdown-link',
    },
    {
      title: 'Sell & Buy',
      path: '/resell',
      cName: 'dropdown-link',
    },
    {
      title: 'Review',
      path: '/review',
      cName: 'dropdown-link',
    },
  ];

  return (
    <>
      <Ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <Li key={index}>
              <StyledLink
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {/* {item.icon} */}
                {item.title}
              </StyledLink>
              <div className="modal__break" />
            </Li>
          );
        })}
      </Ul>
    </>
  );
}

export function MyDropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const MyMenuItems = [
    {
      title: 'My Fessoirt',
      path: '/fessport',
      cName: 'dropdown-link',
    },
    {
      title: 'Wish List',
      path: '/wishlist',
      cName: 'dropdown-link',
    },
    {
      title: 'My Post',
      path: '/mypost',
      cName: 'dropdown-link',
    },
  ];

  return (
    <>
      <Ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MyMenuItems.map((item, index) => {
          return (
            <Li key={index}>
              <StyledLink
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {/* {item.icon} */}
                {item.title}
              </StyledLink>
              <div className="modal__break" />
            </Li>
          );
        })}
      </Ul>
    </>
  );
}

const Li = styled.li`
  background: transparent;
  cursor: pointer;
  :hover {
    background-color: rgba(170, 170, 170, 0.2);
  }
`;

const Ul = styled.ul`
  width: 10%;
  position: absolute;
  top: 70px;
  list-style: none;
  margin-left: 5px;
  text-align: left;
  .modal__break {
    justify-content: center;
    align-items: center;
    max-width: 100%;
    height: 1px;
    opacity: 0.5;
    position: relative;
    background: linear-gradient(to right, white 0%, #999 100%);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #ccc;
  padding: 10px;
  :hover {
    color: white;
  }
`;
