import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useSpring, animated as a } from "react-spring";

import StyledContainer from "../components/Styled/StyledContainer";
import { FETCH_USER_QUERY } from "../utils/graphql";
import { useAuthContext } from "../utils/useAuthContext";
import UserSettingsModal from "../components/User/U_Settings/UserSettingsModal";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function UserSettings({ darkMode }) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [userSettings, setUserSettings] = useState("");
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: user?.id },
  });

  function handleClick(setting) {
    setIsOpen(!isOpen);
    setUserSettings(setting);
  }

  const userProfile = data?.getUser?.imageUrl ? (
    <Avatar
      src={data.getUser.imageUrl}
      alt={data.getUser.username}
      className={classes.media}
    />
  ) : (
    <Avatar className={classes.missingPic} />
  );

  return (
    <StyledContainer>
      <a.div
        className={classes.card}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      >
        {userProfile}
        <MenuList className={clsx(darkMode ? classes.menuDark : classes.menu)}>
          <MenuItem className={classes.item} onClick={() => history.goBack()}>
            <ListItemIcon>
              <TiArrowBackOutline
                className={clsx(darkMode ? classes.textDark : classes.text)}
              />
            </ListItemIcon>
            <ListItemText
              className={clsx(darkMode ? classes.textDark : classes.text)}
              primary="Go Back"
            />
          </MenuItem>
          <MenuItem
            className={classes.item}
            onClick={() => handleClick("Update Avatar")}
          >
            <ListItemIcon>
              <FiImage
                className={clsx(darkMode ? classes.textDark : classes.text)}
              />
            </ListItemIcon>
            <ListItemText
              className={clsx(darkMode ? classes.textDark : classes.text)}
              primary="Update Avatar"
            />
          </MenuItem>
          <MenuItem
            className={classes.delete}
            onClick={() => handleClick("Delete Profile")}
          >
            <ListItemIcon>
              <FaRegTrashAlt
                className={clsx(darkMode ? classes.deleteDark : classes.text)}
              />
            </ListItemIcon>
            <ListItemText
              className={clsx(darkMode ? classes.deleteDark : classes.text)}
              primary="Delete Profile"
            />
          </MenuItem>
        </MenuList>
        <UserSettingsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userSettings={userSettings}
        />
      </a.div>
    </StyledContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.info.light,
    boxShadow: "0px 10px 30px -5px rgba(0,0,0,.3)",
    transition: "box-shadow 0.5s",
    "&:hover": {
      boxShadow: "0px 30px 100px -10px rgba(0,0,0.4)",
    },
  },
  media: {
    width: "7rem",
    height: "7rem",
    margin: "2rem auto",
  },
  menu: {
    borderTop: "1px solid black",
    padding: "1rem",
  },
  menuDark: {
    borderTop: "1px solid white",
    padding: "1rem",
  },
  missingPic: {
    width: "7rem",
    height: "7rem",
    margin: "2rem auto",
  },
  text: {
    color: "#0f2612",
  },
  textDark: {
    color: " #22ccf2",
  },
  deleteDark: {
    color: "#c53a54",
  },
  item: {
    "&:hover": {
      background: "rgba(34,204,242,0.1)",
    },
  },
  delete: {
    "&:hover": {
      background: "rgba(191,33,62, 0.1)",
    },
  },
}));
