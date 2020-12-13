import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    fontSize: "2rem",
  },
  topToolbar: {
    backgroundColor: "#3a80d6",
    height: 10,
  },
  toolbar: {
    minHeight: 50,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: "white",
    borderBottom: "1px outset #3a80d6",
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(10),
    color: "#3a80d6",
  },
  title: {
    position: "relative",
    left: "120px",
    marginTop: "10px",

    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontSize: "3rem",
    color: "#3a80d6",
  },
  search: {
    position: "relative",
    top: "1rem",
    left: "25rem",
    borderRadius: theme.shape.borderRadius,
    border: "0.5px solid grey",
    backgroundColor: "white",

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "grey",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
      height: "3rem",
    },
    fontSize: "2rem",
  },
  searchButton: {
    margin: "10px 10px 10px 10px",
    backgroundColor: "#3a80d6",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "#3a80d6",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    fontSize: "1.2rem",
    margin: theme.spacing(1, 1, 1, 1),
    backgroundColor: "#3a80d6",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "#3a80d6",
    },
  },
}));

const headerTheme = createMuiTheme({
  typography: {
    h5: {
      fontSize: 24,
      color: "#3a80d6",
    },
  },
});

export default function Header(props) {
  const classes = useStyles();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  // const category = props.match.params.id ? props.match.params.id : "";
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(listProducts(category));

  //   return () => {
  //     //
  //   };
  // }, [category]);

  // const handleClickSearch = () => {
  //   dispatch(listProducts(category, searchKeyword, sortOrder));
  // };

  return (
    <ThemeProvider theme={headerTheme}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar className={classes.topToolbar}></Toolbar>
          <Toolbar style={{ border: "None" }} className={classes.toolbar}>
            <Link to="/">
              <Typography className={classes.title} variant="h6" noWrap>
                <div className={classes.avatar}></div>
                Ecommerce
              </Typography>
            </Link>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              <Button
                className={classes.searchButton}
                // onClick={handleClickSearch}
              >
                Search
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <ButtonGroup variant={"contained"} style={{ marginTop: 10 }}>
                <Button className={classes.button} color="inherit">
                  <LocationOnIcon />
                  Order Status
                </Button>
                <Button className={classes.button} color="inherit">
                  Login
                </Button>
                <Button className={classes.button} color="inherit">
                  <NotificationsIcon></NotificationsIcon>
                  My Notifications
                </Button>
                <Link to="/cart">
                  <Button className={classes.button} color="inherit">
                    My Cart
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </Button>
                </Link>
              </ButtonGroup>
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>

          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" noWrap>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              Categories
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
