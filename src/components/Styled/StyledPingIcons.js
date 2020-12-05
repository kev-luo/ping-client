import { IconButton } from "@material-ui/core";
import styled from "styled-components";

const PingBtn = styled(IconButton)`
  color: #A9A9A9;
`;

const LikeBtn = styled(PingBtn)`
  &:hover {
    color: #50BF6C;
  }
`;

const DismissBtn = styled(PingBtn)`
  &:hover {
    color: #BF213E;
  }
`;

const CommentBtn = styled(PingBtn)`
  &:hover {
    color: #22ccf2;
  }
`;

export { LikeBtn, DismissBtn, CommentBtn };
