import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, LinearProgress, CircularProgress } from '@material-ui/core';

export default function Loading({comp, err}) {
  const classes = useStyles()

  const loadingType = comp === "profile" ? (
    <CircularProgress />
  ) : comp === "map" ? (
    <CircularProgress />
  ) : (
    <LinearProgress />
  )

  return (
    <div className={classes.container}>
      {err ? (
        <Typography variant="h5" centered >
          ☹️ Uh oh looks like an error on our end... 
        </Typography>
      ) : (
        <>
          {loadingType}
        </>
      )}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    width: "50%",
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}))