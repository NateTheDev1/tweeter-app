import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "Mukta", sans-serif;
  border: 1px solid #e6ecf0;
  height: 100vh;

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
    border-bottom: 1px solid #e6ecf0;
    min-height: 8vh;
    width: 100%;
  }

  && .top {
    padding: 2%;
    border-bottom: 1px solid #e6ecf0;
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

const Profile = ({ profile }) => {
  return (
    <Container>
      <div className="header">
        <h2>Eliza Christopher</h2>
        <p>13 Lifetime Interactions</p>
      </div>
      <div className="top">
        <Avatar
          size={128}
          style={{ minWidth: "64px", marginTop: "5%" }}
          icon={<UserOutlined />}
        />
        <h2>Eliza Christopher</h2>
        <p>@Username</p>
        <p className="joined">Joined 13 days ago</p>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, {})(Profile);
