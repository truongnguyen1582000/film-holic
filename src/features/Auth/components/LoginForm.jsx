import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import InputField from "components/custom-fileds/InputField";
import PasswordField from "components/custom-fileds/PasswordField";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginBottom: theme.spacing(1),
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  btn: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function LoginForm({ onSubmit, onAuth }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    username: yup.string().required("Please enter your email or user name."),
    password: yup.string().required("Please enter your password."),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  // add async await for loading progress
  const handleSubmit = async (values) => {
    await onSubmit(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.root}>
      <Avatar className={classes.icon}>
        <LockIcon />
      </Avatar>
      <Typography className={classes.heading} variant="h5">
        Create An Account
      </Typography>
      <InputField
        name="username"
        label="Email or User name"
        placeholder="Enter user name"
        form={form}
      />

      <PasswordField
        name="password"
        label="Password"
        placeholder="Enter your password."
        form={form}
      />

      {isSubmitting && <LinearProgress />}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => onAuth()}
        disabled={isSubmitting}
      >
        3rd Party Authentication Request
      </Button>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        className={classes.btn}
        disabled={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
}

export default LoginForm;
