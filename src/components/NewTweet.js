import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100%;
  padding: 2%;
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
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, {})(NewTweet);
