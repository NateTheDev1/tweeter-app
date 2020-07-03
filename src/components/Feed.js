import React from "react";
import styled from "styled-components";
import NewTweet from "./NewTweet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Mukta", sans-serif;
  border: 5px solid #f8f9fa;

  && .header {
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 3px solid #f8f9fa;
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
