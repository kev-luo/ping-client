import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import AbsoluteWrapper from "./Styled/AbsoluteWrapper";
import MapView from "../pages/MapView";
import FeedView from "../pages/FeedView";
import { useMapContext } from "../utils/useMapContext";
import { FETCH_PINGS_BY_LOCATION } from "../utils/graphql";

export default function DataWrapper() {
  const route = useParams();
  const { pathname } = useLocation();
  const {
    state: { userPosition },
    dispatch,
  } = useMapContext();

  if (!userPosition) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (!route.pingId) {
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

  const { data, error } = useQuery(FETCH_PINGS_BY_LOCATION, {
    skip: !userPosition,
    variables: { long: userPosition?.longitude, latt: userPosition?.latitude },
  });

  return (
    <AbsoluteWrapper>
      {pathname === "/map" ? (
        <MapView data={data} error={error} />
      ) : (
        <FeedView data={data} error={error} />
      )}
    </AbsoluteWrapper>
  );
}
