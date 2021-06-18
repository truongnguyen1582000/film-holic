import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axiosClient from "api/axiosClient";
import SearchForm from "components/custom-fileds/SearchForm";
import commonKeys from "constants/common-keys";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ListFilm from "../components/ListFilm";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },

  pagination: {
    padding: theme.spacing(1, 0),
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  filter: {
    backgroundColor: "white",
    width: "100%",
  },
  filmList: {},
}));

function FilmListPage(props) {
  const classes = useStyles();
  const [filmList, setFilmList] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [filters, setFilters] = useState(
    `/movie/popular?api_key=${commonKeys.API_KEY}`
  );

  useEffect(() => {
    const fetchFilmList = async () => {
      try {
        const filmList = await axiosClient.get(filters + `&page=${pagination}`);
        setFilmList(filmList.results);
      } catch (err) {
        console.info(err);
      }
    };

    fetchFilmList();
  }, [pagination, filters]);

  const handSearchSubmit = (newVal) => {
    setFilters(`/search/movie?api_key=${commonKeys.API_KEY}&query=${newVal}`);
  };

  return (
    <Container className={classes.root}>
      <Grid container>
        <SearchForm onSubmit={handSearchSubmit} />
      </Grid>
      <Grid container>
        <Box className={classes.filter}>
          <Box padding={1}>Film FIlter</Box>
        </Box>
        <Box className={classes.filmList}>
          <Box padding={1}>
            <ListFilm filmList={filmList} />
            <Pagination
              className={classes.pagination}
              count={500}
              color="primary"
              onChange={(e, val) => setPagination(val)}
            />
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default FilmListPage;
