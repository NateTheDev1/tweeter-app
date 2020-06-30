import React from "react";
import {
  SearchOutlined,
  UsergroupDeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Container, Perk } from "./Styled/OnboardingLeftStyled";

const OnboardingLeft = ({ type }) => {
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
