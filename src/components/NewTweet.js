import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100%;
  padding: 2%;
  display: flex;
  align-items: center;
  border-bottom: 10px solid #e6ecf0;
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
`;

const NewTweet = ({ profile }) => {
  if (profile === null) {
    return null;
  }

  return (
    <Container>
      <Avatar
        size={64}
        icon={!profile.avatar ? <UserOutlined /> : <img src={profile.avatar} />}
      />
      <Input.TextArea
        placeholder="What's happening?"
        allowClear
        autoSize={{ maxRows: 3 }}
        className="text-area"
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, {})(NewTweet);
