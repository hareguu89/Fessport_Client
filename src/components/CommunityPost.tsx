import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync, postBoardAsync } from '../modules/board';

const CommunityPostContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const [festivalId, setFestivalId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // FESTIVAL 정보 받아와서 카테고리 만들어주기.
  // const { data } = useSelector((state: RootState) => state.boardData.boardData);
  // useEffect(() => {
  // if (data) {
  // dispatch(getFesstivalAsync.request( ?? ));
  // }
  // }, []);

  const onSubmitHandler = () => {
    const form = {
      festivalId: festivalId,
      boardCategoryId: category,
      title: title,
      description: description,
      Image: null,
    };

    dispatch(
      postBoardAsync.request({
        postBoardData: form,
        accessToken: 'acc',
      }),
    );
  };

  return (
    <>
      <Container>
        <Header>
          <h2 className="companion_head">POST</h2>
        </Header>
        <ContentContainer>
          <Content>
            <Category>
              <div className="category_header">Category</div>
              <div
                className="category_list"
                onClick={() => {
                  setCategory('601252586adcbda1c23a9302');
                }}
              >
                # 동행 글 쓰기
              </div>
              <div
                className="category_list"
                onClick={() => {
                  setCategory('601252586adcbda1c23a9303');
                }}
              >
                # 사고팔기 글 쓰기
              </div>
              <div
                className="category_list"
                onClick={() => {
                  setCategory('601252586adcbda1c23a9304');
                }}
              >
                # 후기 글 쓰기
              </div>
            </Category>
            <CompanionPost>
              <header className="post_header">
                <div className="head">새로운 글 등록.</div>
                <input
                  type="text"
                  placeholder="제목을 입력하세요."
                  className="head_title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <select
                  className="head_category"
                  onChange={(e) => setFestivalId(e.target.value)}
                >
                  <option value="placeholder">페스티벌 고르기</option>
                  {/* {festival.map((el, index) => {
                    return (
                      <option
                        // value={el.festival.name
                        //   // TODO: festival 정보 받아와서 뿌려주기.
                        // }
                        key={index}
                      />
                    );
                  })} */}
                </select>
              </header>
              <div className="post_article">
                <textarea
                  className="text"
                  placeholder="내용을 입력하세요."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <footer className="post_footer">
                <input
                  type="submit"
                  className="footer_btn"
                  value="SUBMIT"
                  onClick={onSubmitHandler}
                />
                <span className="wall"></span>
                <input type="submit" className="footer_btn" value="BACK >" />
              </footer>
            </CompanionPost>
          </Content>
        </ContentContainer>
      </Container>
    </>
  );
};

const CompanionPost = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: rgb(46, 50, 51);
  margin-top: 15px;
  color: #ccc;
  border-radius: 0.5rem;

  .post_header {
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: center;
  }

  .head {
    border-radius: 0.5rem;
    text-align: center;
    padding: 10px;
    font-size: 24px;
  }

  .head_title {
    background-color: white;
    display: flex;
    font-size: 20px;
    padding: 10px;
    width: 100%;
    position: center;
    border-bottom: 1px solid #666;
  }

  .head_category {
    font-size: 14px;
    width: 100%;
    padding: 10px;
  }

  .post_article {
    padding: 10px;
  }

  .text {
    font-size: 20px;
    padding: 10px;
    width: 100%;
    min-height: 200px;
    max-height: 200px;
    min-width: 100%;
    max-width: 100%;
  }

  .post_footer {
    padding: 10px;
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
  }

  .footer_btn {
    background-color: orange;
    display: flex;
    padding: 10px;
    cursor: pointer;
    width: auto;
  }

  .wall {
    margin-left: 0.375rem;
    margin-right: 0.375rem;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 20% 70%;
  grid-gap: 10px;
`;

const ContentContainer = styled.div`
  background: url(https://wallpapercave.com/wp/wp1889482.jpg);
  padding-left: 10rem;
  padding-right: 10rem;
  min-height: 580px;
`;

const Category = styled.div`
  display: block;
  box-sizing: border-box;
  color: #ccc;
  padding: 10px;

  .category_header {
    background-color: rgb(46, 50, 51);
    padding: 15px;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    border-radius: 0.5rem;
    margin: 5px;
  }

  .category_list {
    border-radius: 0.5rem;
    padding: 5px;
    padding-left: 10px;
    background-color: rgb(46, 50, 51);
    margin: 5px;
    display: block;
    font-size: 20px;
    cursor: pointer;
    // color: #333;
    transition: all 0.9s, color 0.3;
    &: hover {
      background-color: #333;
      border-bottom: 0;
    }
  }
`;

const Container = styled.div`
  height: 100px;
  padding-top: 5rem;
`;

const Header = styled.div`
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 6.7rem;

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
    color: #ccc;
  }
`;

export default CommunityPostContainer;
