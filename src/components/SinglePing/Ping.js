import React from "react";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../Loading";
import Comment from "./Comment";
import NewComment from "./NewComment";

export default function Ping({ data, error }) {
  const classes = useStyles();

  const getComments = () => {
    const comments = data?.getPing?.comments;
    const commentComponents = comments.map((comment) => (
      <Comment key={comment.id} {...comment} />
    ));
    return commentComponents;
  };

  return (
    <>
      {data ? (
        <>
          <Button color="primary" variant="contained">
            Go Back
          </Button>
          <div className={classes.textContainer}>
            <Typography variant="h6">
              {`@${data.getPing.author.username}`}
            </Typography>
            <div className={classes.metaContainer}>
              <Typography variant="subtitle2">
                {`${data.getPing.supportCount} Supported |`}
              </Typography>
              <Typography variant="subtitle2">
                {`Posted ${moment(Number(data.getPing.createdAt)).fromNow()}`}
              </Typography>
            </div>
            <Typography variant="body1">{data.getPing.body}</Typography>
            {data.getPing.imageUrl && (
              <img
                src={data.getPing.imageUrl}
                style={{ maxHeight: "250px" }}
                alt={data.getPing.author.username}
              />
            )}
          </div>
        </>
      ) : error ? (
        <Loading err={error} />
      ) : (
        <Loading />
      )}
      <NewComment pingId={data?.getPing?.id} />
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
