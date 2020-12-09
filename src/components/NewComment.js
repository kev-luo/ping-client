import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "../utils/useForm";
import { CREATE_COMMENT } from "../utils/graphql";

export default function NewPing({ pingId, open, setOpen }) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const initialState = { body: "" };
  const { handleChange, handleSubmit, values, setValues } = useForm(
    createCommentCb,
    initialState
  );

  const [createComment] = useMutation(CREATE_COMMENT, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      ...values,
      pingId: pingId,
    },
    onCompleted() {
      setValues(initialState);
      setOpen(!open);
    },
  });

  function createCommentCb() {
    createComment();
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <DialogContent className={classes.dialogContent}>
        <form noValidate>
          <TextField
            name="body"
            value={values.body}
            onChange={handleChange}
            error={errors.body ? true : false}
            helperText={errors.body}
            fullWidth
            label="New comment"
            inputProps={{ className: classes.colorDark }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.submit}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Comment
        </Button>
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
  submit: {
    margin: "0 10px",
  },
  paper: {
    background: theme.palette.info.main,
  },
  colorDark: {
    color: theme.palette.primary.dark,
    borderBottom: `2px solid ${theme.palette.info.light}`,
  },
}));
