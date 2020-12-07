import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import { GrUnorderedList } from "react-icons/gr";
import { RiRoadMapLine } from "react-icons/ri";
import { HiOutlinePlus, HiOutlineUser } from "react-icons/hi";
import TabContainer from "../Styled/StyledFloatingBtnContainer";
import FloatingBtn from "../Styled/StyledFloatingBtn";
import Actions from "../../utils/dashboardActions";
import { useDashboardContext } from "../../utils/useDashboardContext";
import { useAuthContext } from "../../utils/useAuthContext";

const LeftTabContainer = styled(TabContainer)`
  left: 6rem;
`;

const LeftFloatingBtn = styled(FloatingBtn)`
  color: var(--theme-primary);
  &:hover {
    box-shadow: 2px 4px 6px -1px rgba(80, 191, 108, 0.75);
    transform: scale(1.1);
  }
  & ~ span {
    margin-left: 1rem;
  }
`;

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
    <LeftTabContainer>
      <ul>
        {userData.data && <li className={classes.user}>
          {authorPic(userData.data.getUser)}
          <h4 className={classes.username}>@{userData.data.getUser.username}</h4>
        </li>}
        <li className={classes.btn}>
          {pathname === "/map" ? (
            <>
              <LeftFloatingBtn to="/">
                <GrUnorderedList size={20} />
              </LeftFloatingBtn>
              <span>Feed</span>
            </>
          ) : (
            <>
              <LeftFloatingBtn to="/map">
                <RiRoadMapLine size={20} />
              </LeftFloatingBtn>
              <span>Map</span>
            </>
          )}
        </li>
        <li className={classes.btn}>
          <LeftFloatingBtn to="/feed/new" onClick={() => userProfile(user)}>
            <HiOutlineUser size={20} />
          </LeftFloatingBtn>
          <span>My Profile</span>
        </li>
        <li className={classes.btn}>
          <LeftFloatingBtn as="button" onClick={() => setOpen(!open)}>
            <HiOutlinePlus size={20} />
          </LeftFloatingBtn>
          <span>Ping</span>
        </li>
      </ul>
    </LeftTabContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  user: {
    flexDirection: "column",
  },
  btn: {
    flexDirection: "row",
  },
  img: {
    width: "4.5rem",
    height: "4.5rem",
  },
  username: {
    marginTop: ".5rem",
    color: "var(--theme-primary)",
  }
}));
