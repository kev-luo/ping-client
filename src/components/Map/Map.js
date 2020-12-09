import React from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";
import { makeStyles } from "@material-ui/core/styles";

import PingPin from "./PingPin";
import Loading from "../Loading";
import { useMapContext } from "../../utils/useMapContext";

export default function Map({ data, error, darkMode }) {
  const classes = useStyles();
  const {
    state: { userPosition, viewport },
    dispatch,
  } = useMapContext();

  const PingPinsComponents = data ? (
    data?.getPingsByLocation.map((ping) => {
      return (
        <PingPin
          key={ping.id}
          pingId={ping.id}
          long={ping.location.coordinates[0]}
          latt={ping.location.coordinates[1]}
        />
      );
    })
  ) : error ? (
    <Loading err={error} />
  ) : (
    <Loading comp="map" />
  );

  const lightMap = "mapbox://styles/kvnluo/cki8ay4gvbbum19pj0ry9bf4r";
  const darkMap = "mapbox://styles/kvnluo/cki8azb472zvd19obw4ydlvjd";

  return (
    <ReactMapGL
      width="100vw"
      height="100vh"
      mapStyle={darkMode ? darkMap : lightMap}
      mapboxApiAccessToken="pk.eyJ1Ijoia3ZubHVvIiwiYSI6ImNraGo0cmtsbDBqMjYydG4yYTQ4NmY2MTIifQ._goJadkhJVFNIi1pXrsKIA"
      onViewportChange={(newViewport) => {
        dispatch({ type: "UPDATE_VIEWPORT", payload: newViewport });
      }}
      {...viewport}
    >
      <div className={classes.navigationControl}>
        <NavigationControl
          onViewportChange={(newViewport) => {
            dispatch({
              type: "UPDATE_VIEWPORT",
              payload: newViewport,
            });
          }}
        />
      </div>

      {userPosition && (
        <Marker
          latitude={userPosition.latitude}
          longitude={userPosition.longitude}
          offsetLeft={-19}
          offsetTop={-37}
        >
          <PlaceTwoTone
            style={{ fontSize: "40px", color: "red" }}
          ></PlaceTwoTone>
        </Marker>
        // map through all of the pings in order to put pins on the map
      )}

      {PingPinsComponents}
    </ReactMapGL>
  );
}

const useStyles = makeStyles((theme) => ({
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em",
  },
}));
