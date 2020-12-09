import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { useForm } from "../../utils/useForm";
import { useAuthContext } from "../../utils/useAuthContext";
import { LOGIN_USER } from "../../utils/graphql";

export default function Login(darkMode) {
  const classes = useStyles();
  const history = useHistory();
  const context = useAuthContext();
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    password: "",
  };
  const { handleChange, handleSubmit, values } = useForm(loginCb, initialState);

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update(_, result) {
      context.login(result.data.login);
      history.push(`/feed/top`);
    },
  });

  function loginCb() {
    loginUser();
  }
  return (
    <>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          className={classes.textfield}
          fullWidth
          value={values.username}
          onChange={handleChange}
          error={errors.username ? true : false}
          helperText={errors.username}
          color="secondary"
          inputProps={{className: (darkMode ? classes.colorDark : "")}}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          className={classes.textfield}
          fullWidth
          value={values.password}
          onChange={handleChange}
          error={errors.password ? true : false}
          helperText={errors.password}
          color="secondary"
          inputProps={{className: classes.colorDark}}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "1rem 5px" }}
        >
          Login
        </Button>
      </form>
    </>
  );
}

const useStyles = makeStyles((themes) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  textfield: {
    margin: themes.spacing(1, 1),
  },
  colorDark: {
    color: themes.palette.primary.dark,
    borderBottom: `2px solid ${themes.palette.info.light}`,
  }
}));
