import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync } from '../modules/board';

import { Link } from 'react-router-dom';
import ResellDetail from '../components/ResellDetail';
import Moment from 'moment';
import 'moment/locale/en-nz';

const ResellContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardAsync.request('60173438054e876dd74af2e4'));
  }, []);

  const { data, loading, error } = useSelector(
    (state: RootState) => state.boardData.boardData,
  );

  const { login } = useSelector((state: RootState) => state.login.userInfo);
  const [category, setCategory] = useState('all');

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
          <ResellHead>Buy & Sell</ResellHead>
          <ResellSub>원하는 티켓을 사고 팔아 보세요!</ResellSub>
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
            <Resell_Items>
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
                    <ResellLists key={index}>
                      <Resell_Container>
                        <Resell_article>
                          <Resell_Header>{el.title}</Resell_Header>
                          <Break />
                          <Resell_Attribute_container>
                            <div>{`in `}</div>
                            <div>{`# ` + el.festival.name}</div>
                            <Resell_Nick>
                              <Wall />
                              {`by ` + el.user.nickname}
                            </Resell_Nick>
                            <Resell_Attribute>
                              <Wall />
                              {Moment(el.createdAt).fromNow()}
                            </Resell_Attribute>
                          </Resell_Attribute_container>
                          <Break />
                        </Resell_article>
                        <div>
                          <Resell_Image
                            src={
                              el.user.image !== ''
                                ? el.user.image
                                : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                            }
                          />
                        </div>
                      </Resell_Container>
                      <ResellDetail
                        image={el.image}
                        festival={el.festival}
                        comments={el.comments}
                        description={el.description}
                        boardId={el._id}
                        _id={el.user._id}
                      />
                    </ResellLists>
                  );
                })}
            </Resell_Items>
            <div className="link">
              <div>
                {login ? (
                  <Link to={`/post`} className="links">
                    글쓰기
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </Content>
        </ContentContainer>
      </Container>
    </>
  );
};

const Resell_Header = styled.div`
  color: #ccc;
  font-size: 30px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  :hover {
    color: white;
  }
`;

const Resell_article = styled.article`
  display: block;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Resell_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  color: #64706c;
  padding: 10px;
  background-color: #1d2120;
  box-shadow: 0 0 4px -1px rgb(0 0 0 / 50%);
  border-radius: 0.5rem;
`;

const Break = styled.div`
  max-width: 95%;
  height: 1.5px;
  opacity: 0.5;
  position: relative;
  background: linear-gradient(to right, white 0%, #999 100%);
`;

const Resell_Attribute_container = styled.div`
  gap: 4px;
  display: flex;
  width: 100%;
  flex-direction: row;
  font-size: 15px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Resell_Nick = styled.div`
  display: flex;
`;

const Resell_Attribute = styled.div`
  display: flex;
`;

const Resell_Image = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 5rem;
`;
const ResellLists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  // max-width: 700px;
  box-sizing: border-box;
  background-color: rgb(46, 50, 51);
  border-radius: 0.5rem;

  :hover {
    transform: scale(1.01);
  }
`;

const Content = styled.div`
  width: 100%;
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

const Category_Header = styled.div`
  padding: 15px;
  background-color: #1d2120;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  border-radius: 0.5rem;
`;
const Category_List = styled.div`
  display: block;
  font-size: 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const Category = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
  color: #ccc;
  padding: 10px;
`;

const Wall = styled.span`
  display: inline;
  box-sizing: border-box;
  margin-right: 4px;
  margin-left: 4px;
  padding: 0.5px;
  height: 100%;
  background-color: #ccc;
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

const Resell_Items = styled.article`
  padding: 10px;
  display: grid;
  width: 100%;
  grid-gap: 15px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 20%), 0 2px 4px -1px rgb(0 0 0 / 20%);
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

  .companion_head {
    display: block;
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
    color: white;
  }
  .companion_sub {
    display: block;
    text-align: center;
    font-size: 1rem;
    color: #6b7280;
    margin-top: 1.75rem;
    margin-bottom: 3rem;
  }
`;

const ResellHead = styled.h2`
  display: block;
  text-align: center;
  font-size: 4rem;
  font-weight: 600;
  color: white;
`;

const ResellSub = styled.div`
  display: block;
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
  margin-top: 1.75rem;
  margin-bottom: 3rem;
`;

export default ResellContainer;
