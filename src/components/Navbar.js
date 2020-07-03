import React from "react";
import styled from "styled-components";
import crowLogo from "../images/crowLogo.png";
import { Link, useHistory } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

const Nav = styled.nav`
  font-family: "Mukta", sans-serif;
  width: 15%;
  padding: 1%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  && .logo {
    width: 75px;
  }

  && .nav-container {
    display: flex;
    flex-direction: column;

    margin-top: 15%;
  }

  && a {
    color: black;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 5%;
    margin-bottom: 10%;
    transition: 0.3s;
    border-radius: 25px;
  }

  && a:hover {
    color: white;
    padding: 7%;
    background: #1da1f2;
  }

  && .link-icon {
    margin-right: 5%;
  }

  && .profile-ref {
    display: flex;
    align-items: center;

    & p {
      margin-left: 5%;
      font-size: 1rem;
      font-weight: 700;
      color: gray;
    }
  }
`;

const Navbar = ({ profile, logout }) => {
  const history = useHistory();

  if (profile === null) {
    return null;
  }

  const handleLogout = async () => {
    const res = await logout();
    if (res === "OK") {
      history.push("/login");
    }
  };

  return (
    <Nav>
      <div>
        <img src={crowLogo} alt="Tweeter Logo" className="logo" />
        <div className="nav-container">
          <Link to="/home">
            <HomeOutlined className="link-icon" /> Home
          </Link>
          <Link to="/home">
            <BellOutlined className="link-icon" /> Notifications
          </Link>
          <Link to="/home">
            <UserOutlined className="link-icon" /> Profile
          </Link>
          <Link onClick={handleLogout} to="#">
            <LogoutOutlined className="link-icon" /> Logout
          </Link>
        </div>
      </div>
      <div className="profile-ref">
        <Badge status="success">
          <Avatar
            size={64}
            icon={
              !profile.avatar ? <UserOutlined /> : <img src={profile.avatar} />
            }
          />
        </Badge>
        <p>@{profile.username}</p>
      </div>
    </Nav>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { logout })(Navbar);
