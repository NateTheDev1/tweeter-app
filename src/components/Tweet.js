import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined, HeartOutlined } from "@ant-design/icons";

const Container = styled.div`
  width: 100%;
  padding: 2%;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;

  width: 100%;

  && .tweet-top {
    width: 60%;
    justify-content: space-between;
    align-items: center;
    display: flex;

    & h2 {
      font-size: 1.2rem;
      font-weight: 700;
      color: black;
    }

    & p {
      color: gray;
    }
  }

  && .tweet-top-container {
    width: 90%;
    margin-top: 1%;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
  }

  && .tweet-content {
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
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar size={64} icon={<UserOutlined />} />
        <div className="tweet-top-container">
          <div className="tweet-top">
            <h2>{tweet.name} </h2>
            <p>@{tweet.username}</p> • <p>27m</p>
          </div>
          <div className="tweet-content">
            <p>{tweet.content}</p>
            {tweet.image && (
              <img
                src={tweet.image}
                style={{
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
