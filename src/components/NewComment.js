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

  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      pingId: pingId,
      body: comment,
    },
    update() {
      setComment("");
    },
  });

  const handleSubmit = () => {
    createComment();
    setOpen(!open);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(!open)}>
      <DialogContent>
        <form noValidate>
          <TextField
            name="body"
            value={comment}
            onChange={handleChange}
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
          disabled={comment === ""}
          onClick={handleSubmit}
        >
          Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2),
    background: theme.palette.primary.light,
  },
  submit: {
    margin: "0 10px",
  },
  buttonGroup: {
    marginLeft: "1rem",
  },
}));
