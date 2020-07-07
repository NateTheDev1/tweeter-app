import styled from "styled-components";

export const Container = styled.div`
  font-family: "Mukta", sans-serif;
  background: #4693d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  height: 100vh;
  width: 50vw;

  @media (max-width: 850px) {
    width: 30vw;
  }

  @media (max-width: 550px) {
    width: 30vw;
    display: none;
  }
`;

export const Perk = styled.div`
  padding: 2%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 5%;
  @media (max-width: 850px) {
    text-align: center;
    flex-direction: column;
    margin-bottom: 25%;
  }

  && h2 {
    width: 50%;
    color: white;
  }

  && .perk-icon {
    margin-right: 3%;
    font-size: 2.5rem;
  }
`;
