import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const API_KEY = "833b3e3f81ad40dcb82824c972108351";

const Container = styled.div`
  font-family: "Mukta", sans-serif;
  min-width: 20%;
  padding: 1%;
  height: 100vh;
  margin-left: 60%;
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  && .top-news {
    height: 75vh;
    background: #f5f8fa;
    padding: 5%;
    border-radius: 10px;

    & h2 {
      font-size: 1.5rem;
      width: 100%;
      font-weight: 700;
      padding-bottom: 2%;
      border-bottom: 1px solid #e6ecf0;
    }
  }
`;

const NewsFeed = () => {
  const [data, setData] = useState(null);

  useEffect(() => {}, []);

  if (data === null) {
    return (
      <Container>
        <div className="top-news">
          <h2>What's Happening</h2>
          <Spin
            size="large"
            style={{
              marginTop: "25%",
              marginLeft: "40%",
            }}
            indicator={<LoadingOutlined spin />}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="top-news">
        <h2>What's Happening</h2>
      </div>
    </Container>
  );
};

export default NewsFeed;
