import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Tooltip } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  DeleteOutlined,
  RetweetOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  likePost,
  unlikePost,
  deletePost,
  retweet,
} from "../actions/postActions";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div`
  width: 100%;
  padding: 2%;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;

  && .tweet-top-container {
    width: 100%;
    margin-top: 1%;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
  }

  && .tweet-top {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & h2 {
      font-size: 1.2rem;
      font-weight: 700;
      color: black;
      margin-right: 2%;
      text-decoration: underline;
      transition: 0.3s;

      &:hover {
        text-decoration-color: #1da1f2;
        cursor: pointer;
      }
    }

    & p {
      color: gray;
      margin-right: 2%;
      @media (max-width: 735px) {
        margin-top: 2%;
      }
    }
  }

  && .tweet-content {
    height: 100%;
    color: black;
    line-height: 1.5;
    margin-top: 1%;
    display: flex;
    flex-direction: column;

    @media (max-width: 735px) {
      margin-top: 2%;
    }
  }

  && .tweet-links {
    margin-top: 2%;
  }

  && .tweet-icon {
    font-size: 1.4rem;
    margin-right: 2%;
  }

  && .tweet-link:hover {
    cursor: pointer;
    opacity: 0.9;
    color: #dc3545;
  }

  && .tweet-delete {
    color: gray;
    opacity: 0.75;
    transition: 0.3s;
  }

  && .tweet-delete:hover {
    color: #dc3545;
    opacity: 0.9;
    cursor: pointer;
  }

  && .tweet-link {
    transition: 0.3s;
    width: auto;
    display: flex;
    align-content: center;
    font-size: 1rem;
  }

  && .retweet-link {
    & .retweet {
      color: gray;
      opacity: 0.75;
      transition: 0.3s;
    }

    & .retweet:hover {
      color: #3ac430;
      opacity: 0.9;
    }
  }
  && .mention {
    color: white;
    padding-left: 2%;
    padding-right: 2%;
    border-radius: 8px;
    background: #1da1f2;
    margin-right: 2%;
  }

  && .comment {
    color: gray;
    opacity: 0.75;
    transition: 0.3s;

    &:hover {
      color: #4693d9;
      opacity: 0.9;
    }
  }
`;

const Tweet = ({
  handleOpen,
  handleComment,
  tweet,
  likePost,
  profile,
  unlikePost,
  deletePost,
  retweet,
  expandable = true,
}) => {
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [owned, setOwned] = useState(null);
  let [serverLikes, setServerLikes] = useState(tweet.likedBy.length);
  const [mention, setMention] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    Axios.get(
      `https://tweeter-app-api.herokuapp.com/api/user/postprofile/${tweet.postedBy}`
    )
      .then((res) => {
        setData(res.data);

        for (let i = 0; i < tweet.likedBy.length; i++) {
          if (tweet.likedBy[i]._id == profile.account) {
            setLiked(true);
            break;
          }
        }
        if (tweet.postedBy === profile.account) {
          setOwned(true);
        } else {
          setOwned(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setContent(handleRetweetText(tweet.content));
  }, []);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setServerLikes((serverLikes -= 1));
      unlikePost(tweet._id, profile.account);
    } else {
      setLiked(true);

      likePost(tweet._id, profile.account);
      setServerLikes((serverLikes += 1));
    }
  };

  const handleDelete = () => {
    deletePost(tweet._id);
  };

  const handleRetweet = () => {
    const newTweet = {
      content: `@${data.username} ${tweet.content}`,
      image: tweet.image,
    };
    retweet(newTweet);
  };

  const handleRetweetText = (str) => {
    if (str.includes("@")) {
      let parts = str.split(" ");
      let mention_ref = `  ${parts.shift()} `;
      setMention(mention_ref);
      return parts.join(" ");
    } else {
      return str;
    }
  };

  if (data === null || owned === null || profile === null) {
    return (
      <Spin
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
        }}
        indicator={<LoadingOutlined spin />}
      />
    );
  }

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar
          size={64}
          style={{ minWidth: "64px" }}
          icon={
            data.avatar !== null ? <img src={data.avatar} /> : <UserOutlined />
          }
        />
        <div className="tweet-top-container">
          <div className="tweet-top">
            <h2 onClick={() => handleOpen(data)}>{data.fullName}</h2>
            <p>@{data.username} </p>
            <p>
              <Moment fromNow>{tweet.createdAt}</Moment>
            </p>
          </div>
          <div className="tweet-content">
            <p>
              {mention.length > 1 && <span className="mention">{mention}</span>}
              {content}
            </p>
            {tweet.image && (
              <img
                src={tweet.image}
                style={{
                  maxWidth: "50%",
                  height: "350px",
                  background: "black",
                  objectFit: "contain",
                  borderRadius: "11px",
                  marginTop: "1%",
                }}
              />
            )}
            <div className="tweet-links">
              <div className="tweet-link">
                {owned ? null : (
                  <HeartOutlined
                    className="tweet-icon"
                    onClick={handleLike}
                    disabled={liked}
                    style={{ color: liked && "gray", opacity: liked && 0.5 }}
                  />
                )}
                {owned
                  ? serverLikes === 1
                    ? `${serverLikes} like`
                    : `${serverLikes} likes`
                  : `${serverLikes}`}
                {liked && (
                  <p style={{ color: "gray", marginLeft: "2%" }}>
                    You liked this.
                  </p>
                )}
              </div>
              <div className="tweet-link">
                {owned && (
                  <Tooltip placement="right" title="Delete Post">
                    <DeleteOutlined
                      style={{
                        marginTop: "2%",
                        fontSize: "1.5rem",
                      }}
                      className="tweet-delete"
                      onClick={handleDelete}
                    />
                  </Tooltip>
                )}
              </div>
              <div className="retweet-link">
                {!owned && (
                  <Tooltip placement="right" title="Retweet Post">
                    <RetweetOutlined
                      style={{
                        marginTop: "2%",
                        fontSize: "1.5rem",
                      }}
                      className="retweet"
                      onClick={handleRetweet}
                    />
                  </Tooltip>
                )}
              </div>
              {expandable && (
                <div className="tweet-link">
                  <Tooltip placement="right" title="Comment">
                    <CommentOutlined
                      style={{
                        marginTop: "2%",
                        fontSize: "1.5rem",
                      }}
                      className="comment"
                      onClick={() => handleComment(tweet)}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: JSON.parse(localStorage.getItem("profile")),
  };
};

export default connect(mapStateToProps, {
  likePost,
  unlikePost,
  deletePost,
  retweet,
})(Tweet);
