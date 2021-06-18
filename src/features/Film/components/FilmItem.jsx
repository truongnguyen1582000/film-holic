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
import { deepOrange } from "@material-ui/core/colors";

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
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default FilmItem;
