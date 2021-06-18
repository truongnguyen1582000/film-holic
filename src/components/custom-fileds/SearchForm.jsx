import { Box, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "8px",
    marginBottom: theme.spacing(2),
  },
  input: {
    fontSize: "24px",
  },
}));

function SearchForm({ onSubmit }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        id="filled-basic"
        fullWidth
        onChange={(e) => setValue(e.target.value)}
        value={value}
        label="Chú em muốn xem phim gì :)"
        variant="filled"
      />
    </form>
  );
}

export default SearchForm;
