import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import FilmDetailPage from "./pages/FilmDetailPage";
import FilmListPage from "./pages/FilmListPage";

function FilmFeature(props) {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route to={url} component={FilmListPage}></Route>
      <Route to={`${url}/:id`} component={FilmDetailPage}></Route>
    </Switch>
  );
}

export default FilmFeature;
