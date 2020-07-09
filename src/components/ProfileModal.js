import React, { useState, useEffect } from "react";
import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";
import { Avatar, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Moment from "react-moment";
import Tweet from "./Tweet";
import Axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  font-family: "Mukta", sans-serif;

  & h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2%;
  }

  && .header {
    padding: 2%;
    display: flex;
    flex-direction: column;
    padding: 3%;

    min-height: 8vh;
    width: 100%;

    & p {
      font-size: 1.3rem;
    }
  }

  && .top {
    padding: 2%;

    & h2 {
      margin-top: 5%;
    }

    & p {
      font-size: 1.2rem;
    }

    & .joined {
      color: black;
      margin-top: 2%;
    }
  }
`;

const ProfileModal = ({ open, setOpen, user, expandable }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user !== null) {
      Axios.get(
        `https://tweeter-app-api.herokuapp.com/api/posts/${user.account}`
      )
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const mapPosts = () => {
    return posts.map((p) => (
      <Tweet tweet={p} key={p._id} expandable={expandable} />
    ));
  };

  if (user === null) {
    return null;
  }

  return (
    <Modal
      bodyStyle={{ height: "75vh" }}
      width="75vh"
      visible={open}
      onCancel={() => setOpen(!open)}
      title={
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 400,
            marginTop: "2%",
            marginBottom: "2%",
            color: "#1DA1F2",
          }}
        >
          @{user.username}
        </h1>
      }
      footer={null}
    >
      <Container
        style={{ overflow: "scroll", height: "100%", overflowX: "hidden" }}
      >
        <div className="header">
          <h2>{user.fullName}</h2>
          <p>
            {user.likedPosts.length} Lifetime{" "}
            {user.likedPosts.length === 1 ? "Interaction" : "Interactions"}
          </p>
        </div>
        <div className="top">
          <Avatar
            size={96}
            style={{ minWidth: "64px", marginTop: "5%" }}
            icon={
              user.avatar === null ? (
                <UserOutlined />
              ) : (
                <img src={user.avatar} />
              )
            }
          />
          <p className="joined">
            Joined <Moment fromNow>{user.createdAt}</Moment>
          </p>
          <p style={{ marginTop: "2%" }}>Bio feature in development 🎉 </p>
        </div>
        <div className="feed">
          {posts.length <= 0 ? (
            <Empty
              style={{ marginTop: "5%" }}
              imageStyle={{ height: 150 }}
              description={
                <span style={{ fontSize: "1.2rem" }}>
                  You have not made a tweet yet
                </span>
              }
            />
          ) : (
            mapPosts()
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default ProfileModal;
