import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaRegComment, FaUser } from "react-icons/fa";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FiImage, FiFileText } from "react-icons/fi";

import Actions from "../../utils/dashboardActions";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";
import FeedPing from "../Styled/StyledFeedPing";
import { LikeBtn, DismissBtn, CommentBtn } from "../Styled/StyledPingIcons";

export default function Feed({ data, feedType }) {
  const classes = useStyles();
  const { dispatch } = useDashboardContext();
  const { user } = useAuthContext();

  function displayProfile(selectedUser) {
    if (user) {
      dispatch({ type: Actions.SELECT_USER, payload: selectedUser });
    }
  }

  function containsImage(ping) {
    return ping.imageUrl ? <FiImage size={32} /> : <FiFileText size={32} />;
  }

  function authorPic(ping) {
    return ping.author.imageUrl ? (
      <Avatar
        src={ping.author.imageUrl}
        alt={ping.author.username}
        className={classes.profilePic}
      />
    ) : (
      <Avatar className={classes.missingPic}>
        <FaUser />
      </Avatar>
    );
  }

  return (
    <FeedPing className="ping">
      <Avatar className="img">
        <FaUser size={20} />
      </Avatar>
      <h4 className="username">
        @Username<span className="meta"> · 2 hours ago</span>
      </h4>
      <p className="body">
        Yo farmer's market just opened up on west 25th! Come check it out!
      </p>
      <LikeBtn className="like">
        <BiUpvote color="disabled" fontSize="large" />
      </LikeBtn>
      <DismissBtn className="dismiss">
        <BiDownvote color="disabled" fontSize="large" />
      </DismissBtn>
      <CommentBtn className="comment">
        <FaRegComment color="disabled" fontSize="large" />
      </CommentBtn>
      <div className="sxy_line"></div>
    </FeedPing>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    height: "70vh",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(0, 2),
    paddingRight: 0,
    background: theme.palette.warning.main,
  },
  title: {
    color: theme.palette.primary.dark,
  },
  metaContainer: {
    display: "flex",
    "& > *": {
      marginRight: "0.34rem",
      color: "#C0C0C0",
      fontSize: "12px",
      textDecoration: "none",
      "& > * ": {
        fontSize: "12px",
      },
    },
  },
  meta: {
    "&:hover": {
      color: "#ffc34d",
      cursor: "pointer",
    },
  },
  username: {
    "&:hover": {
      cursor: "pointer",
      color: "#ffc34d",
    },
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  commentIcon: {
    color: "#4db8ff",
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
}));
