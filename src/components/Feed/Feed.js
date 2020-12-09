import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Ping from "../Ping";

export default function Feed({ data, error, darkMode }) {
  const classes = useStyles();

  return (
    <>
      {data.length > 0 ? (
        data.map((ping) => (
          <Ping ping={ping} key={ping.id} darkMode={darkMode} />
        ))
      ) : (
        <div className={clsx(classes.empty, darkMode ? classes.dark : "")}>
          No Pings to display 🕵
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  empty: {
    marginTop: "2rem",
    fontSize: "1.5rem",
  },
  dark: {
    color: "white",
  },
}));
