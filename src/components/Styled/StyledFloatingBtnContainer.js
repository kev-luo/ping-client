import styled from "styled-components";

const FloatingBtnContainer = styled.div`
  position: absolute;
  height: 100%;
  z-index: 15;
  left: 6rem;
  top: 7rem;

  ul {
    position: sticky;
    list-style-type: none;
    top: 7rem;
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

  @media (max-width: 1200px) {
    position: absolute;
    pointer-events: none;
    width: 100%;
    left: 0rem;
    top: 0;
    ul {
      width: 100%;
      height: 9rem;
      background-color: var(--bg-primary);
      position: sticky;
      flex-direction: row;
      justify-content: center;
      padding-top: 2rem;
      top: 3.9rem;
    }
    li {
      flex-direction: column;
      margin-right: 1rem;
      pointer-events: auto;
    }
  }
`;

export default FloatingBtnContainer;
