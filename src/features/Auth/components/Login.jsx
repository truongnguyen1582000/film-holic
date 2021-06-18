import axiosClient from "api/axiosClient";
import commonKeys from "constants/common-keys";
import StorageKeys from "constants/storage-keys";
import { useSnackbar } from "notistack";
import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import LoginForm from "./LoginForm";

function Login({ handleClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const ref = useRef("");

  const handleAuth = async () => {
    const url = `authentication/token/new?api_key=${commonKeys.API_KEY}`;
    const { request_token } = await axiosClient.get(url);
    ref.current = request_token;
    window.open(
      `https://www.themoviedb.org/authenticate/${request_token}`,
      "_blank"
    );
  };

  const handleSubmit = async (values) => {
    try {
      // get session id
      const getSessionUrl = `/authentication/session/new?api_key=${commonKeys.API_KEY}`;

      const { session_id } = await axiosClient.post(getSessionUrl, {
        request_token: ref.current,
      });

      // account
      const getAccountUrl = `/account?api_key=${commonKeys.API_KEY}&session_id=${session_id}`;
      const account = await axiosClient.get(getAccountUrl);

      // storage
      dispatch(login({ account, session_id }));

      enqueueSnackbar("Register succcess, Logged-in !", { variant: "success" });

      setTimeout(() => {
        enqueueSnackbar(`Hello ${account.username}`, { variant: "success" });
      }, 500);

      handleClose();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <LoginForm onAuth={handleAuth} onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
