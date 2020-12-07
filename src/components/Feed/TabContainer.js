import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

export default function TabContainer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavLink activeClassName={classes.active} to="/feed/all">All</NavLink>
      <NavLink activeClassName={classes.active} to="/feed/supports">Supports</NavLink>
      <NavLink activeClassName={classes.active} to="/feed/posted">Posted</NavLink>
      <NavLink activeClassName={classes.active} to="/feed/new">New</NavLink>
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
      fontWeight: "bold",
      border: "none",
      padding: "1rem 0",
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
  },
  active: {
    background: "var(--bg-secondary)",
    borderBottom: "3px solid var(--theme-primary)",
    color: "var(--theme-primary)"
  }
}))