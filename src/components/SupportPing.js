import React from "react";
import { useMutation } from "@apollo/client";
import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  FaRegHeart,
  FaRegMinusSquare,
  FaMinusSquare,
  FaHeart,
} from "react-icons/fa";

import { SUPPORT_PING } from "../utils/graphql";

export default function SupportPing({ user, ping }) {
  const classes = useStyles();

  const [supportMutation] = useMutation(SUPPORT_PING, {
    onError(err) {
      console.log(err);
    },
  });

  function handleClick(suppBool) {
    if (user) {
      const alreadySupported = ping.support.filter((supporter) => {
        return (
          supporter.supported === suppBool && supporter.user.id === user.id
        );
      });
      if (alreadySupported.length !== 1) {
        supportMutation({ variables: { pingId: ping.id, support: suppBool } });
      }
    }
  }

  function fillIcon(type) {
    if (type === "support") {
      return ping.support.find(
        (supporter) => supporter.supported && supporter.user.id === user.id
      );
    } else {
      return ping.support.find(
        (supporter) => !supporter.supported && supporter.user.id === user.id
      );
    }
  }

  return (
    <>
      <Tooltip title="Support">
        <IconButton onClick={() => handleClick(true)}>
          {fillIcon("support") ? (
            <FaHeart className={classes.support} size={15} />
          ) : (
            <FaRegHeart className={classes.support} size={15} />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Dismiss">
        <IconButton onClick={() => handleClick(false)}>
          {fillIcon("dismiss") ? (
            <FaMinusSquare className={classes.dismiss} size={15} />
          ) : (
            <FaRegMinusSquare className={classes.dismiss} size={15} />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}

const useStyles = makeStyles(() => ({
  support: {
    color: "#ff6666",
  },
  dismiss: {
    color: "gray",
  },
}));
