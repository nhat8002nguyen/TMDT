import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import { makeStyles } from "@material-ui/core/styles";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  imagePaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 600,
    maxHeight: 650,
  },
  detailImage: {
    width: "100%",
  },
  contentPaper: {
    textAlign: "left",
    color: "black",
    minHeight: 600,
    maxHeight: 650,
    paddingLeft: theme.spacing(4),
    lineHeight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  rating: {
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  description: {
    color: "gray",
    marginTop: theme.spacing(2),
    minHeight: 200,
  },

  qualityAction: {
    display: "flex",
  },
  quantityBox: {
    width: 40,
    height: 25,
  },
  addCartButton: {
    display: "flex",
    marginTop: "20px",
  },
}));

function ProductScreen(props) {
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div className={classes.root}>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.imagePaper}>
                <div>
                  <img
                    className={classes.detailImage}
                    src={product.image}
                    alt={product.name}
                  ></img>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper className={classes.contentPaper}>
                <Typography variant="h2">{product.name}</Typography>
                <div className={classes.rating}>
                  <Rating name="read-only" value={product.rating} readOnly />
                  <Typography component="body1">
                    ({product.numReviews} reviews)
                  </Typography>
                </div>
                <div style={{ display: "flex" }}>
                  <Typography variant="h3">{product.price}$ </Typography>
                  <Typography
                    variant="h3"
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                      marginLeft: "5px",
                    }}
                  >
                    ({product.price * 1.2}$)
                  </Typography>
                </div>
                <Typography className={classes.description} variant="h5">
                  {product.description}
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    marginBottom: "10px",
                  }}
                >
                  discount 50% for category {product.category}
                </Typography>
                <div>
                  <Typography
                    style={{
                      color: "gray",
                      marginBottom: "10px",
                      fontStyle: "italic",
                    }}
                    variant="h4"
                  >
                    {" "}
                    Quality{" "}
                  </Typography>

                  <div className={classes.qualityAction}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        setQty((prev) => (prev === 1 ? prev : prev - 1))
                      }
                    >
                      <RemoveIcon></RemoveIcon>
                    </Button>
                    <input
                      type="text"
                      value={qty}
                      className={classes.quantityBox}
                    ></input>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setQty((prev) => prev + 1)}
                    >
                      <AddIcon></AddIcon>
                    </Button>
                  </div>
                </div>
                <div className={classes.addCartButton}>
                  <Button
                    style={{
                      fontSize: "2rem",
                      backgroundColor: "#4293fc",
                      color: "white",
                    }}
                    variant="outlined"
                    color="primary"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <div className="content-margined">
                  <h2>Reviews</h2>
                  {!product.reviews.length && <div>There is no review</div>}
                  <ul className="review" id="reviews">
                    {product.reviews.map((review) => (
                      <li key={review._id}>
                        <div>{review.name}</div>
                        <div>
                          <Rating value={review.rating}></Rating>
                        </div>
                        <div>{review.createdAt.substring(0, 10)}</div>
                        <div>{review.comment}</div>
                      </li>
                    ))}
                    <li>
                      <h3>Write a customer review</h3>
                      {userInfo ? (
                        <form onSubmit={submitHandler}>
                          <ul className="form-container">
                            <li>
                              <label htmlFor="rating">Rating</label>
                              <select
                                name="rating"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very Good</option>
                                <option value="5">5- Excelent</option>
                              </select>
                            </li>
                            <li>
                              <label htmlFor="comment">Comment</label>
                              <textarea
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></textarea>
                            </li>
                            <li>
                              <button
                                type="submit"
                                className="button primary"
                                style={{
                                  backgroundColor: "#4293fc",
                                  color: "white",
                                }}
                              >
                                Submit
                              </button>
                            </li>
                          </ul>
                        </form>
                      ) : (
                        <div>
                          Please <Link to="/signin">Sign-in</Link> to write a
                          review.
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );

  // return (
  //   <div>
  //     <div className="back-to-result">
  //       <Link to="/">Back to result</Link>
  //     </div>
  //     {loading ? (
  //       <div>Loading...</div>
  //     ) : error ? (
  //       <div>{error} </div>
  //     ) : (
  //       <>
  //         <div className="details">
  //           <div className="details-image">
  //             <img src={product.image} alt="product"></img>
  //           </div>
  //           <div className="details-info">
  //             <ul>
  //               <li>
  //                 <h4>{product.name}</h4>
  //               </li>
  //               <li>
  //                 <a href="#reviews">
  //                   <Rating
  //                     value={product.rating}
  //                     text={product.numReviews + ' reviews'}
  //                   />
  //                 </a>
  //               </li>
  //               <li>
  //                 Price: <b>${product.price}</b>
  //               </li>
  //               <li>
  //                 Description:
  //                 <div>{product.description}</div>
  //               </li>
  //             </ul>
  //           </div>
  //           <div className="details-action">
  //             <ul>
  //               <li>Price: {product.price}</li>
  //               <li>
  //                 Status:{' '}
  //                 {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
  //               </li>
  //               <li>
  //                 Qty:{' '}
  //                 <select
  //                   value={qty}
  //                   onChange={(e) => {
  //                     setQty(e.target.value);
  //                   }}
  //                 >
  //                   {[...Array(product.countInStock).keys()].map((x) => (
  //                     <option key={x + 1} value={x + 1}>
  //                       {x + 1}
  //                     </option>
  //                   ))}
  //                 </select>
  //               </li>
  //               <li>
  //                 {product.countInStock > 0 && (
  //                   <button
  //                     onClick={handleAddToCart}
  //                     className="button primary"
  //                   >
  //                     Add to Cart
  //                   </button>
  //                 )}
  //               </li>
  //             </ul>
  //           </div>
  //         </div>

  //       </>
  //     )}
  //   </div>
  // );
}
export default ProductScreen;
