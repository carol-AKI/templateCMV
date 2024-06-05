import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { tokens } from "../../theme";
import axios from "axios";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
         sessionStorage.setItem("group_name", res.data.group_name);
        navigate("/dashboard");
      });
  };


  const [checked, setChecked] = useState(false);

  return (

    <Box
  sx={{
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1f2a40",
    width:"900px",
    height:"550px",
    marginLeft:"400px",
    padding: "10px", 
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", 
  }}
>

    <ThemeProvider>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: colors.greenAccent[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5' component='h1'>
            Login
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              color='secondary'
              name='username'
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              color='secondary'
              name='password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={checked}
                  color='secondary'
                  onChange={() => setChecked(true)}
                />
              }
              label='Remember me'
            />
            <Button
              onClick={handleLogin}
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Box>
  );
};

export default Login;
