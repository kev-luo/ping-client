import React from "react";
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaUser } from "react-icons/fa";
import moment from "moment";

import StyledComment from "../Styled/StyledComment";
import Actions from "../../utils/dashboardActions";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function Comment({ createdAt, body, author, darkMode }) {
  const classes = useStyles();
  const { dispatch } = useDashboardContext();
  const { user } = useAuthContext();

  function displayProfile(selectedUser) {
    if (user) {
      dispatch({ type: Actions.SELECT_USER, payload: selectedUser });
    }
  }

  function authorPic(author) {
    return author.imageUrl ? (
      <Avatar src={author.imageUrl} alt={author.username} className="img" />
    ) : (
      <Avatar className="img">
        <FaUser />
      </Avatar>
    );
  }

  return (
    <StyledComment>
      {authorPic(author)}
      <h4 className={clsx("username", darkMode ? classes.darkColor : classes.color)}>
        @{author.username}
        <span className="meta"> · {moment(Number(createdAt)).fromNow()}</span>
      </h4>
      <p className={clsx("body", darkMode ? classes.darkColor : classes.color)}>{body}</p>
      <div className={clsx("sxy_line", darkMode ? classes.darkLine : classes.line)}></div>
    </StyledComment>
  );
}

const useStyles = makeStyles((theme) => ({
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
}));
