import React from "react";
import OnboardingLeft from "../components/OnboardingLeft";
import OnboardingForm from "../components/OnboardingForm";

const SignUp = (props) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <OnboardingLeft />
      <OnboardingForm
        button="Log In"
        title="Welcome back."
        action="Don't have an account?"
      />
    </div>
  );
};

export default SignUp;
