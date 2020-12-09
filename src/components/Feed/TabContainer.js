import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function TabContainer({ darkMode }) {
  const classes = useStyles();
  const {
    state: { selectedUser },
  } = useDashboardContext();
  const { user } = useAuthContext();

  return (
    <div
      className={clsx(
        classes.root,
        darkMode ? classes.darkColor : classes.color
      )}
    >
      {user?.id === selectedUser?.id && (
        <>
          <NavLink activeClassName={classes.active} to="/feed/top">
            Top
          </NavLink>
          <NavLink activeClassName={classes.active} to="/feed/new">
            New
          </NavLink>
        </>
      )}
      <NavLink
        activeClassName={classes.active}
        to={`/feed/supports/${selectedUser?.id}`}
      >
        Supports
      </NavLink>
      <NavLink
        activeClassName={classes.active}
        to={`/feed/posted/${selectedUser?.id}`}
      >
        Posted
      </NavLink>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "65%",
    "& *": {
      flex: 1,
      background: theme.palette.info.main,
      fontWeight: "bold",
      border: "none",
      padding: "1rem 0",
      textDecoration: "none",
      textTransform: "uppercase",
      textAlign: "center",
      "&:focus": {
        outline: "none",
      },
      "&:hover": {
        background: theme.palette.info.light,
        color: theme.palette.success.main,
        cursor: "pointer",
      },
    },
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },
  color: {
    "& *": {
      color: "#0f2612",
    },
  },
  darkColor: {
    "& *": {
      color: "white",
    },
  },
  active: {
    background: theme.palette.info.light,
    borderBottom: "3px solid var(--theme-primary)",
    color: "var(--theme-primary)",
  },
}));
