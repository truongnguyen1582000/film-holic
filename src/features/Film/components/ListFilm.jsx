import { Grid } from "@material-ui/core";
import React from "react";
import FilmItem from "./FilmItem";

function ListFilm({ filmList }) {
  console.log(filmList);
  return (
    <Grid container spacing={2}>
      {filmList.map((filmItem) => (
        <Grid item key={filmItem.id} xs={12} sm={6} md={3}>
          <FilmItem filmItem={filmItem} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ListFilm;
