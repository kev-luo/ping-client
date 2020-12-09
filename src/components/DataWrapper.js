import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import AbsoluteWrapper from "./Styled/AbsoluteWrapper";
import MapView from "../pages/MapView";
import FeedView from "../pages/FeedView";
import SinglePing from "../pages/SinglePing";
import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";
import { useMapContext } from "../utils/useMapContext";
import {
  FETCH_PINGS_BY_LOCATION,
  FETCH_USER_QUERY,
  FETCH_PING_QUERY,
} from "../utils/graphql";

export default function DataWrapper({ darkMode }) {
  const classes = useStyles();
  const params = useParams();
  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const dashContext = useDashboardContext();
  const {
    state: { userPosition },
    dispatch,
  } = useMapContext();

  useEffect(() => {
    if (!dashContext.state.selectedUser && user) {
      dashContext.dispatch({ type: Actions.SELECT_USER, payload: user });
    }

    if (!userPosition) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          if (!params.pingId) {
            dispatch({
              type: "UPDATE_VIEWPORT",
              payload: { latitude, longitude, zoom: 13 },
            });
          }
          dispatch({
            type: "UPDATE_USER_POSITION",
            payload: { latitude, longitude },
          });
        });
      }
    }
  });

  const userData = useQuery(FETCH_USER_QUERY, {
    skip: !dashContext.state.selectedUser,
    variables: { userId: dashContext.state.selectedUser?.id },
  });

  const pingsData = useQuery(FETCH_PINGS_BY_LOCATION, {
    skip: !userPosition || params.pingId,
    variables: { long: userPosition?.longitude, latt: userPosition?.latitude },
  });

  const pingData = useQuery(FETCH_PING_QUERY, {
    skip: !params.pingId,
    variables: { pingId: params.pingId },
  });

  return (
    <AbsoluteWrapper className={classes.root}>
      {pathname === "/map" ? (
        <MapView darkMode={darkMode} pingData={pingsData} userData={userData} />
      ) : params.pingId ? (
        <SinglePing darkMode={darkMode} pingData={pingData} userData={userData} />
      ) : (
        <FeedView darkMode={darkMode} pingData={pingsData} userData={userData} />
      )}
    </AbsoluteWrapper>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.info.main,
  }
}))