import styled from "styled-components";

const FeedContainer = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 7rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1200px) {
    padding-top: 14rem;
  }
`;

export default FeedContainer;