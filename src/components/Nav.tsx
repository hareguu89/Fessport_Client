import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Dropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [myDropdown, setMyDropdwon] = useState(false);
  const [topButton, setTopButton] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const offsetTop = window.pageYOffset;
    offsetTop > 100 ? setTopButton(true) : setTopButton(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  const onMyMouseEnter = () => {
    if (window.innerWidth < 960) {
      setMyDropdwon(false);
    } else {
      setMyDropdwon(true);
    }
  };
  const onMyMouseLeave = () => {
    if (window.innerWidth < 960) {
      setMyDropdwon(false);
    } else {
      setMyDropdwon(false);
    }
  };

  const MenuItems = [
    {
      title: 'Companions',
      path: '/companion',
      cName: 'dropdown-link',
    },
    {
      title: 'Sell&Buy',
      path: '/resell',
      cName: 'dropdown-link',
    },
    {
      title: 'Review',
      path: '/Review',
      cName: 'dropdown-link',
    },
  ];

  return (
    <>
      <Container className="nav">
        <Link to="/" className="nav-logo">
          FESSPORT <i className="fas fa-passport"></i>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to="/Community"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Community <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link
              to="/artist/list"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Artist
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/festival/list"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Festival
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-links" onClick={toggleModal}>
              SignIn
            </a>
          </li>
          <li className="nav-item">
            <SignModal
              title={'FESSPORT SIGN!'}
              isOpen={isModalOpen}
              onClose={toggleModal}
            ></SignModal>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMyMouseEnter}
            onMouseLeave={onMyMouseLeave}
          >
            <div className="nav-links" onClick={closeMobileMenu}>
              MY FESSPORT <i className="fas fa-caret-down" />
            </div>
            {myDropdown && <MyDropdown />}
          </li>
        </ul>
      </Container>
      {topButton && (
        <TopButton
          src="/images/up.png"
          topButton={topButton}
          onClick={handleScrollUp}
        />
      )}
    </>
  );
};

const Container = styled.div`
  border-bottom: 1px solid white;
  position: fixed;
  background-color: rgb(23, 20, 29);
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  .nav-logo {
    color: #fff;
    justify-self: start;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
  }

export function MyDropdown(): JSX.Element {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const MyMenuItems = [
    {
      title: 'MY FESSPORT',
      path: '/fessport',
      cName: 'dropdown-link',
    },
    {
      title: 'WISH LIST',
      path: '/wishlist',
      cName: 'dropdown-link',
    },
    {
      title: 'MY POST',
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
  background: rgb(28, 27, 27);
  cursor: pointer;

  :hover {
    // background-color: white;
  }
`;

const Ul = styled.ul`
  width: 160px;
  position: absolute;
  top: 80px;
  list-style: none;
  text-align: center;

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

  @media only screen and (max-width: 960px) {
    .NavbarItems {
      position: relative;
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 90vh;
      position: absolute;
      top: 80px;
      left: -100%;
      opacity: 1;
      transition: all 0.5s ease;
    }

    .nav-menu.active {
      background: #242222;
      left: 0;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }

    .nav-links {
      text-align: center;
      padding: 2rem;
      width: 100%;
      display: table;
    }

    .nav-links:hover {
      background-color: #1888ff;
      border-radius: 0;
    }

    .navbar-logo {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(25%, 50%);
    }

    .menu-icon {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
    }

    .fa-times {
      color: #fff;
      font-size: 2rem;
    }

    .nav-links-mobile {
      display: block;
      text-align: center;
      padding: 1.5rem;
      margin: 2rem auto;
      border-radius: 4px;
      width: 80%;
      background: #1888ff;
      text-decoration: none;
      color: #fff;
      font-size: 1.5rem;
    }

    .nav-links-mobile:hover {
      background: #fff;
      color: #1888ff;
      transition: 250ms;
    }

    button {
      display: none;
    }
  }
`;

const TopButton = styled.img<{ topButton: boolean }>`
  position: fixed;
  top: 80%;
  left: 90%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.9;
  z-index: 100;
`;

export default Nav;
