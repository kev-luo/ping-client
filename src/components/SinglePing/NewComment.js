import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Paper, TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CREATE_COMMENT } from "../../utils/graphql";

export default function NewPing(props) {
  const pingId = props.pingId;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  return (
    <Paper className={classes.paper}>
      <form style={{ display: "flex" }} onSubmit={(e) => handleSubmit(e)}>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={10}>
            <TextField
              name="body"
              value={comment}
              onChange={handleChange}
              rowsMax="3"
              multiline
              fullWidth
              label="New comment"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
            className={classes.submit}
              type="submit"
              variant="contained"
              color="secondary"
              disabled={comment === ""}
            >
              Comment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
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
