import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'boxicons';
import { useDispatch, useSelector } from 'react-redux';
import { postParticAsync } from '../modules/participant';
import {
  deleteCommentAsync,
  getCommentAsync,
  postCommentAsync,
} from '../modules/comment';
import { deleteBoardAsync, getBoardAsync } from '../modules/board/actions';
import { RootState } from '../modules';
import { BoardFestival, comment, participantlist } from '../api/board';
import Moment from 'moment';
import 'moment/locale/en-nz';

interface JoinProps {
  boardId: string;
  _id: string;
  nick: string;
  participants: participantlist[] | null;
  comments: comment[] | null;
}

const CompanionJoin = ({
  boardId,
  nick,
  participants,
  comments,
  _id,
}: JoinProps): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleShowUp = () => setShow(!show);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentAsync.request(boardId));
  }, []);

  //------------------------ DELETE comment logic -----------------------
  const [commentId, setCommentId] = useState<string>('');
  const deleteCommentHandler = () => {
    const dele = { commentId: commentId };
    dispatch(
      deleteCommentAsync.request({
        commentData: dele,
      }),
    );
    dispatch(getBoardAsync.request('601252586adcbda1c23a9302'));
  };

  // ----------------------- DELETE board logic --------------------------

  const { login } = useSelector((state: RootState) => state.login.userInfo);
  const userInfo = useSelector((state: RootState) => state.userInfo.data);

  const deleteHandler = (): void => {
    if (login) {
      const board = { boardId: boardId };
      dispatch(
        deleteBoardAsync.request({
          postBoardData: board,
        }),
      );
      dispatch(getBoardAsync.request('companion'));
    }
  };

  // ----------------------- Participants logic --------------------------
  const joinHandler = (): void => {
    const particInfo = {
      boardId: boardId,
    };
    dispatch(
      postParticAsync.request({
        postParticData: particInfo,
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
      }),
    );
    dispatch(getBoardAsync.request('601252586adcbda1c23a9302'));
  };

  return (
    <>
      {!show ? (
        <div className="btn">
          {_id === userInfo?._id ? (
            <CompanionShowBtn
              type="submit"
              value="Delete"
              onClick={deleteHandler}
            />
          ) : (
            <div />
          )}
          <CompanionShowBtn type="submit" value="SHOW" onClick={handleShowUp} />
        </div>
      ) : (
        <ParticipantContainer>
          <div className="header">
            <div>
              <input
                type="submit"
                className="participate"
                value="JOIN"
                onClick={joinHandler}
              />
            </div>
          </div>
          <div className="content">
            <div className="content_participant">
              <div className="content_header"> LIST </div>
              <div className="modal__break"></div>
              <div className="participant_lists">{nick}</div>
              {participants?.map((el, index) => {
                return (
                  <div className="participant_lists" key={index}>
                    {el.nickname}
                  </div>
                );
              })}
            </div>
            <div className="content_comment">
              <div className="comment_header">COMMENT</div>
              <div className="modal__break"></div>
              {comments?.map((el, index) => {
                return (
                  <div className="comment_container" key={index}>
                    <div className="comment_user">
                      <img
                        className="comment_userimage"
                        src={
                          el.user.image !== ''
                            ? el.user.image
                            : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                        }
                        alt=""
                      />
                      <div className="comment_id">{el.user.nickname}</div>
                    </div>
                    <div className="comment_description">
                      <div className="comment_id">{el.description}</div>
                      <div className="comment_date">
                        {Moment(el.createdAt).fromNow()}
                      </div>
                      {_id === userInfo?._id ? (
                        <input
                          type="submit"
                          value="x"
                          className="comment_delete"
                          onMouseOver={() => setCommentId(el._id)}
                          onClick={() => deleteCommentHandler()}
                        />
                      ) : (
                        <div />
                      )}
                    </div>
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
              placeholder="Leave a comment..."
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
              value="HIDE"
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
  background-color: #1d2120;
  border-radius: 0.5rem;

  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);

  .bx bx-hot {
    width: 100px;
    height: 100px;
  }
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
    padding: 5px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 1rem;
    box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
      2px 2px 4px -1px rgb(0 0 0 / 10%);
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
    grid-template-columns: 25% auto;
    box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
      2px 2px 4px -1px rgb(0 0 0 / 10%);
    border-radius: 0.5rem;
  }
  .content_participant {
    padding: 10px;
    width: 100%;
    box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
      2px 2px 4px -1px rgb(0 0 0 / 10%);
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
    box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
      2px 2px 4px -1px rgb(0 0 0 / 10%);
    border-radius: 0.5rem;
  }

  .comment_container {
    width: 100%;
    height: 100%;
    max-height: 50px;
    height: 100%;
    padding: 10px;
    display: flex;
  }

  .comment_description {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    // justify-content: center;
  }
  .comment_date {
    display: flex;
    color: #64706c;
    align-items: center;
  }

  .comment_delete {
    color: white;
    background-color: #1d2120;
    cursor: pointer;
    :hover {
      transform: scale(1.2);
    }
  }
  .comment_user {
    width: 30%;
    display: flex;
    justify-content: flex-start;
  }

  .comment_id {
    color: #64706c;
    display: flex;
    padding: 10px;
    height: 100%;
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }
  .comment_userimage {
    display: flex;
    max-width: 2.5vh;
    min-width: 2.5vh;
    max-height: 2.5vh;
    min-height: 2.5vh;
    border-radius: 5rem;
    justify-content: center;
    align-items: center;
  }

  .footer {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
      2px 2px 4px -1px rgb(0 0 0 / 10%);
    border-radius: 0.5rem;
  }
  .comment_box {
    display: flex;
    width: 52%;
    font-size: 14px;
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
  // margin-right: 18px;
`;

export default CompanionJoin;
