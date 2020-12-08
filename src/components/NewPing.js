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
import SendIcon from "@material-ui/icons/Send";
import { green } from "@material-ui/core/colors";

import { CREATE_PING } from "../utils/graphql";
import { useForm } from "../utils/useForm";
import { useMapContext } from "../utils/useMapContext";

export default function NewPing({ open, setOpen }) {
  const {
    state: { userPosition },
  } = useMapContext();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const initialState = { body: "", imageUrl: "" };
  const { handleChange, handleSubmit, values, setValues } = useForm(
    createPingCb,
    initialState
  );

  const [createPing] = useMutation(CREATE_PING, {
    onError(err) {
      console.log(err);
    },
    onCompleted() {
      setValues(initialState);
      setIsLoading(!isLoading);
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
    setOpen(!open);
  }

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className={classes.dialogContent}>
        <form noValidate>
          <TextField
            name="body"
            value={values.body}
            onChange={handleChange}
            rowsMax="3"
            fullWidth
            multiline
            label="Let the people know!"
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
      <DialogActions>
        <Button
          component="label"
          className={classes.fileBtn}
          htmlFor="file"
          variant="contained"
          color="secondary"
        >
          Add an Image
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={values.body === ""}
          color="secondary"
          endIcon={<SendIcon />}
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
  },
  buttonGroup: {
    margin: theme.spacing(1),
    position: "relative",
  },
  fileBtn: {
    padding: "10px",
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
}));
