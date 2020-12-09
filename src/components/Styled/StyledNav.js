import styled from "styled-components";

const StyledNav = styled.nav`
  height: 4rem;
  position: fixed;
  width: 100%;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & a, button {
    text-decoration: none;
  }

  .logo * {
    font-size: 30px;
    line-height: 100px;
    letter-spacing: 3px;
    margin: 1rem;
  }

  .nav {
    font-size: 20px;
    line-height: 100px;
    letter-spacing: 1px;
    margin: .5rem;
  }
`;

export default StyledNav;
