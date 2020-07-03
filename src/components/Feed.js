import React from "react";
import styled from "styled-components";
import NewTweet from "./NewTweet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Mukta", sans-serif;
  border: 1px solid #e6ecf0;

  && .header {
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #e6ecf0;
    height: 5vh;
    width: 100%;

    & h2 {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`;

const Feed = () => {
  return (
    <Container>
      <div className="header">
        <h2>Home</h2>
      </div>
      <NewTweet />
    </Container>
  );
};

export default Feed;
