import { Email, Key } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { db, auth, provider } from "../firebaseConfig/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataProvider";
import logo from "../images/logo.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useData();
  const navigate = useNavigate();
  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const redirect = handleLogin();
        navigate(redirect);
      })
      .catch((errorCode) => {
        if (errorCode === "auth/wrong-password") {
          setLoading(false);
          console.log("error while logging in: ", errorCode);
        } else if (errorCode === "auth/user-not-found") {
          setLoading(false);
          console.log("error while logging in: ", errorCode);
        } else {
          console.error(errorCode);
          setLoading(false);
        }
      });
  };
  const GoogleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      const redirect = handleLogin();
      navigate(redirect);
    });
  };
  return (
    <Box sx={styles.mainContainer}>
      <Grid
        container
        xs={11}
        sm={8}
        md={6}
        lg={4}
        xl={3}
        style={styles.loginContainer}
      >
        <Grid
          item
          style={{
            display: "flex",
            width: "100%",
            margin: "40px auto 0px",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            style={{
              borderRadius: "15px",
              padding: "10px",
              justifyContent: "center",
              width: 220,
              height: 110,
            }}
            width={220}
            height={100}
            alt={"logo"}
          />
        </Grid>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            margin: "30px auto 10px",
          }}
        >
          <Typography>Log In :</Typography>
          <TextField
            sx={styles.textField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            placeholder="Email"
          />
          <TextField
            sx={styles.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            margin: "10px auto 10px",
          }}
        >
          <LoadingButton
            sx={{
              width: "100%",
              fontSize: "16px",
              backgroundColor: "red",
              height: "40px",
              borderRadius: "10px",
              color: "#FFF",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            loading={loading}
            onClick={login}
            title="Login"
          >
            Login
          </LoadingButton>
          <Grid
            item
            sx={{
              display: "flex",
              marginY: "15px",
              justifyContent: "space-between",
            }}
          >
            <Box
              onClick={() => {
                console.log();
              }}
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                borderRight: "1px solid grey",
              }}
            >
              <Typography
                sx={(theme) => ({
                  color: "blue",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                })}
              >
                Forgotten password?
              </Typography>
            </Box>
            <Box onClick={() => navigate("/createaccount")}>
              <Typography
                sx={(theme) => ({
                  color: "green",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                })}
              >
                Create New Account
              </Typography>
            </Box>
          </Grid>
          <hr style={{ width: "100%", color: "grey" }}></hr>
          <Button
            sx={{
              width: "100%",
              fontSize: "16px",
              backgroundColor: "red",
              height: "40px",
              borderRadius: "10px",
              marginY: "15px",
              color: "#FFF",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={GoogleLogin}
          >
            Sign In with Google
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
const styles = {
  mainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "grey",
    backgroundImage:
      'url("https://cdn.supergas.com/-/media/sites/india/root/home-hero-image.jpg?rev=83456eb1ebae4d2f8d194a19e04d2eec&w=1920&hash=09D0C0CD310D38C752198E459F0DACAB")',
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  input: {
    display: "block",
    marginTop: 10,
    width: 250,
    height: 40,
    borderRadius: 50,
  },
  textField: {
    marginTop: "10px",
    border: "1px solid red",
    borderRadius: "20px",
    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover": {
      "& fieldset": {
        border: "1px solid red",
      },
    },
    "& input::placeholder": {
      fontSize: "13px",
      color: "black",
    },
    "& div": {
      borderRadius: "20px",
    },
    "& input": {
      display: "block",
      // marginTop: 1,
      width: 250,
      height: 30,
      borderRadius: 50,
      color: "black",
      borderColor: "red !important",
    },
  },
};
