import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { GrLinkedin, GrGithub } from "react-icons/gr";
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useSpring, animated as a } from "react-spring";

import jd from "../assets/JD.jpg";
import kev from "../assets/Kev.jpg";
import AbsoluteWrapper from "../components/Styled/AbsoluteWrapper";

export default function About({ darkMode }) {
  document.title = "Ping | About";
  const classes = useStyles();
  const props = useSpring({
    transform: "scale(1)",
    boxShadow: "0px 10px 30px -5px rgba(0,0,0,.3)",
    from: {
      transform: "scale(0.5)",
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.3)"
    },
    config: {
      tension: 400,
      mass: 2,
      velocity: 10
    }
  })
  return (
    <AbsoluteWrapper className={classes.root}>
      <div className={clsx(classes.container, darkMode ? classes.dark : "")}>
        <p>
          We created Ping to help keep users informed of local events.
          Specifically, smaller towns are in need of a source that informs them
          of events occurring on a day-to-day basis. With Ping, users post
          information about things happening around them to create a web of
          real-time event announcements. Pings are automatically deleted after
          24 hours to keep the information fresh.
        </p>
        <div className={classes.contact}>
          <div>
            <a.div className={clsx(classes.img, classes.kev)} style={props}><span>Kevin Luo</span></a.div>
            <MenuList>
              <MenuItem component="a" href="https://www.linkedin.com/in/kevinluo49/" target="_blank" className={darkMode ? classes.hover : ""}>
                <ListItemIcon>
                  <GrLinkedin color="#0B6BBF"/>
                </ListItemIcon>
                <ListItemText primary="LinkedIn" />
              </MenuItem>
              <MenuItem component="a" href="https://github.com/kev-luo" target="_blank" className={darkMode ? classes.hover : ""}>
                <ListItemIcon>
                  <GrGithub color={darkMode ? "white" : "black"}/>
                </ListItemIcon>
                <ListItemText primary="Github" />
              </MenuItem>
            </MenuList>
          </div>
          <div>
            <a.div className={clsx(classes.img, classes.jd)} style={props}><span>JD Martinez</span></a.div>
            <MenuList>
              <MenuItem component="a" href="https://www.linkedin.com/in/jonathan-martinez-316406113/" target="_blank" className={darkMode ? classes.hover : ""}>
                <ListItemIcon>
                  <GrLinkedin color="#0B6BBF"/>
                </ListItemIcon>
                <ListItemText primary="LinkedIn" />
              </MenuItem>
              <MenuItem component="a" href="https://github.com/Goodlvn" target="_blank" className={darkMode ? classes.hover : ""}>
                <ListItemIcon>
                  <GrGithub color={darkMode ? "white" : "black"}/>
                </ListItemIcon>
                <ListItemText primary="Github" />
              </MenuItem>
            </MenuList>
          </div>
        </div>
      </div>
    </AbsoluteWrapper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.info.main,
  },
  dark: {
    color: "white",
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
    color: "white",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      display: "none"
    },
    "&:hover span": {
      display: "block"
    }
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
  hover: {
    "&:hover": {
      backgroundColor: "rgba(235, 237, 242, 0.1)"
    }
  }
}));
