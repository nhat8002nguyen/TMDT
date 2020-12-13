import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#3a80d6",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return <footer className={classes.footer}>All right reserved.</footer>;
}
