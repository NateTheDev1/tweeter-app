import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Axios from "axios";
import Moment from "react-moment";

const API_KEY = "b3d9037c88b686552ab2ca4bcbe6479f";

const Container = styled.div`
  font-family: "Mukta", sans-serif;
  width: 20%;
  min-width: 15%;
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
    & p {
      color: gray;
      margin-bottom: 3%;
    }
  }

  && .article {
    padding: 2%;
    margin-top: 3%;

    & p {
      color: gray;
      margin-bottom: 3%;
    }

    & h2 {
      margin-top: 3%;
      font-size: 1.3rem;
    }
  }
`;

const NewsFeed = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Axios.get(`https://gnews.io/api/v3/top-news?token=${API_KEY}&max=4`)
    //   .then((res) => {
    //     setData(res.data.articles);
    //   })
    //   .catch((err) => {
    //     setData([]);
    //     setError(err.response.message);
    //   });
  }, []);

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
        {error}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.map((article) => (
            <div className="article">
              <a href={article.url} target="_blank">
                <p>{article.source.name}</p>
                <p>
                  Published <Moment fromNow>{article.publishedAt}</Moment>
                </p>
                <h2>{article.title}</h2>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div>
        <a href="https://nathanielrichards.dev" target="_blank">
          Our Creator 👑{" "}
        </a>
        <p style={{ marginTop: "5%" }}>© 2020 Tweeter, Inc.</p>
      </div>
    </Container>
  );
};

export default NewsFeed;
