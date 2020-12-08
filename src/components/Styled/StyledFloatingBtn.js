import styled from "styled-components";
import { Link } from 'react-router-dom';

const FloatingLink = styled(Link)`
  cursor: pointer;
  background: #EBEDF2;
  padding: 1.2rem;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 4px 5px -1px rgba(15, 38, 18, 0.75);
  transition: 200ms ease;
  color: var(--theme-primary);
  &:hover {
    box-shadow: 2px 4px 6px -1px rgba(80, 191, 108, 0.75);
    transform: scale(1.1);
  }
  :focus {
    outline: none;
  }

  & ~ span {
    visibility: hidden;
    margin-left: 1rem;
  }

  &:hover ~ span {
    color: var(--theme-primary);
    font-weight: bold;
    visibility: visible;
  }

  @media (max-width: 1200px) {
    & ~ span {
      margin: 1.5rem 0 0 0;
    }
  }
`;

export default FloatingLink;
