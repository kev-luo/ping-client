import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom"

import Ping from "../Ping";
import Loading from "../Loading";
import Comment from "./Comment";

export default function SinglePing({ data, error, darkMode }) {
  const classes = useStyles();
  const history = useHistory();

  const getComments = () => {
    const comments = data?.getPing?.comments;
    const commentComponents = comments.map((comment) => (
      <Comment key={comment.id} {...comment} darkMode={darkMode}/>
    ));
    return commentComponents;
  };

  return (
    <>
      {data ? (
        <>
          <Button color="primary" variant="contained" onClick={() => history.goBack()}>
            Go Back
          </Button>
          <Ping ping={data.getPing} darkMode={darkMode}/>
        </>
      ) : error ? (
        <Loading err={error} />
      ) : (
        <Loading />
      )}
      <Typography variant="h5" align="center" className={classes.title}>
        Comments
      </Typography>
      {data ? getComments() : error ? <Loading err={error} /> : <Loading />}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    padding: theme.spacing(2),
  },
  commentsRoot: {
    backgroundColor: theme.palette.primary.light,
    maxHeight: "50vh",
    overflow: "auto",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary.dark,
  },
  backLink: {
    textDecoration: "none",
  },
  textContainer: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  metaContainer: {
    display: "flex",
    marginTop: "0.1rem",
    marginBottom: "1rem",
    "& > *": {
      marginRight: "0.34rem",
      color: "#909090",
      fontSize: "12px",
      textDecoration: "none",
      "& > * ": {
        fontSize: "12px",
      },
    },
  },
}));
