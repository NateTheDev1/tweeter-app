import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import Axios from "axios";
import Moment from "react-moment";

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

const Tweet = ({ tweet }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(tweet);
    Axios.get(
      `https://tweeter-app-api.herokuapp.com/api/user/postprofile/${tweet.postedBy}`
    )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  height: "auto",
                  background: "black",
                  objectFit: "contain",
                  borderRadius: "11px",
                  marginTop: "1%",
                }}
              />
            )}
            <div className="tweet-links">
              <div className="tweet-link">
                <HeartOutlined className="tweet-icon" />
                {tweet.likedBy.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Tweet;
