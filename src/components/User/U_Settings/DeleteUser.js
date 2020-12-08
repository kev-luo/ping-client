import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, DialogContent } from "@material-ui/core";
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
  const [errors, setErrors] = useState({})
  const history = useHistory();
  const context = useAuthContext();
  const {
    state: { userPosition },
  } = useMapContext();
  const { dispatch } = useDashboardContext();
  const initialState = { password: "" };
  const { handleChange, handleSubmit, values } = useForm(
    deleteUserCb,
    initialState
  );

  const [deleteUser] = useMutation(DELETE_USER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update(cache) {
      const data = cache.readQuery({
        query: FETCH_PINGS_BY_LOCATION,
        variables: {
          long: userPosition.longitude,
          latt: userPosition.latitude,
        },
      });
      cache.writeQuery({
        query: FETCH_PINGS_BY_LOCATION,
        variables: {
          long: userPosition.longitude,
          latt: userPosition.latitude,
        },
        data: {
          getPingsByLocation: data.getPingsByLocation.filter(
            (ping) => ping.author.id !== context.user.id
          ),
        },
      });
      dispatch({ type: Actions.CLEAR_USER });
      context.logout();
      history.push("/");
    },
  });

  function deleteUserCb() {
    deleteUser({ variables: { password: values.password } });
  }

  return (
    <DialogContent className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          onChange={handleChange}
          value={values.password}
          name="password"
          label="Confirm Password"
          variant="outlined"
          error={errors.password ? true : false }
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" className={classes.btn}>
          Delete Profile
        </Button>
      </form>
    </DialogContent>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
  },
  btn: {
    marginLeft: "2rem",
    height: "3rem",
  },
}));
