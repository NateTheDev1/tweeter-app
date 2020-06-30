import React from "react";
import OnboardingLeft from "../components/OnboardingLeft";
import OnboardingForm from "../components/OnboardingForm";

const SignUp = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <OnboardingLeft />
      <OnboardingForm
        button="Get Started"
        title="Join Tweeter today."
        action="Have an account?"
      />
    </div>
  );
};

export default SignUp;
