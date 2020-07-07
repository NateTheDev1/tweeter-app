import React, { useEffect } from "react";
import {
  SearchOutlined,
  UsergroupDeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Container, Perk } from "./Styled/OnboardingLeftStyled";
import { useToasts } from "react-toast-notifications";

const OnboardingLeft = () => {
  const {
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    toastStack,
  } = useToasts();

  useEffect(() => {
    setToast();
  }, []);

  const setToast = () => {
    addToast(
      <p style={{ fontSize: "1.2rem" }}>
        By using Tweeter's services you agree to our Cookie Use and Data
        Transfer outside the EU. We and our partners operate globally and use
        cookies, including for analytics, personalization, and ads.
      </p>,
      {
        appearance: "info",
      }
    );
  };
  return (
    <Container>
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
