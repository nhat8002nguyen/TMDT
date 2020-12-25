import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(19),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function RegisterScreen(props) {
  const classes = useStyles();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const name = fName + " " + lName;

    if (password !== rePassword) {
      alert("Passwords are not the same, please try again !");
      setPassword("");
      setRePassword("");
      return null;
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="re-password"
                label="Re-Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href={
                  redirect === "/" ? "signin" : "signin?redirect=" + redirect
                }
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

  // (
  //   <div className="form">
  //     <form onSubmit={submitHandler}>
  //       <ul className="form-container">
  //         <li>
  //           <h2>Create Account</h2>
  //         </li>
  //         <li>
  //           {loading && <div>Loading...</div>}
  //           {error && <div>{error}</div>}
  //         </li>
  //         <li>
  //           <label htmlFor="name">Name</label>
  //           <input
  //             type="name"
  //             name="name"
  //             id="name"
  //             onChange={(e) => setName(e.target.value)}
  //           ></input>
  //         </li>
  //         <li>
  //           <label htmlFor="email">Email</label>
  //           <input
  //             type="email"
  //             name="email"
  //             id="email"
  //             onChange={(e) => setEmail(e.target.value)}
  //           ></input>
  //         </li>
  //         <li>
  //           <label htmlFor="password">Password</label>
  //           <input
  //             type="password"
  //             id="password"
  //             name="password"
  //             onChange={(e) => setPassword(e.target.value)}
  //           ></input>
  //         </li>
  //         <li>
  //           <label htmlFor="rePassword">Re-Enter Password</label>
  //           <input
  //             type="password"
  //             id="rePassword"
  //             name="rePassword"
  //             onChange={(e) => setRePassword(e.target.value)}
  //           ></input>
  //         </li>
  //         <li>
  //           <button type="submit" className="button primary">
  //             Register
  //           </button>
  //         </li>
  //         <li>
  //           Already have an account?
  //           <Link
  //             to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
  //             className="button secondary text-center"
  //           >
  //             Create your amazona account
  //           </Link>
  //         </li>
  //       </ul>
  //     </form>
  //   </div>
  // );
}
export default RegisterScreen;
