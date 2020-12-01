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
        <Typography variant="h5" centered />
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
    width: "100%",
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}))