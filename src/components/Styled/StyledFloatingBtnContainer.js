import styled from "styled-components";

const FloatingBtnContainer = styled.div`
  position: absolute;
  height: 100%;
  z-index: 15;

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
    flex-direction: row;
    align-items: center;
    margin-bottom: 5rem;
  }
`;

export default FloatingBtnContainer;
