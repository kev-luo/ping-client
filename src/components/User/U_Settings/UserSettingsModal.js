import React from "react";
import { Dialog } from "@material-ui/core";

import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

export default function UserSettingsModal(props) {
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

