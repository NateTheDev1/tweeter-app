import React, { useState, useEffect } from "react";
import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";
import Moment from "react-moment";
import { Empty, Avatar, Input, Tooltip } from "antd";
import Axios from "axios";
import { connect } from "react-redux";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  font-family: "Mukta", sans-serif;

  && .new-comment {
    height: 30%;
  }

  && .text-area {
    font-family: "Mukta", sans-serif;
    border: none;
    border-bottom: 10px solid #e6ecf0;
    margin-bottom: 2%;
    margin-left: 2%;
    width: 90%;
    resize: none;
    color: black;

    @media (max-width: 735px) {
      width: 100%;
    }
  }

  && .ant-input {
    font-size: 1.2rem;
  }

  && .text-area:focus {
    box-shadow: none;
    border: none;
    outline: none;
    border-bottom: 10px solid #e6ecf0;
  }

  && .text-area:hover {
    box-shadow: none;
    border: none;
    border-bottom: 10px solid #e6ecf0;
  }

  && .anticon-close-circle {
    font-size: 1.2rem;
  }

  & h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2%;
  }

  && .header {
    padding: 2%;
    display: flex;
    flex-direction: column;
    padding: 3%;

    min-height: 8vh;
    width: 100%;

    & p {
      font-size: 1.3rem;
    }
  }

  && .top {
    padding: 2%;

    & h2 {
      margin-top: 5%;
    }

    & p {
      font-size: 1.2rem;
    }

    & .joined {
      color: black;
      margin-top: 2%;
    }
  }

  && button {
    color: white;
    background: #4693d9;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 2%;
    width: 150px;
    height: 50px;
    border-radius: 25px;

    @media (max-width: 735px) {
      width: 100px;
      height: 35px;
    }
  }

  && button:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  && .avatar {
    @media (max-width: 735px) {
      display: none;
    }
  }

  && .tweet-delete {
    color: gray;
    opacity: 0.75;
    transition: 0.3s;
  }

  && .tweet-delete:hover {
    cursor: pointer;
    color: #dc3545;
    opacity: 0.9;
  }
`;

const PostModal = ({ tweet, open, setOpen, profile }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [owned, setOwned] = useState(false);

  const mapComments = () => {
    return comments.map((c) => (
      <div
        key={c._id}
        style={{
          borderTop: "1px solid #e6ecf0",
          borderBottom: "1px solid #e6ecf0",
          marginTop: "3%",
        }}
      >
        <p style={{ color: "black", fontSize: "1.4rem" }}>{c.content}</p>
        <h1>@{c.postedBy}</h1>
        <p>
          <Moment fromNow>{c.createdAt}</Moment>
        </p>
        {c.postedBy == profile.username && (
          <Tooltip placement="right" title="Delete Comment">
            <DeleteOutlined
              onClick={() => handleDelete(c)}
              style={{
                marginTop: "2%",
                fontSize: "1.5rem",
              }}
              className="tweet-delete"
            />
          </Tooltip>
        )}
      </div>
    ));
  };

  useEffect(() => {
    if (tweet !== null) {
      Axios.get(
        `https://tweeter-app-api.herokuapp.com/api/posts/${tweet._id}/comments`
      )
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tweet]);

  const handleComment = (e) => {
    e.preventDefault();
    const profile = JSON.parse(localStorage.getItem("profile"));
    const newComment = {
      postedBy: profile.username,
      content: content,
      postId: tweet._id,
    };
    Axios.post(
      "https://tweeter-app-api.herokuapp.com/api/posts/comments",
      newComment
    )
      .then((res) => {
        setContent("");
        if (tweet !== null) {
          Axios.get(
            `https://tweeter-app-api.herokuapp.com/api/posts/${tweet._id}/comments`
          )
            .then((res) => {
              setComments(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (comment) => {
    Axios.delete(
      `https://tweeter-app-api.herokuapp.com/api/posts/comments/${comment._id}`
    )
      .then((res) => {
        if (tweet !== null) {
          Axios.get(
            `https://tweeter-app-api.herokuapp.com/api/posts/${tweet._id}/comments`
          )
            .then((res) => {
              setComments(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (tweet === null) {
    return null;
  }

  return (
    <Modal
      bodyStyle={{ height: "75vh" }}
      width="75vh"
      visible={open}
      onCancel={() => setOpen(!open)}
      title={
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 400,
            marginTop: "2%",
            marginBottom: "2%",
            color: "#1DA1F2",
          }}
        >
          Posted <Moment fromNow>{tweet.createdAt}</Moment>
        </h1>
      }
      footer={null}
    >
      <Container
        style={{ overflow: "scroll", height: "100%", overflowX: "hidden" }}
      >
        {comments.length < 1 ? (
          <div className="new-comment">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "3%",
                width: "100%",
              }}
            >
              <Avatar
                className="avatar"
                size={96}
                icon={
                  !profile.avatar ? (
                    <UserOutlined />
                  ) : (
                    <img src={profile.avatar} />
                  )
                }
              />
              <Input.TextArea
                rows={3}
                placeholder="Provide inspirational input 💡..."
                allowClear
                className="text-area"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleComment}
                type="submit"
                disabled={
                  content.length > 0 && content.length < 200 ? false : true
                }
              >
                Reply
              </button>
            </div>
            <h1
              style={{
                marginTop: "2%",
                marginBottom: "3%",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              Comments
            </h1>
            <hr />
            <Empty
              style={{ marginTop: "5%" }}
              imageStyle={{ height: 150 }}
              description={
                <span style={{ fontSize: "1.2rem" }}>
                  Nobody has commented yet
                </span>
              }
            />
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: "3%",
              }}
            >
              <Avatar
                className="avatar"
                size={96}
                icon={
                  !profile.avatar ? (
                    <UserOutlined />
                  ) : (
                    <img src={profile.avatar} />
                  )
                }
              />
              <Input.TextArea
                rows={3}
                placeholder="Provide inspirational input 💡..."
                allowClear
                className="text-area"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleComment}
                type="submit"
                disabled={
                  content.length > 0 && content.length < 200 ? false : true
                }
              >
                Reply
              </button>
            </div>
            <h1
              style={{
                marginTop: "2%",
                marginBottom: "3%",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              Comments
            </h1>
            <hr />
            {mapComments()}
          </div>
        )}
      </Container>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, {})(PostModal);
