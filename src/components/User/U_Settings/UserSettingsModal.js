import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";

import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

export default function UserSettingsModal(props) {
  const classes = useStyles();
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(!props.isOpen)}
    >
      {props.userSettings === "Update Avatar" ? (
        <UpdateUser setIsOpen={props.setIsOpen} />
      ) : (
        <DeleteUser />
      )}
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
