import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { ButtonGroup, Input } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "@material-ui/core/Avatar";
import ShopIcon from "@material-ui/icons/Shop";
import AdminMenu from "./AdminMenu";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#4293fc",
    fontFamily: "Times New Roman",
  },
  toolbarTitle: {
    flex: 1,
    color: "white",
    "& :hover": {
      color: "white",
    },
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
    backgroundColor: "#03a5fc",
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    fontFamily: "Times New Roman",
  },
  search: {
    fontSize: "16px",
    color: "white",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: "white",
    "& :hover": {
      color: "white",
    },
  },

  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  button: {
    color: "white",
    border: "none",
    "&:hover": {
      border: "white",
      color: "white",
    },
    fontSize: theme.spacing(1.5),
  },
}));

function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link className={classes.toolbarTitle} href="/">
          <Typography variant="h4" color="inherit">
            {title}
          </Typography>
        </Link>

        <div>
          <Input
            className={classes.search}
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          ></Input>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>

        <ButtonGroup
          className={classes.ButtonGroup}
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button className={classes.button} variant="outlined" size="small">
            <LocationOnIcon></LocationOnIcon>
            Order Status
          </Button>
          {props.userInfo ? (
            <Button
              className={classes.button}
              href="/profile"
              variant="outlined"
              size="small"
            >
              <Avatar
                className={classes.avatar}
                alt={props.userInfo.name}
                src="../templates/images/person.jpeg"
              ></Avatar>
            </Button>
          ) : (
            <Button
              className={classes.button}
              href="/signin"
              variant="outlined"
              size="small"
            >
              Sign in
            </Button>
          )}

          <Button
            className={classes.button}
            href="cart"
            variant="outlined"
            size="small"
          >
            <ShoppingCartIcon></ShoppingCartIcon>
            My Cart
          </Button>
        </ButtonGroup>
        {props.userInfo && props.userInfo.isAdmin && <AdminMenu />}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            key={section.title}
            variant="h5"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
