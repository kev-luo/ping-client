import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

export default function TabContainer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <button>All</button>
      <button>Supports</button>
      <button>Posted</button>
      <button>New</button>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "65%",
    "& *": {
      flex: 1,
      background: "var(--bg-primary)",
      border: "none",
      padding: "1rem 2rem",
      "&:focus": {
        outline: "none"
      },
      "&:hover": {
        background: "var(--bg-secondary)",
        cursor: "pointer"
      }
    }
  }
}))