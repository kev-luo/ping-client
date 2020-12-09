import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FiSend, FiImage } from "react-icons/fi";
import { green } from "@material-ui/core/colors";

import { CREATE_PING } from "../utils/graphql";
import { useForm } from "../utils/useForm";
import { useMapContext } from "../utils/useMapContext";

export default function NewPing({ open, setOpen }) {
  const {
    state: { userPosition },
  } = useMapContext();
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const initialState = { body: "", imageUrl: "" };
  const { handleChange, handleSubmit, values, setValues } = useForm(
    createPingCb,
    initialState
  );

  const [createPing] = useMutation(CREATE_PING, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setIsLoading(!isLoading);
    },
    onCompleted() {
      setValues(initialState);
      setIsLoading(!isLoading);
      setOpen(!open);
    },
  });

  function createPingCb(img) {
    createPing({
      variables: {
        ...values,
        imageUrl: img,
        lat: userPosition.latitude,
        long: userPosition.longitude,
      },
    });
  }

  function loaderSubmit(e) {
    setIsLoading(!isLoading);
    handleSubmit(e);
  }

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <DialogContent className={classes.dialogContent}>
        <form noValidate>
          <TextField
            name="body"
            value={values.body}
            onChange={handleChange}
            fullWidth
            label="Let the people know!"
            error={errors.body ? true : false}
            helperText={errors.body}
            inputProps={{ className: classes.colorDark }}
          />
          <input
            id="file"
            style={{ display: "none" }}
            type="file"
            onChange={handleChange}
            name="imageUrl"
            accept="image/*"
          />
        </form>
        {values.imageUrl && (
          <img
            src={values.imageUrl[0]}
            alt="preview of choosen file"
            className={classes.imgPrev}
          />
        )}
      </DialogContent>
      <DialogActions className={classes.btns}>
        <Button
          component="label"
          htmlFor="file"
          variant="contained"
          color="primary"
          endIcon={<FiImage />}
        >
          Add Image
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<FiSend />}
          onClick={loaderSubmit}
        >
          Ping
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    width: "500px",
    "@media (max-width: 600px)": {
      width: "250px",
    },
  },
  imgPrev: {
    height: "250px",
    display: "block",
    margin: "0 auto",
    marginTop: 20,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  btns: {
    margin: "1rem",
    marginTop: ".5rem",
  },
  paper: {
    background: theme.palette.info.main,
  },
  colorDark: {
    color: theme.palette.primary.dark,
    borderBottom: `2px solid ${theme.palette.info.light}`,
  },
}));
