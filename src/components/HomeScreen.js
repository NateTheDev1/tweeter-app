import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import Feed from "./Feed";
import Profile from "./Profile";
import NewsFeed from "./NewsFeed";
import Activity from "./Activity";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1440px;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
`;

const HomeScreen = ({ profile }) => {
  const [activePage, setActivePage] = useState();

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

  return (
    <Container>
      <Navbar profile={profile} setActivePage={setActivePage} />
      <div style={{ marginLeft: "25%", width: "50%" }}>{pageContent()}</div>
      <NewsFeed />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
