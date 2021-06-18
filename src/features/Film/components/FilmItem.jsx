import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import commonKeys from "constants/common-keys";
import { Avatar } from "@material-ui/core";
import { useSnackbar } from "notistack";
import axiosClient from "api/axiosClient";
import StorageKeys from "constants/storage-keys";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    position: "relative",
    overflow: "auto",
  },
  media: {
    height: 340,
  },
  overview: {
    height: 60,

    maxHeight: 140,
    backgroundColor: "transparent",

    overflow: "hidden",
  },
  title: {
    height: 60,

    maxHeight: "100px",
    overflow: "hidden",
  },
  orange: {
    backgroundColor: "#F1B722",
  },
  rate: {
    position: "absolute",
    top: 2,
    left: 2,
    zIndex: 1,
  },
  content: {},
}));

function FilmItem({ filmItem }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id: account_id } = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const ssid = localStorage.getItem(StorageKeys.SESSION_ID);

  const handleWatchLaterClick = () => {
    // https://api.themoviedb.org/3/account/ai/watchlist?api_key=ac8dbe6b737a115059f9681b7c2a0575&session_id=ssid
    const addToWatchLater = async () => {
      try {
        await axiosClient.post(
          `${commonKeys.STATIC_HOST}/account/${account_id}/watchlist?api_key=${commonKeys.API_KEY}&session_id=${ssid}`,
          {
            media_type: "movie",
            media_id: filmItem.id,
            watchlist: true,
          }
        );
      } catch (err) {
        enqueueSnackbar("Add watch later fail.", { variant: "error" });
      }
    };

    addToWatchLater();

    enqueueSnackbar("Add watch later success", { variant: "success" });
  };

  return (
    <Card className={classes.root}>
      <Avatar className={`${classes.orange} ${classes.rate}`}>
        {filmItem.vote_average}
      </Avatar>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={commonKeys.IMG_URL + filmItem.poster_path}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {filmItem.title}
          </Typography>
          <Typography
            className={classes.overview}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {filmItem.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={handleWatchLaterClick}
          size="medium"
          variant="contained"
          color="primary"
        >
          Watch Later
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default FilmItem;
