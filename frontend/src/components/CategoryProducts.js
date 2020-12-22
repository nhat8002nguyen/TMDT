import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Panner from "../templates/images/panner.jpg";
import MediaControlCard from "../components/MediaControlCard";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: "100%",
    margin: "auto",
  },
  productsTitle: {
    textAlign: "left",
    color: "black",
    position: "relative",
    left: 40,
    fontStyle: "bold",
  },
}));

export default function CategoryProducts(props) {
  const classes = useStyles();

  const displayedProducts = props.products.filter(
    (product) => product.category === props.name
  );

  return (
    <Paper className={classes.paper}>
      <>
        {props.name && (
          <Typography variant="h4" className={classes.productsTitle}>
            {props.name}
          </Typography>
        )}

        {/* <ul className="filter">
          <li>
            <form onSubmit={submitHandler}>
              <input
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </li>
          <li>
            Sort By{" "}
            <select name="sortOrder" onChange={sortHandler}>
              <option value="">Newest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </li>
        </ul> */}
        {props.loading ? (
          <div>Loading...</div>
        ) : props.error ? (
          <div>{props.error}</div>
        ) : (
          <ul className="products">
            {displayedProducts.map((product) => (
              <MediaControlCard
                id={product._id}
                image={product.image}
                name={product.name}
                brand={product.brand}
                price={product.price}
                rating={product.rating}
                numReviews={product.numReviews}
              />
            ))}
          </ul>
        )}
      </>
    </Paper>
  );
}
