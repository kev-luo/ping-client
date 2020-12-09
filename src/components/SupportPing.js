import React from "react";
import { useMutation } from "@apollo/client";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";

import { SUPPORT_PING } from "../utils/graphql";

export default function SupportPing({ user, ping }) {
  const history = useHistory();
  const [supportMutation] = useMutation(SUPPORT_PING, {
    onError(err) {
      console.log(err);
    },
  });

  function handleClick(e, suppBool) {
    e.stopPropagation();
    if (user) {
      const alreadySupported = ping.support.filter((supporter) => {
        return (
          supporter.supported === suppBool && supporter.user?.id === user?.id
        );
      });
      if (alreadySupported.length !== 1) {
        supportMutation({ variables: { pingId: ping.id, support: suppBool } });
      }
    } else {
      history.push("/portal");
    }
  }

  function fillIcon(type) {
    if (user) {
      if (type === "support") {
        return ping.support.find(
          (supporter) => supporter.supported && supporter.user?.id === user?.id
        );
      } else {
        return ping.support.find(
          (supporter) => !supporter.supported && supporter.user?.id === user?.id
        );
      }
    }
  }

  return (
    <>
      <div className="like">
        <Tooltip title="Support">
          <IconButton onClick={(e) => handleClick(e, true)}>
            {fillIcon("support") ? (
              <TiArrowUpThick color="#50BF6C" fontSize="large" />
            ) : (
              <TiArrowUpOutline color="#50BF6C" fontSize="large" />
            )}
          </IconButton>
        </Tooltip>
        <span>{ping.supportCount}</span>
      </div>
      <div className="dismiss">
        <Tooltip title="Dismiss">
          <IconButton onClick={(e) => handleClick(e, false)}>
            {fillIcon("dismiss") ? (
              <TiArrowDownThick color="#BF213E" fontSize="large" />
            ) : (
              <TiArrowDownOutline color="#BF213E" fontSize="large" />
            )}
          </IconButton>
        </Tooltip>
        <span>{ping.dismissCount}</span>
      </div>
    </>
  );
}