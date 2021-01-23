import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

// interface LoginProps {
//   isLogin: boolean;
//   onLogin: () => void;
// }

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
      // handleSignup();
    }
  };

  // login logic
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
                <input type="email" className="modal__item" />
              </li>
              <li className="modal__list">
                <label className="modal__text"> PASSWORD: </label>
                <input type="password" className="modal__item" />
              </li>
              <li className="modal__list">
                <button type="submit" className="modal__sign">
                  {' '}
                  SignIn{' '}
                </button>
              </li>
              <li className="modal__list">
                <button
                  type="submit"
                  className="modal__signup"
                  onClick={handleSignup}
                >
                  SignUP
                </button>
              </li>
            </ol>
          </form>
        ) : (
          <Form>
            <div className="signup-first">
              <li className="signup-name">
                <label className="signup-text"> FULL NAME: </label>
                <input type="email" className="signup-input" />
              </li>
              <li className="signup-gender">
                <label className="signup-text"> GENDER: </label>
                <input type="email" className="signup-input" />
              </li>
            </div>
            <div className="signup-second">
              <li className="signup-email">
                <label className="signup-text"> EMAIL: </label>
                <input type="email" className="signup-input" />
              </li>
              <li className="signup-email">
                <label className="signup-text"> CONFIRM YOUR PASSWORD: </label>
                <input type="email" className="signup-input" />
              </li>
              <li className="signup-password">
                <label className="signup-text"> PASSWORD: </label>
                <input type="email" className="signup-input" />
              </li>
            </div>
            <div className="signup-footer">
              <li className="signup-btn">
                <button type="submit" className="signup-btn">
                  SUBMIT
                </button>
              </li>
              <li className="signup-back">
                <button
                  type="submit"
                  className="signup-back-btn"
                  onClick={handleSignup}
                >
                  Login
                </button>
              </li>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  ) : null;
};

const Form = styled.form`
  display: absolute;
  justify-content: space-between;

  .signup-text {
    font-size: 14px;
    text-align: start;
    color: white;
  }
  .signup-input {
    width: 100%;
  }
  .signup-btn {
    // width: 100%;
    // min-width: 150px;
    max-width: 150px;
    font-size: 14px;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #94f2ff;
    border: 1px solid #94f2ff !important;
  }
  .signup-back-btn {
    display: flex;
    width: auto;
    min-width: 150px;
    max-width: 150px;
    font-size: 14px;
    cursor: pointer;
  }
  .signup-first {
    display: flex;
    width: 100%;
  }
  .signup-second {
    display: flex;
    width: 100%;
  }
  signup-footer {
    display: flex;
    justify-content: space-between;
    // width: 100%;
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
    
    .modal__header{
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
      max-width: 100%
      box-sizing: border-box;
      cursor: auto;
    }
  
    .modal__break{
      max-width: 95%;
      height:1px;
      opacity: .5;
      position:relative;
      margin-bottom:45px;
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
            font-size: 3rem;
            cursor: pointer;
            color: white;
            background-color: rgba(0, 0, 0, 0.9);
          
    //   &:hover {
    //     transform: rotate(180deg);
    //   }
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
      font-size: 12px;
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
  
    .modal__sign{
      width: auto;
      min-width: 150px;
      max-width: 150px;
      font-size:14px;
      cursor: pointer;
      padding: 12px 24px;
      background-color: #94f2ff;
      border: 1px solid #94f2ff !important;

    }
    .modal__text {
      text-align: start;
      padding-top: 10px;
      padding-bottom: 10px;
      color: white;
    }
    .modal__signup{
        width: auto;
        min-width: 150px;
        max-width: 150px;
        font-size:14px;
        cursor: pointer;
        // background-color: #94f2ff;
    }
`;
