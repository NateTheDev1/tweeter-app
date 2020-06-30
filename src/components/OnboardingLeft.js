import React from "react";
import {
  SearchOutlined,
  UsergroupDeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Container, Perk } from "./Styled/OnboardingLeftStyled";
import Notification from "./Notification";

const OnboardingLeft = () => {
  return (
    <Container>
      <Notification
        type="info"
        description="By using Tweeter's services you agree to our Cookie Use and Data Transfer outside the EU. We and our partners operate globally and use cookis, including for analytics, personalization, and ads."
      />
      <Perk>
        <SearchOutlined className="perk-icon" />
        <h2>Follow your interests.</h2>
      </Perk>
      <Perk>
        <UsergroupDeleteOutlined className="perk-icon" />
        <h2>Hear what people are talking about.</h2>
      </Perk>
      <Perk>
        <MessageOutlined className="perk-icon" />
        <h2>Join the conversation</h2>
      </Perk>
    </Container>
  );
};

export default OnboardingLeft;
