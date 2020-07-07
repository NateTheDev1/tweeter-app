import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import Feed from "./Feed";
import Profile from "./Profile";
import NewsFeed from "./NewsFeed";
import Activity from "./Activity";
import { useHistory, Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import crowLogo from "../images/crowLogo.png";
import {
  RedoOutlined,
  HomeOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  box-sizing: border-box;
  height: 100vh;

  @media (max-width: 735px) {
    flex-direction: column;
  }

  && .page-content {
    margin-left: 25%;
    width: 50%;

    @media (max-width: 1440px) {
      margin-left: 20%;
    }

    @media (max-width: 1050px) {
      margin-left: 22%;
      width: 75%;
    }

    @media (max-width: 735px) {
      flex-direction: column;
      margin-left: 0;
      width: 100%;
      height: auto;
    }
  }
  && .mobile-nav {
    display: none;
    & .logo {
      height: 30px;
    }
    @media (max-width: 735px) {
      flex-wrap: wrap;
      width: 100%;
      background: white;
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8%;
      padding-bottom: 5%;
      padding-left: 2%;
      padding-right: 2%;
      z-index: 1;
      flex-wrap: wrap;
    }
    @media (max-width: 615px) {
      padding-top: 12%;
    }

    @media (max-width: 375px) {
      padding-top: 15%;
      & .logo {
        display: none;
      }
    }
  }
`;

const HomeScreen = ({ profile, logout }) => {
  const [activePage, setActivePage] = useState();
  const history = useHistory();

  const pageContent = () => {
    switch (activePage) {
      case "PROFILE":
        return <Profile />;
      case "ACTIVITY":
        return <Activity />;
      default:
        return <Feed />;
    }
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res === "OK") {
      history.push("/login");
    }
  };

  return (
    <Container>
      <Navbar profile={profile} setActivePage={setActivePage} />
      <div className="mobile-nav">
        <img src={crowLogo} alt="Tweeter Logo" className="logo" />
        <Link to="/home" onClick={() => setActivePage("HOME")}>
          <HomeOutlined className="link-icon" /> Home
        </Link>
        <Link to="/home" onClick={() => setActivePage("ACTIVITY")}>
          <BellOutlined className="link-icon" /> Activity
        </Link>
        <Link to="/home" onClick={() => setActivePage("PROFILE")}>
          <UserOutlined className="link-icon" /> Profile
        </Link>
        <Link onClick={handleLogout} to="#">
          <LogoutOutlined className="link-icon" /> Logout
        </Link>
      </div>
      <div className="page-content">{pageContent()}</div>
      <NewsFeed />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, { logout })(HomeScreen);
