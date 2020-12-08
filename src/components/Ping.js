import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Tooltip, IconButton } from "@material-ui/core";
import { FaRegComment, FaUser } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";
import StyledFeedPing from "./Styled/StyledPing";
import SupportPing from "./SupportPing";
import NewComment from "./NewComment";

export default function Ping({ ping, darkMode }) {
  const classes=useStyles();
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
      <StyledFeedPing className={darkMode ? classes.pingDark : classes.ping} onClick={() => displayPing(ping.id)}>
        {authorPic(ping)}
        <h4 className={clsx("username", darkMode ? classes.darkColor : classes.color)} onClick={(e) => selectUser(e, ping.author)}>
          @{ping.author.username}
          <span className="meta">
            {` · ${moment(Number(ping.createdAt)).fromNow()}`}
          </span>
        </h4>
        <p className={clsx("body", darkMode ? classes.darkColor : classes.color)}>{ping.body}</p>
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
        <div className={clsx("sxy_line", darkMode ? classes.darkLine : classes.line)}></div>
      </StyledFeedPing>
      <NewComment pingId={ping.id} open={open} setOpen={setOpen} />
    </>
  );
}

const useStyles = makeStyles(theme => ({
  ping: {
    "&:hover": {
      background: theme.palette.info.light,
    }
  },
  pingDark: {
    "&:hover": {
      background: theme.palette.info.light,
    },
    "& > .sxy_line": {
      background: "linear-gradient(to right, #424242, #f2f2f2, #424242)"
    }
  },
  color: {
    color: "#0f2612",
  },
  darkColor: {
    color: "#ebedf2"
  },
  line: {
    background: `linear-gradient(to right, #f2f2f2, #212121, #f2f2f2)`
  },
  darkLine: {
    background: "linear-gradient(to right, #212121, #f2f2f2, #212121)"
  }
}))