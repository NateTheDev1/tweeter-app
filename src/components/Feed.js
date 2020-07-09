import React, { useState } from "react";
import styled from "styled-components";
import NewTweet from "./NewTweet";
import Tweet from "./Tweet";
import { RedoOutlined } from "@ant-design/icons";
import { Tooltip, Empty } from "antd";
import { connect } from "react-redux";
import { getAllPosts } from "../actions/authActions";
import ProfileModal from "./ProfileModal";
import CommentModal from "./PostModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "Mukta", sans-serif;
  border: 1px solid #e6ecf0;

  @media (max-width: 735px) {
    padding-top: 16%;
  }

  @media (max-width: 615px) {
    padding-top: 25%;
  }

  && .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2%;
    border-bottom: 1px solid #e6ecf0;
    height: 5vh;
    width: 100%;

    @media (max-width: 735px) {
      background: white;
      position: fixed;
      top: 0;
      z-index: 1;
    }

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

const Feed = ({ posts, getAllPosts }) => {
  const [open, setOpen] = useState(false);
  const [openComment, setComment] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTweet, setSelectedTweet] = useState(null);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(!open);
  };

  const handleComment = (tweet) => {
    setSelectedTweet(tweet);
    setComment(!openComment);
  };

  const mapPosts = () => {
    return posts.map((p) => (
      <Tweet
        tweet={p}
        key={p._id}
        handleOpen={handleOpen}
        handleComment={handleComment}
      />
    ));
  };

  return (
    <Container>
      <ProfileModal open={open} setOpen={setOpen} user={selectedUser} />
      <CommentModal
        open={openComment}
        setOpen={setComment}
        tweet={selectedTweet}
      />
      <div className="header">
        <h2>Home</h2>
        <Tooltip placement="right" title="Refresh">
          <RedoOutlined className="refresh" onClick={getAllPosts} />
        </Tooltip>
      </div>
      <NewTweet />
      <div>
        {posts.length <= 0 ? (
          <Empty
            style={{ marginTop: "5%" }}
            imageStyle={{ height: 150 }}
            description={
              <span style={{ fontSize: "1.2rem" }}>
                Nobody has made a tweet yet
              </span>
            }
          />
        ) : (
          mapPosts()
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts,
  };
};

export default connect(mapStateToProps, { getAllPosts })(Feed);
