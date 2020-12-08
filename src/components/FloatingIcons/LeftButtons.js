import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import { GrUnorderedList } from "react-icons/gr";
import { RiRoadMapLine } from "react-icons/ri";
import { HiOutlinePlus, HiOutlineUser } from "react-icons/hi";
import BtnContainer from "../Styled/StyledFloatingBtnContainer";
import FloatingBtn from "../Styled/StyledFloatingBtn";
import Actions from "../../utils/dashboardActions";
import { useDashboardContext } from "../../utils/useDashboardContext";
import { useAuthContext } from "../../utils/useAuthContext";

export default function LeftTabs({ open, setOpen, userData }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const { dispatch } = useDashboardContext();

  function authorPic(user) {
    return user.imageUrl ? (
      <Avatar
        src={user.imageUrl}
        alt={user.username}
        className={classes.img}
      />
    ) : (
      <Avatar className={classes.img} />
    );
  }

  function userProfile(user) {
    dispatch({ type: Actions.SELECT_USER, payload: user })
  }

  return (
    <BtnContainer>
      <ul>
        {userData.data && <li className={classes.user}>
          {authorPic(userData.data.getUser)}
          <h4 className={classes.username}>@{userData.data.getUser.username}</h4>
        </li>}
        <li className={classes.btn}>
          {pathname === "/map" ? (
            <>
              <FloatingBtn className={classes.btn} to="/">
                <GrUnorderedList size={20} />
              </FloatingBtn>
              <span>Feed</span>
            </>
          ) : (
            <>
              <FloatingBtn className={classes.btn} to="/map">
                <RiRoadMapLine size={20} />
              </FloatingBtn>
              <span>Map</span>
            </>
          )}
        </li>
        <li className={classes.btn}>
          <FloatingBtn className={classes.btn} to="/feed/new" onClick={() => userProfile(user)}>
            <HiOutlineUser size={20} />
          </FloatingBtn>
          <span>My Profile</span>
        </li>
        <li className={classes.btn}>
          <FloatingBtn className={classes.btn} as="button" onClick={() => setOpen(!open)}>
            <HiOutlinePlus size={20} />
          </FloatingBtn>
          <span>Ping</span>
        </li>
      </ul>
    </BtnContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  user: {
    flexDirection: "column",
  },
  username: {
    marginTop: ".5rem",
    color: "var(--theme-primary)",
  },
  img: {
    width: "4.5rem",
    height: "4.5rem",
  },
  btn: {
    background: theme.palette.info.light,
    borderRadius: "50%",
    color: theme.palette.success.main,
    "& ~ span": {
      color: theme.palette.success.main,
    }
  },
}));
