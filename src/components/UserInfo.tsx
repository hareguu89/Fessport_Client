import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IUserInfo } from '../api/userInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { postImageAsync } from '../modules/image';
import { postUserInfoAsync } from '../modules/userInfo';

interface IProps {
  id: number;
  nickName: string | null;
  email: string | null;
  image: string | null;
}

const UserInfo = ({ id, nickName, email, image }: IProps): JSX.Element => {
  const [inputImage, setInputImage] = useState<string | undefined | null>(
    image,
  );
  const [inputNickName, setInputNickName] = useState<string | undefined | null>(
    nickName,
  );
  const [inputNewPassword, setInputNewPassword] = useState<
    string | undefined | null
  >();
  const [inputNewPasswordCheck, setInputNewPasswordCheck] = useState<
    string | undefined | null
  >();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.image.imageData,
  );

  useEffect(() => {
    if (data) {
      setInputImage(data);
      setInputNickName(nickName);
    }
  }, [data]);

  useEffect(() => {
    setInputNickName(nickName);
  }, [nickName]);

  const dispatch = useDispatch();

  const handleInputValue = (
    key: React.Dispatch<React.SetStateAction<string | undefined | null>>,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    key(e.target.value);
  };

  const submitEditUserInfo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (inputNewPassword !== inputNewPasswordCheck) {
      console.log('비밀번호가 일치하지 않습니다.');
    } else {
      const editedUserInfo = {
        nickName: inputNickName,
        password: inputNewPassword ? inputNewPassword : null,
        image: inputImage,
      };
      // const accessToken = localStorage.getItem('accessToken');
      const accessToken = 'acc';
      dispatch(
        postUserInfoAsync.request({
          editUserInfo: editedUserInfo,
          accessToken,
        }),
      );
      setInputNewPassword('');
      setInputNewPasswordCheck('');
    }
  };

  const isSelectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files !== null) {
      const fd = new FormData();
      fd.append('filename', event.target.files[0]);
      dispatch(postImageAsync.request(fd));
    }
  };

  const fileRef: React.RefObject<HTMLInputElement> = React.createRef();

  const handleImageUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (fileRef.current !== null) {
      fileRef.current.click();
    }
  };

  return (
    <>
      <UserInforPresenter>
        <BackgroundImage src={'/images/passport.jpg'} />
        <TitleBox>
          <TitleText>회원정보 FESSPORT</TitleText>
          <TitleText>대한민국 REPUBLIC OF KOREA</TitleText>
        </TitleBox>
        <ContentsBox>
          <ImageBox>
            <UserImage src={inputImage ? inputImage : '//:0'} />
            <ImageUpload
              ref={fileRef}
              type={'file'}
              accept="image/*"
              onChange={isSelectedImg}
            />
            <ImageUploadButton onClick={handleImageUpload}>
              사진 변경
            </ImageUploadButton>
          </ImageBox>
          <InfoBox>
            <TypeBox>
              <TextBox>
                <SubText>종류/Type</SubText>
                <MainText>PM</MainText>
              </TextBox>
              <TextBox>
                <SubText>국가코드/Country code</SubText>
                <MainText>KOR</MainText>
              </TextBox>
              <TextBox>
                <SubText>회원번호/Fessport No.</SubText>
                <MainText>M123A4567</MainText>
              </TextBox>
            </TypeBox>
            <SubText>이름/Name</SubText>
            <InputText
              type={'text'}
              value={inputNickName ? inputNickName : ''}
              onChange={handleInputValue(setInputNickName)}
            ></InputText>
            <SubText>이메일/E-mail</SubText>
            <MainText>{email}</MainText>
            {/* <TypeBox>
              <TextBox>
                <SubText>생년월일/Date of birth</SubText>
                <MainText>M123A4567</MainText>
              </TextBox>
              <TextBox>
                <SubText>성별/Sex</SubText>
                <MainText>M</MainText>
              </TextBox>
            </TypeBox> */}
            <TypeBox>
              <TextBox>
                <SubText>국적/Nationality</SubText>
                <MainText>REPUBLIC OF KOREA</MainText>
              </TextBox>
              <TextBox>
                <SubText>발행관청/Authority</SubText>
                <MainText>TEAM FESSPORT a.k.a. COSTIVAL</MainText>
              </TextBox>
            </TypeBox>
            <SubText>새로운 비밀번호/New password</SubText>
            <InputText
              type={'password'}
              value={inputNewPassword ? inputNewPassword : ''}
              placeholder={'변경할 비밀번호를 입력하세요'}
              onChange={handleInputValue(setInputNewPassword)}
            ></InputText>
            <SubText>새로운 비밀번호 확인/New password check</SubText>
            <InputText
              type={'password'}
              value={inputNewPasswordCheck ? inputNewPasswordCheck : ''}
              placeholder={'변경할 비밀번호를 한번 더 입력하세요'}
              onChange={handleInputValue(setInputNewPasswordCheck)}
            ></InputText>
            <EditButton onClick={submitEditUserInfo}>수정하기</EditButton>
          </InfoBox>
        </ContentsBox>
        <TextUnder>
          {'PMKORTEAMCOSTIVAL<<<<<<<<<FESSPORT>>>>>>>>>>>>>>>>>>>>>>>>'}
        </TextUnder>
        <TextUnder>
          {'M123A4567KOR87025010F3004348515034V204111000000000000000000'}
        </TextUnder>
      </UserInforPresenter>
    </>
  );
};

const UserInforPresenter = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 700px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 1200px;
  height: 700px;
  border-radius: 30px;
  opacity: 0.8;
  z-index: -1;
`;

const TitleBox = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 50px;
`;

const TitleText = styled.div`
  font-size: 2em;
  margin-left: 50px;
  color: rgb(70, 111, 162);
  font-weight: 900;
`;

const ContentsBox = styled.div`
  display: flex;
  margin-top: 50px;
  margin-left: 100px;
  margin-bottom: 10px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
`;

const UserImage = styled.img`
  width: 250px;
  height: 300px;
`;

const ImageUpload = styled.input`
  display: none;
`;

const ImageUploadButton = styled.button`
  align-self: center;
  margin-top: 10px;
  width: 250px;
  height: 45px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const TypeBox = styled.div`
  display: flex;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubText = styled.span`
  display: flex;
  margin-left: 50px;
  font-size: 1em;
  color: rgb(70, 111, 162);
  font-weight: 600;
`;

const MainText = styled.span`
  display: flex;
  margin-left: 50px;
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const InputText = styled.input`
  width: 400px;
  height: 50px;
  font-size: 1.5em;
  font-weight: 600;
  margin-left: 50px;
  margin-top: 3px;
  margin-bottom: 10px;
`;

const EditButton = styled.button`
  align-self: flex-end;
  width: 100px;
  height: 50px;
`;

const TextUnder = styled.span`
  font-size: 2em;
  margin-top: 20px;
  margin-left: 100px;
`;

export default UserInfo;
