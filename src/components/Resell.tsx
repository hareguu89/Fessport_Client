import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync } from '../modules/board/actions';
import ResellDetail from './ResellDetail';
import image from '../modules/image/reducer';
import festival from '../modules/festival/reducer';
import participant from '../modules/participant/reducer';
import Moment from 'moment';
import 'moment/locale/en-nz';

const Resell = (): JSX.Element => {
  const [category, setCategory] = useState('all');
  const { data, loading, error } = useSelector(
    (state: RootState) => state.boardData.boardData,
  );
  const dispatch = useDispatch();
  const { login } = useSelector((state: RootState) => state.login.userInfo);

  useEffect(() => {
    dispatch(getBoardAsync.request('601252586adcbda1c23a9303'));
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
          <div className="resell_items">
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
                    <div className="resell_container">
                      <article className="resell_article">
                        <div className="resell_header">{el.title}</div>
                        <div className="modal__break"></div>
                        <div className="resell_article_container">
                          <div>{`in `}</div>
                          <div className="resell_festival">
                            {`# ` + el.festival.name}
                          </div>
                          <div className="resell_nickName">
                            <span className="wall" />
                            {`by ` + el.user.nickname}
                          </div>
                          <div className="resell_attribute">
                            <span className="wall" />
                            {Moment(el.createdAt).fromNow()}
                          </div>
                        </div>
                        <div className="modal__break"></div>
                      </article>
                      <div className="resell_image">
                        <img
                          className="resell_image"
                          src={
                            el.user.image !== ''
                              ? el.user.image
                              : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                          }
                        ></img>
                      </div>
                    </div>
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
          </div>
          <div className="link">
            <div className="category_header">
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
    </>
  );
};

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

  .resell_container {
    width: 100%;
    height: 100%;
    display: flex;
    // justify-content: space-between;
    color: #64706c;
    padding: 10px;
    background-color: #1d2120;
    box-shadow: 0 0 4px -1px rgb(0 0 0 / 50%);
    border-radius: 0.5rem;
  }
  .resell_article {
    display: block;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
  .resell_header {
    color: #ccc;
    font-size: 30px;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    :hover {
      color: white;
    }
  }

  .resell_article_container {
    gap: 4px;
    display: flex;
    width: 100%;
    flex-direction: row;
    font-size: 15px;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .resell_nickName {
    display: flex;
  }
  .resell_attribute {
    display: flex;
  }
  .resell_image {
    width: 10vh;
    height: 10vh;
    border-radius: 5rem;
  }
`;

const Content = styled.div`
  width: 100%;
  color: #ccc;
  display: grid;
  grid-template-columns: 15% 45% 5%;
  grid-gap: 1.5rem;
  justify-content: center;
`;

const Category = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
  color: #ccc;
  padding: 10px;

  .category_header {
    padding: 15px;
    background-color: #1d2120;
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
    background-color: #1d2120;
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

const ContentContainer = styled.div`
  width: 100%;
  padding-left: 10rem;
  padding-right: 10rem;
  background: url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);
  // min-height: 1280px;

  .wall {
    display: inline;
    box-sizing: border-box;
    margin-right: 4px;
    margin-left: 4px;
    padding: 0.5px;
    height: 100%;
    background-color: #ccc;
  }

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
  .modal__break {
    max-width: 95%;
    height: 1.5px;
    opacity: 0.5;
    position: relative;
    background: linear-gradient(to right, white 0%, #999 100%);
  }
  .resell_items {
    padding: 10px;
    display: grid;
    width: 100%;
    grid-gap: 15px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 20%), 0 2px 4px -1px rgb(0 0 0 / 20%);
  }
`;

export default Resell;
