import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { postImageAsync } from '../modules/image';
import { patchUserInfoAsync } from '../modules/userInfo';

interface IProps {
  email: string | null;
  nickName: string | null;
  image: string | null;
  handleScrollDown: (
    target: string,
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface IEditUserInfo {
  nickName: string | null;
  image: string | null;
  newPassword: string | null;
  newPasswordCheck: string | null;
}

const UserInfo = ({
  nickName,
  email,
  image,
  handleScrollDown,
}: IProps): JSX.Element => {
  const [editUserInfo, setEditUserInfo] = useState<IEditUserInfo>({
    image: image,
    nickName: nickName,
    newPassword: null,
    newPasswordCheck: null,
  });

  const { imageData, imageError } = useSelector(
    (state: RootState) => state.image,
  );

  const dispatch = useDispatch();

  const fileRef: React.RefObject<HTMLInputElement> = React.createRef();

  const handleImageUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (fileRef.current !== null) {
      fileRef.current.click();
    }
  };

  const handleSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files !== null) {
      const fd = new FormData();
      fd.append('filename', event.target.files[0]);
      dispatch(postImageAsync.request(fd));
    }
  };

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserInfo((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditUserInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUserInfo.newPassword !== editUserInfo.newPasswordCheck) {
      console.log('비밀번호가 일치하지 않습니다.');
    } else {
      const editedUserInfo = {
        nickName: editUserInfo.nickName,
        password: editUserInfo.newPassword ? editUserInfo.newPassword : null,
        image: editUserInfo.image,
      };
      dispatch(patchUserInfoAsync.request(editedUserInfo));
      setEditUserInfo((state) => ({
        ...state,
        newPassword: null,
        newPasswordCheck: null,
      }));
    }
  };

  useEffect(() => {
    if (imageError) {
      console.log('Image 업로드 실패');
    } else if (imageData) {
      setEditUserInfo((state) => ({
        ...state,
        image: imageData,
      }));
    }
  }, [imageData, imageError]);

  return (
    <UserInfoPresenter onSubmit={handleEditUserInfo}>
      {/* <BackgroundImage src={'/images/passport.jpg'} /> */}
      <TitleBox>
        <TitleText> FESSPORT (Profile) </TitleText>
      </TitleBox>
      <ContentsBox>
        <ImageBox>
          <UserImage
            src={
              editUserInfo.image
                ? editUserInfo.image
                : '/images/default_profile.png'
            }
          />
          <ImageUpload
            ref={fileRef}
            type={'file'}
            accept="image/*"
            onChange={handleSelectedImage}
          />
          <ImageUploadButton onClick={handleImageUpload}>
            Edit Image
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
          <SubText>닉네임/Nickname</SubText>
          <InputText
            type={'text'}
            name={'nickName'}
            value={editUserInfo.nickName ? editUserInfo.nickName : ''}
            onChange={handleInputValue}
          ></InputText>
          <SubText>이메일/E-mail</SubText>
          <MainText>{email}</MainText>
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
            name={'newPassword'}
            value={editUserInfo.newPassword ? editUserInfo.newPassword : ''}
            placeholder={'변경할 비밀번호를 입력하세요'}
            onChange={handleInputValue}
          ></InputText>
          <ButtonBox>
            <div>
              <SubText>새로운 비밀번호 확인/New password check</SubText>
              <InputText
                type={'password'}
                name={'newPasswordCheck'}
                value={
                  editUserInfo.newPasswordCheck
                    ? editUserInfo.newPasswordCheck
                    : ''
                }
                placeholder={'변경할 비밀번호를 한번 더 입력하세요'}
                onChange={handleInputValue}
              ></InputText>
            </div>
            <EditButton type="submit"> Edit Profile </EditButton>
          </ButtonBox>
        </InfoBox>
      </ContentsBox>
      <DownButton
        src="/images/arrow.png"
        onClick={handleScrollDown('collectorRef')}
      />
      {/* <TextUnder>
        {'PMKORTEAMCOSTIVAL<<<<<<<<<FESSPORT>>>>>>>>>>>>>>>>>>>>>>>>'}
      </TextUnder>
      <TextUnder>
        {'M123A4567KOR87025010F3004348515034V204111000000000000000000'}
      </TextUnder> */}
    </UserInfoPresenter>
  );
};

const UserInfoPresenter = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 550px;
  background: rgba(0, 0, 0);
  border-radius: 30px;
  z-index: 2;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 1100px;
  height: 550px;
  border-radius: 30px;
  opacity: 0.2;
  z-index: 1;
`;

const TitleBox = styled.div`
  display: flex;
  margin-left: 50px;
  margin-top: 25px;
`;

const TitleText = styled.div`
  margin-left: 50px;
  color: rgb(200, 200, 200);
  font-size: 1.5em;
  font-weight: 600;
`;

const ContentsBox = styled.div`
  display: flex;
  margin-left: 100px;
  margin-top: 25px;
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
  margin-top: 20px;
  width: 250px;
  height: 45px;
  background: rgba(170, 170, 170, 0.1);
  font-size: 1rem;
  font-weight: 500;
  border: 0;
  outline: 0;
  height: 50px;
  color: rgb(200, 200, 200);
  cursor: pointer;
  &:hover {
    background: rgb(170, 170, 170, 0.8);
    color: rgb(36, 36, 36);
  }
  transition: background 0.5s ease-in-out;
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
  color: rgb(70, 111, 162);
  font-size: 1em;
  font-weight: 600;
`;

const MainText = styled.span`
  display: flex;
  margin-left: 50px;
  margin-top: 5px;
  margin-bottom: 20px;
  padding-bottom: 5px;
  font-size: 1.2em;
  font-weight: 600;
  color: rgb(200, 200, 200);
`;

const InputText = styled.input`
  margin-left: 50px;
  margin-top: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 300px;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 5px;
  background: transparent;
  color: rgb(200, 200, 200);
  border-bottom: 1px solid rgba(170, 170, 170, 0.5);
  &:focus {
    background: rgba(170, 170, 170, 0.1);
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const EditButton = styled.button`
  background: rgba(170, 170, 170, 0.1);
  font-size: 1rem;
  font-weight: 500;
  width: 100px;
  border: 0;
  border-radius: 10px;
  outline: 0;
  height: 50px;
  color: rgb(200, 200, 200);
  cursor: pointer;
  &:hover {
    background: rgb(170, 170, 170, 0.8);
    color: rgb(36, 36, 36);
  }
  transition: background 0.5s ease-in-out;
`;

const DownButton = styled.img`
  object-fit: cover;
  position: absolute;
  top: 90%;
  left: 45%;
  width: 100px;
  height: 100px;
  opacity: 0.8;
  z-index: 99;
`;

const TextUnder = styled.span`
  margin-left: 100px;
  font-size: 1.5em;
  color: rgb(200, 200, 200);
`;

export default UserInfo;
