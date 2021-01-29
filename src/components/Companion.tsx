import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CompanionJoin from './CompanionJoin';

import { Link } from 'react-router-dom';
import { BoardDataRes } from '../api/board';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync } from '../modules/board/actions';

const mockData = [
  {
    _id: '1',
    title: '5tardium 동행 구해요~~',
    description: '같이 페스티벌가서 재밌게 놀아요!',
    image: 'img.jpg',
    user: {
      _id: '600933f077e53b45bf46b7db',
      image:
        'https://first-project-image-bucket.s3.ap-northeast-2.amazonaws.com/array+method.png',
      nickName: '홍인자',
    },
    festival: {
      _id: '1',
      name: '5tardium',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
      },
      {
        _id: '3',
        nickName: '짱귀희석',
        description: '좋아요!',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환' },
      { _id: '3', nickName: '짱귀희석' },
    ],
    createdAt: '2021-01-21T16:22:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
  {
    _id: '2',
    title: '울트라 동행 구해요~~',
    description: '재밌게 놀아요!',
    image: 'img.jpg',
    user: {
      _id: '2',
      image: '',
      nickName: '짱정환',
    },
    festival: {
      _id: '60085af05593303ca99f24e1',
      name: '울트라',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환' },
      { _id: '3', nickName: '짱귀희석' },
    ],
    createdAt: '2021-01-21T16:22:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
  {
    _id: '3',
    title: '이태원',
    description: '썰파가실?',
    image: 'img.jpg',
    user: {
      _id: '3',
      image: '',
      nickName: '짱귀희석',
    },
    festival: {
      _id: '3',
      name: '썰파',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환' },
      { _id: '3', nickName: '짱귀희석' },
    ],
    createdAt: '2021-01-21T16:22:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
  {
    _id: '1',
    title: '5tardium 동행 구해요~~',
    description: '같이 페스티벌가서 재밌게 놀아요!',
    image: 'img.jpg',
    user: {
      _id: '600933f077e53b45bf46b7db',
      image:
        'https://first-project-image-bucket.s3.ap-northeast-2.amazonaws.com/array+method.png',
      nickName: '홍인자',
    },
    festival: {
      _id: '1',
      name: '썰파',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
      },
      {
        _id: '3',
        nickName: '짱귀희석',
        description: '좋아요!',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환' },
      { _id: '3', nickName: '짱귀희석' },
    ],
    createdAt: '2021-01-21T16:22:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
];

const Companion = (): JSX.Element => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.boardData.boardData,
  );
  const [category, setCategory] = useState('all');

  useEffect(() => {
    getBoardAsync.request('601252586adcbda1c23a9302');
  }, []);

  const filtered = mockData.reduce<any>((acc, cur) => {
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
      <ContentContainer>
        <Content>
          <Category>
            <div className="category_header">Category</div>
            <div className="category_container">
              <div
                className="category_list"
                onClick={() => {
                  setCategory('all');
                }}
              >
                # all
              </div>
            </div>
            {dataForCategory.map((el, index) => {
              return (
                <div className="category_container" key={index}>
                  <div
                    className="category_list"
                    onClick={() => {
                      setCategory(el.slice(0, el.indexOf('(') - 1));
                    }}
                  >
                    {`# ` + el}
                  </div>
                </div>
              );
            })}
          </Category>
          <CompanionLists>
            {mockData
              .filter((el) => {
                console.log(category);
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
                      <div className="element">
                        <div className="element_text">{el.title}</div>
                        <div className="modal__break"></div>
                        <div className="element_attribute">
                          <div className="element_nickname">
                            {el.user.nickName}
                          </div>
                          <span className="wall" />
                          <div className="element_attribute_date">
                            {`created at: ` + el.createdAt.slice(0, 10)}
                          </div>
                        </div>
                        <div className="modal__break"></div>
                      </div>
                      <div className="element_image">
                        <img
                          className="image"
                          src={
                            el.user.image !== ''
                              ? el.user.image
                              : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                          }
                          alt=""
                        ></img>
                      </div>
                    </CompanionContent>
                    <div className="footer_btn">
                      <CompanionJoin
                        boardId={el._id}
                        img={el.user.image}
                        nick={el.user.nickName}
                        participants={el.participants}
                        comments={el.comments}
                        festival={el.festival}
                      />
                    </div>
                  </CompanionItem>
                );
              })}
          </CompanionLists>
          <div className="link">
            <div className="category_header">
              <Link to={`/post`} className="links">
                글쓰기
              </Link>
            </div>
          </div>
        </Content>
      </ContentContainer>
    </>
  );
};

const CompanionContent = styled.div`
  display: grid;
  grid-template-columns: 85% 15%;
  min-width: 600px;
  
  .wall{
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .modal__break {
    max-width: 95%;
    height: 1px;
    opacity: 0.5;
    position: relative;
    background: linear-gradient(to right, white 0%, #999 100%);
  }
  .element {
    max-width: 100%;
    display:grid;
    grid-gap: 10px;
  }

  .element_text {
    display: block;
    font-size: 30px;
    padding:5px;
    : hover{
      color: white;
    }
  }

  .element_attribute {
    font-size: 20px;
    margin-bottom 5px;
    margin-left: 5px;
    margin-right: 5px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-direction: space-between;
  }
  .element_nickname{
    display:flex;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 400;
  }
  .element_attribute_date{
    padding: 5px;
    font-weight: 400;
  }


  element_image {
    border: 1px solid #dee2e6;
    // width: 100%;
    // height: 100%;
    align-items: center;
    justify-direction: center;
  }
  .image{
    width: 15vh;
    height: 15vh;
    border-radius: 5rem;
  }
`;

const CompanionItem = styled.div`
  background-color: rgb(46, 50, 51);
  display: grid;
  grid-template-rows: repeat(2, auto);
  margin-bottom: 0.75rem;
  padding: 20px;
  flex-direction: column;
  border-radius: 0.5rem;

  .footer_btn {
    display: flex;
    justify-content: flex-end;
    padding-top: 15px;
  }
`;

const Content = styled.div`
  color: #ccc;
  display: grid;
  grid-template-columns: 15% 65% 5%;
  grid-gap: 1.5rem;
  justify-content: center;
`;

const Category = styled.div`
  display: block;
  box-sizing: border-box;
  color: #ccc;
  padding: 10px;

  .category_header {
    padding: 15px;
    background-color: rgb(46, 50, 51);
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    border-radius: 0.5rem;
    // margin: 5px;
  }

  .category_container {
    border-radius: 0.5rem;
    padding: 5px;
    padding-left: 20px;
    background-color: rgb(46, 50, 51);
    margin-top: 5px;
    margin-bottom: 5px;
    :hover {
      color: white;
    }
  }

  .category_list {
    display: block;
    font-size: 20px;
    cursor: pointer;
  }
`;

const CompanionLists = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  // box-sizing: border-box;
`;

const ContentContainer = styled.div`
  padding-left: 10rem;
  padding-right: 10rem;
  background: url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);
  min-height: 1280px;

  .links {
    color: black;
    font-size: 12px;
    border-radius: 0.5rem;
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
  }
`;

export default Companion;
