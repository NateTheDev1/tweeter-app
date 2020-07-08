import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Tooltip } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  DeleteOutlined,
  RetweetOutlined,
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
    }

    & p {
      color: gray;
      margin-right: 2%;
    }
  }

  && .tweet-content {
    height: 100%;
    color: black;
    line-height: 1.5;
    margin-top: 1%;
    display: flex;
    flex-direction: column;
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
`;

const Tweet = ({
  tweet,
  likePost,
  profile,
  unlikePost,
  deletePost,
  retweet,
}) => {
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [owned, setOwned] = useState(null);
  let [serverLikes, setServerLikes] = useState(tweet.likedBy.length);

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
      content: `Originally posted by: @${data.username} ${tweet.content}`,
      image: tweet.image,
    };
    retweet(newTweet);
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
            <h2>{data.fullName}</h2>
            <p>@{data.username} </p>
            <p>
              <Moment fromNow>{tweet.createdAt}</Moment>
            </p>
          </div>
          <div className="tweet-content">
            <p>{tweet.content}</p>
            {tweet.image && (
              <img
                src={tweet.image}
                style={{
                  maxWidth: "100%",
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
