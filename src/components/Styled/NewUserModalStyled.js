import styled from "styled-components";

export const FormDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;

  margin: 0 auto;
  && h3 {
    font-size: 1.2rem;
  }

  && input {
    padding: 2%;
    border: none;
    border: 1px solid #4693d9;
    border-radius: 5px;
    font-family: "Mukta", sans-serif;
    font-size: 1rem;
    margin-bottom: 3%;
    margin-top: 3%;
    letter-spacing: 1px;
  }

  && button {
    color: white;
    margin-top: 3%;
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

export const FileUpload = styled.label`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 5%;
  && input {
    display: none;
  }

  &&:hover {
    cursor: pointer;
    color: #1db5f6;
  }
`;
