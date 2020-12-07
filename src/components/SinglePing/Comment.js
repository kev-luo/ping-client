import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaUser } from "react-icons/fa";
import moment from "moment";

import StyledComment from "../Styled/StyledComment";
import Actions from "../../utils/dashboardActions";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function Comment({ createdAt, body, author }) {
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
      <h4 className="username">
        @{author.username}
        <span className="meta"> · {moment(Number(createdAt)).fromNow()}</span>
      </h4>
      <p className="body">{body}</p>
      <div className="sxy_line"></div>
    </StyledComment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px 8px",
    marginTop: "0.7rem",
    backgroundColor: theme.palette.info.main,
    color: theme.palette.primary.dark,
  },
  username: {
    "&:hover": {
      cursor: "pointer",
      color: "#ffc34d",
    },
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  missingPic: {
    width: "3rem",
    height: "3rem",
    "& > *": {
      width: "1.5rem",
      height: "1.5rem",
    },
  },
  profilePic: {
    width: "3rem",
    height: "3rem",
  },
  meta: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    "& > * ": {
      textDecoration: "none",
      color: "grey",
    },
  },
}));
