import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../modules';
import { loginAsync, signupAsync } from '../modules/sign';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SignModal = ({ title, isOpen, onClose }: ModalProps) => {
  const outsideRef = React.useRef(null);
  const [goSignup, setSignUp] = useState(false);
  const handleSignup = () => setSignUp(!goSignup);

  // outside 누르면 onClose
  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
      setSignUp(false);
    }
  };

  // ---------------- SIGN IN logic ----------------------
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = useSelector((state: RootState) => state.login);

  const onSubmitHandler = (e: any): void => {
    const userInfo = {
      email: email,
      password: password,
    };
    if (!email || !password) {
    } else {
      e.preventDefault();
      dispatch(loginAsync.request({ userInfo: userInfo }));
      onClose();
    }
  };

  // ---------------- SIGN UP logic ----------------------
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpNick, setSignUpNick] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpCPassword, setSignUpCPassword] = useState('');

  const onSignUpHandler = (e: any) => {
    if (signUpCPassword !== signUpPassword) {
      alert('비번틀림');
    }
    e.preventDefault();
    const userInfo = {
      email: signUpEmail,
      nickname: signUpNick,
      password: signUpPassword,
    };
    dispatch(signupAsync.request({ userInfo: userInfo }));
    handleSignup();
  };

  return isOpen ? (
    <Modal className={'modal'}>
      <div
        ref={outsideRef}
        className={'modal__overlay'}
        onClick={handleCloseOnOverlay}
      />
      {/* <button className={'modal__close'} onClick={onClose}>
        <i className={'fas fa-times'} />
    </button> */}
      <div className={'modal__box'}>
        <div className="modal__header">
          <h2 className={'modal__title'}>{title}</h2>
        </div>
        <div className="modal__break"></div>
        {!goSignup ? (
          <form className="modal__form">
            <ol className="modal__ol">
              <li className="modal__list">
                <label className="modal__text"> EMAIL: </label>
                <input
                  type="email"
                  className="modal__item"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="modal__list">
                <label className="modal__text"> PASSWORD: </label>
                <input
                  type="password"
                  className="modal__item"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li className="modal__list">
                <input
                  type="submit"
                  value="SIGNIN >"
                  className="modal__sign"
                  onClick={onSubmitHandler}
                />
              </li>
              <li className="modal__list">
                <input
                  type="submit"
                  value="SIGN UP >"
                  className="modal__sign"
                  onClick={handleSignup}
                />
              </li>
            </ol>
          </form>
        ) : (
          <Form>
            <li className="signup__list">
              <label className="signup-text"> EMAIL: </label>
              <input
                type="email"
                className="signup-input"
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </li>
            <li className="signup__list">
              <label className="signup-text"> NICK NAME: </label>
              <input
                type="text"
                className="signup-input"
                onChange={(e) => setSignUpNick(e.target.value)}
              />
            </li>

            <li className="signup__list">
              <label className="signup-text"> PASSWORD: </label>
              <input
                type="email"
                className="signup-input"
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
            </li>
            <li className="signup__list">
              <label className="signup-text"> CONFIRM YOUR PASSWORD: </label>
              <input
                type="email"
                className="signup-input"
                onChange={(e) => setSignUpCPassword(e.target.value)}
              />
            </li>
            <li className="signup__list">
              <input
                type="submit"
                value="SIGNUP >"
                className="modal__sign"
                onClick={onSignUpHandler}
              />
            </li>
            <li className="signup__list">
              <input
                type="submit"
                value="BACK >"
                className="modal__sign"
                onClick={handleSignup}
              />
            </li>
          </Form>
        )}
      </div>
    </Modal>
  ) : null;
};

const Form = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 33% 33% 33%;
  .signup-text {
    font-size: 14px;
    text-align: start;
    color: white;
  }
  .signup-input {
    padding-top: 5px;
    background: none;
    color: #b8e3f4;
    box-sizing: border-box;
    padding: 5px;
    border: 0px;
    border-bottom: 1px solid #666;
  }
  .signup__list {
    max-width: 90%;
    font-size: 14px;
    display: grid;
    grid-template-rows: 35px;
    margin-bottom: 36px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  heigth: 100vhh;

  .modal__header {
    position: flex;
    margin: 10px;
    border: 10px;
  }

  .modal__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
  }

  .modal__box {
    position: relative;
    width: 100%;
    margin: auto;
    max-width: 100%;
    box-sizing: border-box;
    cursor: auto;
  }

  .modal__break {
    max-width: 95%;
    height: 1px;
    opacity: 0.5;
    position: relative;
    margin-bottom: 45px;
    background: linear-gradient(to right, white 0%, #999 100%);
  }

  .modal__title {
    color: #9e25fc;
    text-align: start;
    font-size: 28px;
    font-weight: normal;
  }

  .modal__close {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    transform: translate(-100%, 60%);
    font-size: 14px;
    cursor: pointer;
    color: white;
    background-color: rgba(0, 0, 0, 0.9);

    .modal__close :hover {
      transform: rotate(180deg);
    }
  }

  @media screen and (min-width: 800px) {
    .modal__box {
      max-width: 600px;
      margin: 0 30px;
    }
  }

  .modal__form {
    vertical-align: baseline;
    line-height: 100%;
  }

  .modal__ol {
    font-size: 14px;
    display: grid;
    grid-template-columns: 50% 50%;
  }

  .modal__list {
    max-width: 90%;
    font-size: 14px;
    display: grid;
    grid-template-rows: 35px;
    margin-bottom: 36px;
  }

  .modal__item {
    padding-top: 5px;
    background: none;
    color: #b8e3f4;
    box-sizing: border-box;
    padding: 5px;
    border: 0px;
    border-bottom: 1px solid #666;
  }

  .modal__sign {
    width: auto;
    min-width: 150px;
    max-width: 150px;
    font-size: 14px;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #94f2ff;
    border: 1px solid #94f2ff !important;
    &:hover {
      background: #fff;
      border: 1px solid #fff !important;
    }
  }
  .modal__text {
    text-align: start;
    padding-top: 10px;
    padding-bottom: 10px;
    color: white;
  }
  .modal__signup {
    width: auto;
    min-width: 150px;
    max-width: 150px;
    font-size: 14px;
    cursor: pointer;
    // background-color: #94f2ff;
  }
`;
