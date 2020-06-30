import React from "react";
import styled from "styled-components";
import Notification from "./Notification";
import { useForm } from "react-hook-form";

const Container = styled.form``;

const OnboardingForm = ({}) => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      {/* <Notification
        type="info"
        description="By using Tweeter's services you agree to our Cookie Use and Data Transfer outside the EU. We and our partners operate globally and use cookis, including for analytics, personalization, and ads."
        /> */}
    </Container>
  );
};

export default OnboardingForm;
