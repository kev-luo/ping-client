import React from "react";
import moment from "moment";
import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Loading from "../Loading";
import Comment from "./Comment";
import NewComment from "./NewComment";

export default function Ping({ data, loading }) {
  const classes = useStyles();

  const history = useHistory();

  const getComments = () => {
    const comments = data?.getPing?.comments;
    const commentComponents = comments.map((comment) => (
      <Comment key={comment.id} {...comment} />
    ));
    return commentComponents;
  };

  return (
    <>
      <Paper className={classes.root}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.goBack()}
            >
              Go Back
            </Button>
            <div className={classes.textContainer}>
              <Typography variant="h6">
                {`@${data.getPing.author.username}`}
              </Typography>
              <div className={classes.metaContainer}>
                <Typography variant="subtitle2">
                  {`${data.getPing.supportCount} Supported`}
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
        )}
      </Paper>
      <NewComment pingId={data?.getPing?.id} />
      {loading ? <Loading /> : getComments()}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    maxHeight: "80vh",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  backLink: {
    textDecoration: "none",
  },
  textContainer: {
    marginLeft: theme.spacing(2),
  },
  metaContainer: {
    display: "flex",
    marginBottom: "1rem",
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
}));
