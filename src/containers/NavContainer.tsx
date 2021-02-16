import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dropdown, MyDropdown } from '../components/DropDown';
import { SignModal } from '../components/ModalSign';
import { useDispatch, useSelector } from 'react-redux';
import { signoutAsync } from '../modules/sign';

const NavContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const [click, setClick] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [myDropdown, setMyDropdwon] = useState<boolean>(false);
  const [topNav, setTopNav] = useState<boolean>(true);

  const [isModalOpen, setModalState] = useState<boolean>(false);
  const toggleModal = (): void => setModalState(!isModalOpen);

  const handleClick = (): void => setClick(!click);
  const closeMobileMenu = (): void => setClick(false);

  const signOutHandler = (): void => {
    dispatch(signoutAsync.request());
    localStorage.removeItem('loggedInfo');
    window.location.href = '/';
  };

  const onMouseEnter = (): void => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = (): void => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const onMyMouseEnter = (): void => {
    if (window.innerWidth < 960) {
      setMyDropdwon(false);
    } else {
      setMyDropdwon(true);
    }
  };

  const onMyMouseLeave = (): void => {
    if (window.innerWidth < 960) {
      setMyDropdwon(false);
    } else {
      setMyDropdwon(false);
    }
  };

  return (
    <>
      <Container topNav={topNav}>
        <Logo to="/">
          FESSPORT <i className="fas fa-passport"></i>
        </Logo>
        <MenuIcon onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </MenuIcon>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <NavItem>
            <NavLink to="/festival/list" onClick={closeMobileMenu}>
              Festival
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/artist/list" onClick={closeMobileMenu}>
              Artist
            </NavLink>
          </NavItem>
          <NavItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <NavLink to="/Community" onClick={closeMobileMenu}>
              Community <Pin src={'/images/ultra-pin.png'} />
            </NavLink>
            {dropdown && <Dropdown />}
          </NavItem>
          <ResponsiveNavItem>
            <NavLink to="/companion" onClick={closeMobileMenu}>
              Companion
            </NavLink>
          </ResponsiveNavItem>
          <ResponsiveNavItem>
            <NavLink to="/resell" onClick={closeMobileMenu}>
              Resell
            </NavLink>
          </ResponsiveNavItem>
          <ResponsiveNavItem>
            <NavLink to="/review" onClick={closeMobileMenu}>
              Review
            </NavLink>
          </ResponsiveNavItem>
          <NavItem onMouseEnter={onMyMouseEnter} onMouseLeave={onMyMouseLeave}>
            <NavLink to="/fessport" onClick={closeMobileMenu}>
              Fessport <Pin src={'/images/ultra-pin.png'} />
            </NavLink>
            {myDropdown && <MyDropdown />}
          </NavItem>
          <ResponsiveNavItem>
            <NavLink to="/fessport" onClick={closeMobileMenu}>
              My Fessport
            </NavLink>
          </ResponsiveNavItem>
          <ResponsiveNavItem>
            <NavLink to="/wishlist" onClick={closeMobileMenu}>
              Wish List
            </NavLink>
          </ResponsiveNavItem>
          <NavItem>
            {window.localStorage.loggedInfo ? (
              <ModalLink className="nav-links" onClick={signOutHandler}>
                SignOut
              </ModalLink>
            ) : (
              <ModalLink className="nav-links" onClick={toggleModal}>
                SignIn
              </ModalLink>
            )}
          </NavItem>
          <SignModal isOpen={isModalOpen} onClose={toggleModal}></SignModal>
        </ul>
      </Container>
    </>
  );
};

const ResponsiveNavItem = styled.div`
  display: none;
  @media only screen and (max-width: 960px) {
    display: block;
    font-size: 12px;
  }
`;

const Pin = styled.img`
  width: 0.8rem;
  align-items: center;
`;

const ModalLink = styled.a`
color: #ccc;
text-decoration: none;
padding: 0.5rem 1rem;
cursor: pointer;
&:hover {
  color: white;
  transition: all 0.2s ease-out;
}

@media only screen and (max-width: 960px) {
  text-align: center;
  padding: 2rem;
  width: 100%;
  display: table;
  color: white;
  
  &:hover {
  background-color: #1888ff;
  border-radius: 0;
}
`;

const NavLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    color: white;
    transition: all 0.2s ease-out;
  }

  @media only screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    color: white;
  
    
    &:hover {
    background-color: #1888ff;
    border-radius: 0;
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 80px;
`;

const MenuIcon = styled.div`
  display: none;

  @media only screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;

  @media only screen and (max-width: 960px) {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(25%, 50%);
  }
`;

const Container = styled.div<{ topNav: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  height: 80px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  /* background-color: ${(props) =>
    props.topNav ? 'transparant' : 'rgb(21,21,31)'}; */
  transition: all 0.3s;

  .fa-firstdraft {
    margin-left: 0.5rem;
    font-size: 1.6rem;
  }

  .nav-menu {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 80vw;
    justify-content: end;
  }

  .fa-bars {
    color: #fff;
  }

  @media only screen and (max-width: 960px) {
    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 860px;
      position: absolute;
      top: 80px;
      right: -100%;
      opacity: 1;
      transition: all 0.5s ease;
      font-size: 1.3rem;
    }

    .nav-menu.active {
      background: #242222;
      right: 0;
      opacity: 0.9;
      transition: all 0.5s ease;
      z-index: 1;
    }

    .fa-times {
      color: #fff;
      font-size: 2rem;
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

export default NavContainer;
