import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Input, Tooltip } from "antd";
import {
  UserOutlined,
  FileImageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { FileUpload } from "./Styled/NewUserModalStyled";
import { createPost } from "../actions/authActions";

import Axios from "axios";
const API_KEY = "827878474497588";

const Container = styled.form`
  width: 100%;
  padding: 2%;
  border-bottom: 10px solid #e6ecf0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  && .text-area {
    font-family: "Mukta", sans-serif;
    border: none;
    margin-left: 2%;
    width: 90%;
    resize: none;
    color: black;
  }

  && .ant-input {
    font-size: 1.2rem;
  }

  && .text-area:focus {
    box-shadow: none;
    border: none;
    outline: none;
  }

  && .anticon-close-circle {
    font-size: 1.2rem;
  }

  && button {
    color: white;
    background: #4693d9;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 2%;
    width: 150px;
    height: 50px;
    border-radius: 25px;
  }

  && button:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const Error = styled.p`
  color: #f32013;
  margin-top: 3%;
  margin-bottom: 3%;
`;

const NewTweet = ({ profile, createPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  if (profile === null) {
    return null;
  }

  const handleImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "tweeter");
    data.append("api_key", API_KEY);
    data.append("timestamp", Date.now());
    setImageLoading(true);
    const res = await Axios.post(
      "https://api.cloudinary.com/v1_1/tweeter/image/upload",
      data
    );

    setImage(res.data.url);
    setImageLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const post = {
      content,
      image: image,
    };

    const res = await createPost(post);
    if (res === "OK") {
      setContent("");
      setImage(null);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Avatar
          size={64}
          icon={
            !profile.avatar ? <UserOutlined /> : <img src={profile.avatar} />
          }
        />
        <Input.TextArea
          placeholder="What's happening?"
          allowClear
          autoSize={{ maxRows: 3 }}
          className="text-area"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <img
        style={{ borderRadius: "10px", marginTop: "5%", width: "100%" }}
        src={image}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          color: "#1DA1F2",
          marginTop: "2%",
          justifyContent: "flex-end",
        }}
      >
        {image !== null && (
          <div
            style={{
              marginRight: "5%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              color: "#DC3545",
              fontSize: "1.2rem",
            }}
          >
            <Tooltip placement="top" title="Remove Image">
              <DeleteOutlined
                style={{ marginRight: "3%", fontSize: "1.8rem" }}
                onClick={() => setImage(null)}
              />
            </Tooltip>
          </div>
        )}
        {image === null && (
          <Tooltip placement="top" title="Add Image">
            <FileUpload
              style={{ width: "4%", marginBottom: 0, marginRight: "5%" }}
            >
              <input
                type="file"
                accept="image/*"
                style={{
                  border: "none",
                  display: image !== null ? "none" : null,
                }}
                onChange={handleImage}
              />
              <FileImageOutlined style={{ fontSize: "1.8rem" }} />
            </FileUpload>
          </Tooltip>
        )}
        <button
          type="submit"
          disabled={content.length > 0 && content.length < 200 ? false : true}
        >
          Tweet
        </button>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, { createPost })(NewTweet);
