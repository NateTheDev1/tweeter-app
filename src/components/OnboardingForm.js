import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import crowLogo from "../images/crowLogo.png";
import { useHistory } from "react-router-dom";
import { registerUser, loginUser } from "../actions/authActions";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 50vw;
  margin: 0 auto;

  @media (max-width: 550px) {
    width: 100vw;
  }
`;

const Error = styled.p`
  color: #f32013;
  margin-top: 3%;
  margin-bottom: 3%;
`;

const TitleDiv = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 2%;

  @media (max-width: 1440px) {
    width: 75%;
  }

  && h1 {
    font-weight: 700;
    font-size: 2.6rem;
    margin-bottom: 3%;
  }

  && h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  && img {
    width: 100px;
  }
`;

const FormDiv = styled.div`
  display: flex;
  padding: 2%;
  flex-direction: column;
  justify-content: space-around;

  width: 50%;
  margin: 0 auto;

  @media (max-width: 1440px) {
    width: 75%;
  }

  && input {
    padding: 2%;
    border: none;
    border: 1px solid gray;
    border-radius: 5px;
    font-family: "Mukta", sans-serif;
    font-size: 1rem;
    margin-bottom: 5%;
  }

  && button {
    color: white;
    background: #4693d9;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 2%;
    width: 150px;
    height: 50px;
    border-radius: 25px;
  }

  && button:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  && input:focus {
    border: 1px solid #4693d9;

    outline: none;
  }
`;

const SwitchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
  flex-wrap: wrap;

  && p {
    margin-top: 5%;
    font-size: 1.2rem;
  }

  && span {
    color: #4693d9;
  }

  && span:hover {
    cursor: pointer;
  }
`;

const OnboardingForm = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const {
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    toastStack,
  } = useToasts();
  const history = useHistory();

  const onSubmit = async (data) => {
    if (props.action === "Have an account?") {
      const res = await props.registerUser(data);
      if (res === "OK") {
        if (window.innerWidth > 750) {
          addToast(<p>Thank you for signing up! You are now logged in!</p>, {
            appearance: "success",
          });
        }
        setTimeout(() => {
          history.push("/home");
        }, 2000);
      }
    } else {
      const res = await props.loginUser(data);
      if (res === "OK") {
        if (window.innerWidth > 750) {
          addToast(<p>Welcome back! You are now logged in!</p>, {
            appearance: "success",
          });
        }
        setTimeout(() => {
          history.push("/home");
        }, 2000);
      }
    }
  };

  const handleSwitch = () => {
    if (props.action === "Have an account?") {
      history.push("/login");
    } else {
      history.push("/");
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleDiv>
        <img src={crowLogo} alt="Tweeter Logo" />
        <h1>See what's happening in the world right now</h1>
        <h3>{props.title}</h3>
      </TitleDiv>
      <FormDiv>
        {props.error.length > 0 && <Error>{props.error}</Error>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          ref={register({
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 35,
              message: "Must be less than 35 characters.",
            },
          })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          ref={register({
            required: { value: true, message: "This field is required" },
            minLength: { value: 6, message: "Must be more than 6 characters" },
          })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <SwitchDiv>
          <button type="submit">{props.button}</button>
          <p>
            {props.action}{" "}
            <span onClick={handleSwitch}>
              {props.action === "Have an account?" ? "Login" : "Sign Up"}
            </span>
          </p>
        </SwitchDiv>
      </FormDiv>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
    error: state.authReducer.error,
  };
};

export default connect(mapStateToProps, { registerUser, loginUser })(
  OnboardingForm
);
