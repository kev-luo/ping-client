import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated as a } from "react-spring";

import jd from "../assets/JD.jpg";
import kev from "../assets/Kev.jpg";
import AbsoluteWrapper from "../components/Styled/AbsoluteWrapper";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function About() {
  const classes = useStyles();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <AbsoluteWrapper className={classes.root}>
      <div className={classes.container}>
        <p>
          We created Ping to help keep users informed of local events.
          Specifically, smaller towns are in need of a source that informs them
          of events occurring on a day-to-day basis. With Ping, users post
          information about things happening around them to create a web of
          real-time event announcements. Pings are automatically deleted after
          24 hours to keep the information fresh.
        </p>
        <div className={classes.contact}>
          <a.div
            className={clsx(classes.img, classes.kev)}
            onMouseMove={({ clientX: x, clientY: y }) =>
              set({ xys: calc(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
          />
          <a.div
            className={clsx(classes.img, classes.jd)}
            onMouseMove={({ clientX: x, clientY: y }) =>
              set({ xys: calc(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
          />
        </div>
      </div>
    </AbsoluteWrapper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.info.main,
  },
  container: {
    width: "70vw",
    margin: "0 auto",
    padding: "1rem",
    paddingTop: "7rem",
    paddingBottom: "5rem",
  },
  contact: {
    marginTop: "3rem",
    display: "flex",
    justifyContent: "space-around",
  },
  img: {
    width: "10rem",
    height: "10rem",
    backgroundSize: "cover",
    borderRadius: "5px",
    border: "10px solid white",
    boxShadow: "0px 10px 30px -5px rgba(0,0,0,.3)",
    transition: "box-shadow 0.5s",
    "&:hover": {
      boxShadow: "0px 30px 100px -10px rgba(0,0,0.4)",
    },
  },
  jd: {
    backgroundImage: `url(${jd})`,
    "&:hover": {
      backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
      url(${jd})`,
    },
  },
  kev: {
    backgroundImage: `url(${kev})`,
    "&:hover": {
      backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
      url(${kev})`,
    },
  },
}));
