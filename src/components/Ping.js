import React, { useState } from "react";
import { Avatar, Tooltip, IconButton } from "@material-ui/core";
import { FaRegComment, FaUser } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";
import StyledFeedPing from "./Styled/StyledFeedPing";
import SupportPing from "./SupportPing";
import NewComment from "./NewComment";

export default function Ping({ ping }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { dispatch } = useDashboardContext();
  const { user } = useAuthContext();
  const params = useParams();

  function authorPic(ping) {
    return ping.author.imageUrl ? (
      <Avatar
        src={ping.author.imageUrl}
        alt={ping.author.username}
        className="img"
      />
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
      history.push(`/feed/posted/${selectedUser.id}`);
    }
  }

  function addComment(e) {
    setOpen(!open);
    e.stopPropagation();
  }

  return (
    <>
      <StyledFeedPing className="ping" onClick={() => displayPing(ping.id)}>
        {authorPic(ping)}
        <h4 className="username" onClick={(e) => selectUser(e, ping.author)}>
          @{ping.author.username}
          <span className="meta">
            {` · ${moment(Number(ping.createdAt)).fromNow()}`}
          </span>
        </h4>
        <p className="body">{ping.body}</p>
        <SupportPing user={user} ping={ping} />
        <div className="comment">
          <Tooltip title="Comment">
            <IconButton onClick={(e) => addComment(e)}>
              <FaRegComment color="#22ccf2" fontSize="large" />
            </IconButton>
          </Tooltip>
          <span>{ping.commentCount}</span>
        </div>
        {params.pingId && (
          <p className="time">{moment(Number(ping.createdAt)).format("h:mm a, MMM Do YYYY")}</p>
        )}
        <div className="sxy_line"></div>
      </StyledFeedPing>
      <NewComment pingId={ping.id} open={open} setOpen={setOpen} />
    </>
  );
}
