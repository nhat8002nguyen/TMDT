import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Panner from "../templates/images/panner.jpg";
import MediaControlCard from "../components/MediaControlCard";
import Button from "@material-ui/core/Button";
import CategoryProducts from "../components/CategoryProducts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    minHeight: 630,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: "100%",
    margin: "auto",
  },
  panner: {
    src: { Panner },
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  productsTitle: {
    textAlign: "left",
    color: "black",
    position: "relative",
    left: 40,
    fontStyle: "bold",
  },
  categoryItem: {
    textAlign: "left",
    fontSize: theme.spacing(3),
  },
  categoryButton: {
    "& :holder": {
      borderColor: "white",
    },
    borderColor: "white",
    fontSize: theme.spacing(1),
  },
}));

function CategoryScreen(props) {
  const classes = useStyles();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const categoriesWithSet = new Set(
    products.map((product) => product.category)
  );
  const categories = [...categoriesWithSet];

  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(listProducts(category, searchKeyword, sortOrder));
  // };
  // const sortHandler = (e) => {
  //   setSortOrder(e.target.value);
  //   dispatch(listProducts(category, searchKeyword, sortOrder));
  // };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <ul className="categories">
              {categories.map((name, index) => {
                return (
                  <li key={index} className={classes.categoryItem}>
                    <Button
                      className={classes.categoryButton}
                      onClick={() => setCategoryName(name)}
                      value={name}
                    >
                      {name}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <CategoryProducts
            name={categoryName}
            products={products}
            loading={loading}
            error={error}
          ></CategoryProducts>
        </Grid>
      </Grid>
    </div>
  );
}
export default CategoryScreen;
