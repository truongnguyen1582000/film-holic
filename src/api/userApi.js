import commonKeys from "constants/common-keys";

import axiosClient from "./axiosClient";

export const userApi = {
  login: async (data) => {
    const url = `authentication/token/new?api_key=${commonKeys.API_KEY}`;
    const req_token = await axiosClient.get(url);
    await axiosClient.get(
      `https://www.themoviedb.org/authenticate/${req_token}?redirect_to=http://localhost:3000`
    );
  },
};
