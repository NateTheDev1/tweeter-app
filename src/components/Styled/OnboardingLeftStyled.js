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

  && h2 {
    width: 50%;
  }

  && .perk-icon {
    margin-right: 3%;
    font-size: 2.5rem;
  }
`;
