import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField, DialogContent } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Actions from "../../../utils/dashboardActions";
import { useAuthContext } from "../../../utils/useAuthContext";
import { useDashboardContext } from "../../../utils/useDashboardContext";
import { useForm } from "../../../utils/useForm";
import { DELETE_USER, FETCH_PINGS_BY_LOCATION } from "../../../utils/graphql";
import { useMapContext } from "../../../utils/useMapContext";

export default function DeleteUser() {
  const classes = useStyles();
  const history = useHistory();
  const context = useAuthContext();
  const { state: { userPosition}} = useMapContext();
  const {dispatch} = useDashboardContext();
  const initialState = { password: "" };
  const { handleChange, handleSubmit, values } = useForm(
    deleteUserCb,
    initialState
  );

  const [deleteUser] = useMutation(DELETE_USER, {
    onError(err) {
      console.log(err);
    },
    update(cache) {
      const data = cache.readQuery({
        query: FETCH_PINGS_BY_LOCATION,
        variables: { long: userPosition.longitude, latt: userPosition.latitude }
      })
      cache.writeQuery({
        query: FETCH_PINGS_BY_LOCATION,
        variables: { long: userPosition.longitude, latt: userPosition.latitude },
        data: {
          getPingsByLocation: data.getPingsByLocation.filter(ping => ping.author.id !== context.user.id)
        }
      })
      dispatch({ type: Actions.CLEAR_USER });
      context.logout();
      history.push("/");
    },
  });

  function deleteUserCb() {
    deleteUser({ variables: { password: values.password } });
  }

  return (
    <DialogContent className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          onChange={handleChange}
          value={values.password}
          name="password"
          label="Confirm Password"
          variant="outlined"
        />
        <IconButton variant="contained" type="submit">
          <MdDelete />
        </IconButton>
      </form>
    </DialogContent>
  );
}

const useStyles = makeStyles((theme) => ({
}));
