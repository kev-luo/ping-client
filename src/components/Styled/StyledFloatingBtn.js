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

  :focus {
    outline: none;
  }

  & ~ span {
    visibility: hidden;
  }

  &:hover ~ span {
    color: var(--text-secondary);
    visibility: visible;
  }
`;

export default FloatingLink;
