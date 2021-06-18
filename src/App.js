import Navbar from "components/Navbar";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import FilmFeature from "features/Film";

const NotFound = () => {
  return <div>Page Not Found....</div>;
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/" component={FilmFeature} exact></Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
