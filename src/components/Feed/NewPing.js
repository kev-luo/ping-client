import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  ButtonGroup,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { green } from "@material-ui/core/colors";

import { CREATE_PING } from "../../utils/graphql";
import { useForm } from "../../utils/useForm";
import { useMapContext } from "../../utils/useMapContext";

export default function NewPing({open, setOpen}) {
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
    console.log(userPosition.latitude);
    // setValues({...values, imageUrl: img, lat: userPosition.latitude, long: userPosition.longitude})
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
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextField
          name="body"
          value={values.body}
          onChange={handleChange}
          rowsMax="3"
          multiline
          fullWidth
          label="New ping"
        />
        {values.imageUrl && (
          <img
            src={values.imageUrl[0]}
            alt="preview of choosen file"
            className={classes.imgPrev}
          />
        )}
      </DialogContent>
      <DialogActions>
        <ButtonGroup size="small" className={classes.buttonGroup}>
          <Button
            component="label"
            className={classes.fileBtn}
            htmlFor="file"
            variant="contained"
            color="secondary"
          >
            Add an Image
          </Button>
          <input
            id="file"
            style={{ display: "none" }}
            type="file"
            onChange={handleChange}
            name="imageUrl"
            accept="image/*"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={values.body === ""}
            color="secondary"
            endIcon={<SendIcon />}
          >
            Ping
          </Button>
          {isLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 2),
    background: theme.palette.primary.light,
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
