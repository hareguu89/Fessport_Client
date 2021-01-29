import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { postParticAsync } from '../modules/participant';
import { postCommentAsync } from '../modules/comment';
import { RootState } from '../modules';
import { deleteBoardAsync, getBoardAsync } from '../modules/board/actions';
import { BoardFestival, comment, participantlist } from '../api/board';

interface JoinProps {
  boardId: string;
  img: string;
  nick: string;
  festival: BoardFestival;
  participants: participantlist[];
  comments: comment[];
}

const CompanionJoin = ({
  boardId,
  festival,
  nick,
  participants,
  comments,
}: JoinProps): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleShowUp = () => setShow(!show);
  const dispatch = useDispatch();

  // ----------------------- DELETE board logic --------------------------

  const deleteHandler = (): void => {
    const board = { boardId: boardId };
    dispatch(
      deleteBoardAsync.request({
        postBoardData: board,
        accessToken: 'acc',
      }),
    );
    dispatch(getBoardAsync.request('601252586adcbda1c23a9302'));
  };

  // ----------------------- Participants logic --------------------------
  const joinHandler = (): void => {
    const particInfo = {
      boardId: boardId,
    };
    // const accessToken = localStorage.getItem('accessToken');
    const accessToken = 'acc';
    dispatch(
      postParticAsync.request({
        postParticData: particInfo,
        accessToken,
      }),
    );
  };

  // ----------------------- comment logic --------------------------
  const { data } = useSelector(
    (state: RootState) => state.commentData.commentData,
  );
  const [comment_post, setComment] = useState<string>('');
  const commentHandler = () => {
    const commentForm = { boardId: boardId, description: comment_post };
    dispatch(
      postCommentAsync.request({
        commentData: commentForm,
        accessToken: 'acc',
      }),
    );
    dispatch(getBoardAsync.request('601252586adcbda1c23a9302'));
  };

  return (
    <>
      {!show ? (
        <div className="btn">
          <CompanionShowBtn
            type="submit"
            value="Delete"
            onClick={deleteHandler}
          />
          <CompanionShowBtn type="submit" value="Show" onClick={handleShowUp} />
        </div>
      ) : (
        <ParticipantContainer>
          <div className="header">
            {/* <div className="image"> 이미지 </div> */}
            <div className="header_container">
              <div className="festival">FESITVAL : {festival.name}</div>
            </div>
            <div>
              <input
                type="submit"
                className="participate"
                value="JOIN"
                onClick={joinHandler}
              />
            </div>
          </div>
          <div className="modal__break"></div>
          <div className="content">
            <div className="content_participant">
              <div className="content_header"> PARTICIPANTS LIST </div>
              <div className="modal__break"></div>
              <div className="participant_lists">{nick}</div>
              {participants.map((el, index) => {
                return (
                  <div className="participant_lists" key={index}>
                    {el.nickName}
                  </div>
                );
              })}
            </div>
            <div className="content_comment">
              <div className="comment_header"> COMMENT </div>
              <div className="modal__break"></div>
              {comments.map((el, index) => {
                return (
                  <div className="comment_container" key={index}>
                    {/* <img
                      className="comment_userimage"
                      src={
                        img
                          ? img
                          : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                      }
                      alt=""
                    /> */}
                    <div className="comment_id">{el.nickName}</div>
                    <span className="wall"></span>
                    <div className="comment_id">{el.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal__break"></div>
          <div className="footer">
            <input
              className="comment_box"
              type="text"
              placeholder={nick + `${'님의 댓글을 입력하세요.'}`}
              onChange={(e) => setComment(e.target.value)}
            />
            <span className="wall"></span>
            <CompanionHideBtn
              type="submit"
              value="SUBMIT"
              onClick={commentHandler}
            />
            <span className="wall"></span>
            <CompanionHideBtn
              type="submit"
              value="Hide"
              onClick={handleShowUp}
            />
          </div>
        </ParticipantContainer>
      )}
    </>
  );
};
const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #ccc;

  .modal__break {
    max-width: 95%;
    height: 1.2px;
    opacity: 0.5;
    position: relative;
    background: linear-gradient(to right, white 0%, #999 100%);
  }
  .header {
    background-color: none;
    display: flex;
    padding: 10px;
    align-items: center;
    border-radius: 1rem;
  }
  .image {
    // padding: 10px;
    margin-left: 20px;
    min-width: 20vh;
  }
  .header_container {
    // min-width: 50vh;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .title {
    display: flex;
    padding: 10px;
    width: 100%;
  }
  .festival {
    display: flex;
    // padding: 10px;
    width: 100%;
    font-size: 20px;
  }
  .participate {
    background-color: orange;
    display: flex;
    // justify-content: flex-end;
    padding: 10px;
    cursor: pointer;
    width: auto;
  }

  .content {
    background-color: none;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 30% auto;
  }
  .content_participant {
    padding: 10px;
    width: 100%;
  }
  .content_header {
    flex-direction: column;
    padding: 10px;
    text-align: center;
    font-size: 20px;
  }
  .participant_lists {
    padding: 15px;
    text-align: center;
  }

  .comment_header {
    text-align: center;
    background-color: none;
    font-size: 20px;
    padding: 10px;
    width: 100%;
  }
  .content_comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
  }
  .comment_container {
    width: 100%;
    max-height: 40px;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comment_id {
    display: flex;
    padding: 10px;
    width: auto;
    height: 100%;
    font-size: 20px;
    justify-content: center;
    align-items: center;
  }
  .comment_userimage {
    display: flex;
    padding: 10px;
    width: 70px;
    height: 70px;
    border-radius: 5rem;

    justify-content: center;
    align-items: center;
  }

  .footer {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .comment_box {
    display: flex;
    width: 50%;
    font-size: 20px;
    color: black;
    background-color: white;
  }
  .wall {
    margin-left: 0.375rem;
    margin-right: 0.375rem;
  }
`;

const CompanionHideBtn = styled.input`
  cursor: pointer;
  padding: 10px;
  background-color: orange;
`;

const CompanionShowBtn = styled.input`
  background-color: orange;
  padding: 10px;
  cursor: pointer;
  margin-right: 18px;
`;

export default CompanionJoin;
