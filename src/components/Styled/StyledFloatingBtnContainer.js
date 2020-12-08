import styled from "styled-components";

const FloatingBtnContainer = styled.div`
  position: absolute;
  height: 100%;
  z-index: 15;
  left: 6rem;

  ul {
    position: sticky;
    top: 10rem;
    list-style-type: none;
    width: 4rem;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 5rem;
  }

  @media (max-width: 768px) {
    left: 3rem;
    ul {
      flex-direction: row;
    }
    li {
      flex-direction: column;
      margin-right: 1rem;
    }
  }
`;

export default FloatingBtnContainer;
