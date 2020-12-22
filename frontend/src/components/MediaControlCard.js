import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Rating from "@material-ui/lab/Rating";
import { FilterNone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    margin: "20px 10px 20px 10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    textAlign: "left",
    margin: "10px auto auto 10px",
    lineHeight: "2",
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={"/product/" + props.id}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.name}
        />
      </Link>

      <CardContent className={classes.cardContent}>
        <Link to={"/product/" + props.id}>
          <Typography
            style={{ marginBottom: "10px" }}
            variant="h4"
            color="primary"
            component="p"
          >
            {props.name}
          </Typography>
        </Link>

        <Typography component="legend">
          {props.numReviews + " reviews"}
        </Typography>
        <Rating name="read-only" value={props.rating} readOnly />
        <Typography style={{ marginTop: "10px" }} color="black" variant="h4">
          {props.price}$
        </Typography>
        <Typography
          style={{ marginTop: "10px", color: "red", fontStyle: "italic" }}
          variant="h6"
        >
          refund in 30 days
        </Typography>
      </CardContent>
    </Card>
  );
}
