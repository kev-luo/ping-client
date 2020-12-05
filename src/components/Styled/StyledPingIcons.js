import { IconButton } from "@material-ui/core";
import styled from "styled-components";

const PingBtn = styled(IconButton)`
  color: #A9A9A9;
  background: #A9A9A9;
`;

const LikeBtn = styled(PingBtn)`
  &:hover {
    color: #63BF84;
  }
`;

const DismissBtn = styled(PingBtn)`
  &:hover {
    color: #BF213E;
  }
`;

const CommentBtn = styled(PingBtn)`
  &:hover {
    color: #34B1BF;
  }
`;

export { LikeBtn, DismissBtn, CommentBtn };
