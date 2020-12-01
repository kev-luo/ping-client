import React from "react";
import moment from "moment";
import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { useMapContext } from "../../utils/useMapContext";
import Loading from "../Loading";
import Comment from "./Comment";
import NewComment from "./NewComment";

export default function Ping({ data, error }) {
  const classes = useStyles();
  const {
    state: { userPosition },
    dispatch,
  } = useMapContext();
  const history = useHistory();

  const getComments = () => {
    const comments = data?.getPing?.comments;
    const commentComponents = comments.map((comment) => (
      <Comment key={comment.id} {...comment} />
    ));
    return commentComponents;
  };

  const back = () => {
    dispatch({
      type: "UPDATE_VIEWPORT",
      payload: {
        latitude: userPosition?.latitude,
        longitude: userPosition?.longitude,
        zoom: 13,
      },
    });
    history.goBack();
  };

  return (
    <>
      <Paper className={classes.root}>
        {data ? (
          <>
            <Button color="primary" variant="contained" onClick={back}>
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
        ) : error ? (
          <Loading err={error} />
        ) : (
          <Loading />
        )}
      </Paper>
      <NewComment pingId={data?.getPing?.id} />
      {data ? getComments() : error ? <Loading err={error} /> : <Loading />}
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
