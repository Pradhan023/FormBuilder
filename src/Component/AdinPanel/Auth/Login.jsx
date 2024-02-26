import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      FormBuilder
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const Nav = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPasswoderror] = useState(false);

  const validate = () => {
    let valid = true;
    if (data.email == "") {
      setEmailerror(true);
      valid = false;
    } else {
      setEmailerror(false);
      valid = true;
    }
    if (data.password == "") {
      setPasswoderror(true);
      valid = false;
    } else {
      setPasswoderror(false);
      valid = true;
    }
    return valid;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const count = Object.values(data);
    if (count[0] == "" || count[1] == "") {
      //here we will check if any of the value is empty then dont display the loader
    }
    if (validate()) {
        const res = await axios.post("https://formbuilder-api.onrender.com/admin/adminlogin",data)
        localStorage.setItem("formtoken",res.data.accessToken);
        localStorage.setItem("adminName",res.data.username);
        if(res.data.msg == "logged In"){
            toast.success("Admin Successfully Login")
            setTimeout(()=>{
                Nav("/")
            },2000)
        }
        else{
            toast.warn(res.data.msg)
        }
      setData({
        email: "",
        password: "",
      });
      console.log(data);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={emailerror}
                  helperText={emailerror ? "Enter Email" : ""}
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    {passworderror ? (
                      <span className="text-red-700">Password</span>
                    ) : (
                      "Password"
                    )}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={passworderror}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    label="Password"
                    required
                  />
                  <FormHelperText>
                    {passworderror ? (
                      <span className="text-red-700">Enter Password</span>
                    ) : (
                      ""
                    )}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item className=" cursor-pointer">
                <Link onClick={()=>Nav('/register')} variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
