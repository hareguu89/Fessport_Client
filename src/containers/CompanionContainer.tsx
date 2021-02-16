import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CompanionJoin from '../components/CompanionJoin';

import { Link } from 'react-router-dom';
import { BoardDataRes } from '../api/board';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync } from '../modules/board/actions';
import { getUserInfoAsync } from '../modules/userInfo/actions';
import Moment from 'moment';
import 'moment/locale/en-nz';

const CompanionContainer = (): JSX.Element => {
  const { login } = useSelector((state: RootState) => state.login.userInfo);
  const { data } = useSelector((state: RootState) => state.boardData.boardData);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('all');

  useEffect(() => {
    dispatch(getUserInfoAsync.request());
    dispatch(getBoardAsync.request('60173438054e876dd74af2e3'));
  }, []);

  const filtered = data.reduce<any>((acc, cur) => {
    if (cur.festival.name in acc) {
      acc[cur.festival.name]++;
    } else {
      acc[cur.festival.name] = 1;
    }
    return acc;
  }, {});
  const dataForCategory = [];
  for (const key in filtered) {
    dataForCategory.push(key + ` (${filtered[key]})`);
  }

  return (
    <>
      <Container>
        <Header>
          <CompanionHead>Companion</CompanionHead>
          <CompanionSub>페스티벌에 같이갈 동행을 구하세요!</CompanionSub>
        </Header>
        <ContentContainer>
          <Content>
            <Category>
              <Category_Header>Category</Category_Header>
              <Category_Container>
                <Category_List
                  onClick={() => {
                    setCategory('all');
                  }}
                >
                  # all
                </Category_List>
              </Category_Container>
              {dataForCategory.map((el, index) => {
                return (
                  <Category_Container key={index}>
                    <Category_List
                      onClick={() => {
                        setCategory(el.slice(0, el.indexOf('(') - 1));
                      }}
                    >
                      {`# ` + el}
                    </Category_List>
                  </Category_Container>
                );
              })}
            </Category>
            <CompanionLists>
              {data
                .filter((el) => {
                  if (category === 'all') {
                    return el;
                  } else {
                    return el.festival.name === category;
                  }
                })
                .map((el, index) => {
                  return (
                    <CompanionItem key={index}>
                      <CompanionContent>
                        <Element>
                          <Element_Text>{el.title}</Element_Text>
                          <Break />
                          <Element_Attribute>
                            <div>{'in '}</div>
                            <div>{`# ` + el.festival.name}</div>
                            <Wall />
                            <Element_Nickname>
                              {`by ` + el.user.nickname}
                            </Element_Nickname>
                            <Wall />
                            <Element_Attribute_Date>
                              {Moment(el.createdAt).fromNow()}
                            </Element_Attribute_Date>
                          </Element_Attribute>
                          <Break />
                        </Element>
                        <Element_Image>
                          <Image
                            src={
                              el.user.image !== ''
                                ? el.user.image
                                : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                            }
                            alt=""
                          />
                        </Element_Image>
                      </CompanionContent>
                      <FooterBtn>
                        <CompanionJoin
                          boardId={el._id}
                          nick={el.user.nickname}
                          participants={el.participants}
                          comments={el.comments}
                          _id={el.user._id}
                        />
                      </FooterBtn>
                    </CompanionItem>
                  );
                })}
            </CompanionLists>
            <div className="link">
              {login ? (
                <Link to={`/post`} className="links">
                  글쓰기
                </Link>
              ) : (
                <div />
              )}
            </div>
          </Content>
        </ContentContainer>
      </Container>
    </>
  );
};

const FooterBtn = styled.div`
  background-color: #1d2120;
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  gap: 10px;
`;

const Image = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 5rem;
`;

const Element_Image = styled.div`
  display: flex;
  height: 100%;
  align: center;
  justify-direction: center;
`;

const Element_Attribute_Date = styled.div`
  padding: 5px;
  font-weight: 400;
`;

const Element_Nickname = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 400;
`;

const Element_Attribute = styled.div`
  color: #64706c;
  gap: 4px;
  padding: 5px;
  font-size: 15px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-direction: space-between;
`;

const Break = styled.div`
  max-width: 95%;
  height: 1.5px;
  opacity: 0.5;
  position: relative;
  background: linear-gradient(to right, white 0%, #999 100%);
`;

const Element_Text = styled.div`
  display: block;
  font-size: 30px;
  padding: 5px;
  :hover {
    color: white;
  }
`;

const Element = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Category_List = styled.div`
  display: block;
  font-size: 1rem;
  cursor: pointer;
`;

const Category_Container = styled.div`
  border-radius: 0.5rem;
  padding: 5px;
  padding-left: 20px;
  background-color: #1d2120;
  margin-top: 5px;
  margin-bottom: 5px;
  :hover {
    color: white;
  }
`;

const Wall = styled.div`
  display: inline;
  box-sizing: border-box;
  border: 0 solid #d2d6dc;
  margin-right: 4px;
  margin-left: 4px;
  padding: 0.5px;
  height: 80%;
  background-color: #ccc;
`;

const CompanionContent = styled.div`
  background-color: #1d2120;
  display: flex;
  justify-content: space-between;
  border-radius: 0.5rem;
  width: 100%;
  padding: 10px;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
`;

const CompanionItem = styled.div`
  width: 100%;
  background-color: rgb(46, 50, 51);
  display: grid;
  grid-template-rows: repeat(2, auto);
  margin-bottom: 0.75rem;
  padding: 5px;
  flex-direction: column;
  border-radius: 0.5rem;

  &:hover {
    transform: scale(1.02);
  }
`;

const Content = styled.div`
  color: #ccc;
  display: grid;
  grid-template-columns: 15% 45% 5%;
  grid-gap: 1.5rem;
  justify-content: center;

  @media only screen and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
  }
`;

const Category_Header = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #1d2120;
  font-weight: 500;
  font-size: 24px;
  border-radius: 0.5rem;
`;

const Category = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
  color: #ccc;
  padding: 10px;
`;

const CompanionLists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  // box-sizing: border-box;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding-left: 10rem;
  padding-right: 10rem;

  .links {
    color: black;
    font-size: 12px;
    background-color: orange;
    padding: 10px;
    cursor: pointer;
    margin-right: 18px;
  }

  .link {
    width: 150px;
    padding-top: 20px;
    box-sizing: border-box;
    border: 0 solid #d2d6dc;
    display: block;

    @media only screen and (max-width: 1080px) {
      position: absolute;
      top: 300px;
      right: 80px;
    }
  }
`;

const CompanionHead = styled.h2`
  display: block;
  text-align: center;
  font-size: 4rem;
  font-weight: 600;
  color: white;
`;

const CompanionSub = styled.div`
  display: block;
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
  margin-top: 1.75rem;
  margin-bottom: 3rem;
`;

const Container = styled.div`
  height: 100px;
  display: center;
  padding-top: 5rem;
`;

const Header = styled.div`
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export default CompanionContainer;
