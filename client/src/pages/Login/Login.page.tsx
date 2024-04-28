import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser((prev: ILoginUser) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(user);

    // try {
    //   const response = await axios.post("users/session/login", {
    //     ...user,
    //   });
    // const response = await axios.get("/users");
    // console.log(response);
    // navigate("/", {replace: true});
    // window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // useEffect(() => {
  //   const cookies = new Cookies(null, { path: "/" });
  //   const token = cookies.get("token");
  //   if (token) navigate("/", {replace: true});
  // }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          gap={3}
          sx={{ height: "300px", width: "400px" }}
        >
          <Typography variant="h4">Log in</Typography>
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginPage;
