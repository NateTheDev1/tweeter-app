import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import Feed from "./Feed";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1440px;

  box-sizing: border-box;
  height: 100vh;
`;

const HomeScreen = ({ profile }) => {
  const [activePage, setActivePage] = useState("home");

  const pageContent = () => {
    switch (activePage) {
      default:
        return <Feed />;
    }
  };

  return (
    <Container>
      <Navbar profile={profile} />
      <div style={{ marginLeft: "25%", width: "50%" }}>{pageContent()}</div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
