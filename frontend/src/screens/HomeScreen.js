import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Panner from "../templates/images/panner.jpg";
import MediaControlCard from "../components/MediaControlCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
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
}));

function HomeScreen(props) {
  const classes = useStyles();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <img className={classes.panner} src={Panner}></img>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.productsTitle}>
              {category ? category : "Popular Product"}
            </Typography>
            <>
              <ul className="filter">
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
              </ul>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <div className="products">
                  {products.map((product) => (
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

                  {/* <li key={product._id}>
                      <div className="product">
                        <Link to={"/product/" + product._id}>
                          <img
                            className="product-image"
                            src={product.image}
                            alt="product"
                          />
                        </Link>
                        <div className="product-name">
                          <Link to={"/product/" + product._id}>
                            {product.name}
                          </Link>
                        </div>
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-price">${product.price}</div>
                        <div className="product-rating">
                          <Rating
                            value={product.rating}
                            text={product.numReviews + " reviews"}
                          />
                        </div>
                      </div>
                    </li> */}
                </div>
              )}
            </>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default HomeScreen;
