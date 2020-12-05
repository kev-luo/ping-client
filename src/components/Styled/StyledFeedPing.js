import styled from "styled-components";

const FeedPing = styled.div`
  width: 60%;
  /* border: 1px solid #cfcfcf; */
  padding: 1rem 1rem;
  margin-top: 1rem;
  display: grid;
  border-radius: 5px;
  grid-template-columns: 1fr 2fr 2fr 2fr;
  grid-template-rows: 1fr 1fr 2rem 1fr;
  gap: 0px 1rem;
  grid-template-areas: 
  "img   username username username"
  "img   body     body     body"
  ".     like     dismiss  comment"
  "sxy_line sxy_line sxy_line sxy_line";
  .img {
    grid-area: img;
    justify-self: end;
    width: 3.5rem;
    height: 3.5rem;
  }
  .username {
    grid-area: username;
  }
  .meta {
    font-weight: lighter;
    color: #A0A0A0;
  }
  .body {
    grid-area: body;
  }
  .like {
    grid-area: like;
    align-self: center;
    justify-self: start;
  }
  .dismiss {
    grid-area: dismiss;
    align-self: center;
    justify-self: start;
  }
  .comment {
    grid-area: comment;
    align-self: center;
    justify-self: start;
  }
  .sxy_line {
    grid-area: sxy_line;
    align-self: end;
    height: 1px;
    background: linear-gradient(to right, #f2f2f2, black, #f2f2f2);
  }
  &:hover {
    background: var(--bg-secondary);
    cursor: pointer;
  }
  transition: background 200ms ease;
`;

export default FeedPing;
