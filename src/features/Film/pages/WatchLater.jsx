import { Container } from "@material-ui/core";
import axiosClient from "api/axiosClient";
import commonKeys from "constants/common-keys";
import StorageKeys from "constants/storage-keys";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ListFilm from "../components/ListFilm";

function WatchLater(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [filmList, setFilmList] = useState([]);

  const user = useSelector((state) => state.user.current);
  const isLoggedIn = !!user.id;

  useEffect(() => {
    const fetchFilmList = async () => {
      try {
        if (!isLoggedIn) {
          enqueueSnackbar("Please login first !", { variant: "info" });

          return;
        }

        const { id: account_id } = JSON.parse(
          localStorage.getItem(StorageKeys.USER)
        );
        const ssid = localStorage.getItem(StorageKeys.SESSION_ID);
        //https://api.themoviedb.org/3/account/10613297/watchlist/movies?api_key=ac8dbe6b737a115059f9681b7c2a0575&language=en-US&session_id=d2a06504c90eac79d799d9bac1e2bd9c16a98908&sort_by=created_at.asc&page=1
        const filmList = await axiosClient.get(
          `/account/${account_id}/watchlist/movies?api_key=${commonKeys.API_KEY}&session_id=${ssid}`
        );
        setFilmList(filmList.results);
      } catch (err) {
        console.info(err);
      }
    };

    fetchFilmList();
  }, []);
  return (
    <div>
      <Container>
        <ListFilm filmList={filmList} />
      </Container>
    </div>
  );
}

export default WatchLater;
