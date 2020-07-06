import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import Axios from "axios";
import Moment from "react-moment";
import { connect } from "react-redux";
import { likePost } from "../actions/postActions";

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

  && .tweet-link {
    transition: 0.3s;
    width: auto;
    display: flex;
    align-content: center;
    font-size: 1rem;
  }
`;

const Tweet = ({ tweet, likePost, profile }) => {
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(false);
  let [serverLikes, setServerLikes] = useState(tweet.likedBy.length);

  useEffect(() => {
    console.log(tweet);
    Axios.get(
      `https://tweeter-app-api.herokuapp.com/api/user/postprofile/${tweet.postedBy}`
    )
      .then((res) => {
        console.log(res);
        setData(res.data);

        for (let i = 0; i < tweet.likedBy.length; i++) {
          console.log(tweet.likedBy);
          if (tweet.likedBy[i]._id == profile.account) {
            setLiked(true);
          }
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
    } else {
      setLiked(true);
      console.log(data.account);
      likePost(tweet._id, data.account);
      setServerLikes((serverLikes += 1));
    }
  };

  if (data === null) {
    return null;
  }

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar
          size={64}
          style={{ minWidth: "64px" }}
          icon={
            data.avatar.length > 0 ? (
              <img src={data.avatar} />
            ) : (
              <UserOutlined />
            )
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
                <HeartOutlined
                  className="tweet-icon"
                  onClick={handleLike}
                  disabled={liked}
                  style={{ color: liked && "gray", opacity: liked && 0.5 }}
                />
                {serverLikes}{" "}
                {liked && (
                  <p style={{ color: "gray", marginLeft: "2%" }}>
                    You liked this.
                  </p>
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
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, { likePost })(Tweet);
