import React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { FaRegComment, FaUser } from "react-icons/fa";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useHistory, useParams } from 'react-router-dom';
import moment from "moment";

import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";
import StyledFeedPing from "./Styled/StyledFeedPing";
import SupportPing from "./SupportPing";
import { CommentBtn } from "./Styled/StyledPingIcons";

export default function Ping({ ping }) {
  const history = useHistory();
  const { dispatch } = useDashboardContext();
  const { user } = useAuthContext();
  const params = useParams();

  function authorPic(ping) {
    return ping.author.imageUrl ? (
      <Avatar src={ping.author.imageUrl} alt={ping.author.username} className="img" />
    ) : (
      <Avatar className="img">
        <FaUser />
      </Avatar>
    );
  }

  function displayPing(pingId) {
    history.push(`/ping/${pingId}`);
  }

  function selectUser(e, selectedUser) {
    e.stopPropagation();
    if (user) {
      dispatch({ type: Actions.SELECT_USER, payload: selectedUser });
      history.push(`/feed/posted/${selectedUser.id}`)
    }
  }

  return (
    <StyledFeedPing
      className="ping"
      onClick={() => displayPing(ping.id)}
    >
      {authorPic(ping)}
      <h4 className="username" onClick={(e) => selectUser(e, ping.author)}>
        @{ping.author.username}
        <span className="meta">
          {` · ${moment(Number(ping.createdAt)).fromNow()}`}
        </span>
      </h4>
      <p className="body">{ping.body}</p>
      <SupportPing user={user} ping={ping}/>
      <div className="comment">
        <Tooltip title="Comment">
          <CommentBtn className="comment">
            <FaRegComment color="disabled" fontSize="large" />
          </CommentBtn>
        </Tooltip>
        <span>{ping.commentCount}</span>
      </div>
      {params.pingId && (
        <p className="time">{moment().format("h:mm a, MMM Do YYYY")}</p>
      )}
      <div className="sxy_line"></div>
    </StyledFeedPing>
  );
}
