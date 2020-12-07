import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

export default function TabContainer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="/feed/all">All</Link>
      <Link to="/feed/supports">Supports</Link>
      <Link to="/feed/posted">Posted</Link>
      <Link to="/feed/new">New</Link>
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
      color: "var(--text-primary)",
      border: "none",
      padding: "1rem 2rem",
      textDecoration: "none",
      textTransform: "uppercase",
      textAlign: "center",
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