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

import { CREATE_COMMENT } from "../utils/graphql";

export default function NewPing({ pingId, open, setOpen }) {
  const classes = useStyles();
  const [errors, setErrors] = useState({})
  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: {
      pingId: pingId,
      body: comment,
    },
    update() {
      setComment("");
      setOpen(!open);
    },
  });

  const handleSubmit = () => {
    createComment();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(!open)}>
      <DialogContent className={classes.dialogContent}>
        <form noValidate>
          <TextField
            name="body"
            value={comment}
            onChange={handleChange}
            error={errors.body ? true : false}
            helperText={errors.body}
            rowsMax="3"
            multiline
            fullWidth
            label="New comment"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.submit}
          type="submit"
          variant="contained"
          color="secondary"
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
      width: "250px"
    }
  },
  submit: {
    margin: "0 10px",
  },
}));
