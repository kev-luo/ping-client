import styled from "styled-components";

const StyledComment = styled.div`
  width: 70%;
  ${'' /* border: 1px solid #cfcfcf; */}
  padding: 1rem 1rem;
  margin-top: .7rem;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 1rem;
  grid-template-areas: 
  "img   username username username"
  "img   body     body     body"
  "sxy_line sxy_line sxy_line sxy_line";
  .img {
    grid-area: img;
    justify-self: center;
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
  .sxy_line {
    grid-area: sxy_line;
    align-self: end;
    height: 1px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default StyledComment;
