import React from "react";
import styled from "styled-components";
import NewTweet from "./NewTweet";
import Tweet from "./Tweet";
import { RedoOutlined } from "@ant-design/icons";
import { Tooltip, Empty } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Mukta", sans-serif;
  border: 1px solid #e6ecf0;

  && .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2%;
    border-bottom: 1px solid #e6ecf0;
    height: 5vh;
    width: 100%;

    & h2 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    & .refresh {
      font-size: 1.2rem;
      color: #1da1f2;
      transition: 0.2s;
    }

    & .refresh:hover {
      opacity: 0.9;
      cursor: pointer;
      font-size: 1.8rem;
    }
  }
`;

const Feed = () => {
  return (
    <Container>
      <div className="header">
        <h2>Home</h2>
        <Tooltip placement="right" title="Refresh">
          <RedoOutlined className="refresh" />
        </Tooltip>
      </div>
      <NewTweet />
      <div>
        {/* <Tweet
          tweet={{
            name: "Nathaniel Richards",
            username: "NateTheDev",
            image:
              "https://pbs.twimg.com/media/Eb8eoWBXQAMaykF?format=jpg&name=small",
          }}
        /> */}
        <Empty
          style={{ marginTop: "5%" }}
          imageStyle={{ height: 150 }}
          description={
            <span style={{ fontSize: "1.2rem" }}>
              Nobody has made a post yet
            </span>
          }
        />
      </div>
    </Container>
  );
};

export default Feed;
