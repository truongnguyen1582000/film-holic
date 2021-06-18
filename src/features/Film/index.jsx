import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import FilmDetailPage from "./pages/FilmDetailPage";
import FilmListPage from "./pages/FilmListPage";

function FilmFeature(props) {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={url} component={FilmListPage} exact></Route>

      <Route path={`${url}/:id`} component={FilmDetailPage}></Route>
    </Switch>
  );
}

export default FilmFeature;
