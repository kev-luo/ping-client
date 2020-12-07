import React from "react";
import { useMutation } from "@apollo/client";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LikeBtn, DismissBtn } from "./Styled/StyledPingIcons";

import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";

import { SUPPORT_PING } from "../utils/graphql";

export default function SupportPing({ user, ping }) {
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
          <LikeBtn onClick={(e) => handleClick(e, true)}>
            {fillIcon("support") ? (
              <TiArrowUpThick color="#50BF6C" fontSize="large" />
            ) : (
              <TiArrowUpOutline color="disabled" fontSize="large" />
            )}
          </LikeBtn>
        </Tooltip>
        <span>{ping.supportCount}</span>
      </div>
      <div className="dismiss">
        <Tooltip title="Dismiss">
          <DismissBtn onClick={(e) => handleClick(e, false)}>
            {fillIcon("dismiss") ? (
              <TiArrowDownThick color="#BF213E" fontSize="large" />
            ) : (
              <TiArrowDownOutline color="disabled" fontSize="large" />
            )}
          </DismissBtn>
        </Tooltip>
        <span>{ping.dismissCount}</span>
      </div>
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
