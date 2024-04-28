import React from "react";
import "./Chat.styles.scss";
import { Box, Button, Stack, Typography } from "@mui/material";
import NavbarComponent from "../../components/Navbar/Navbar.component";
import { Outlet, useLocation, useParams } from "react-router-dom";
import "./Chat.styles.scss";
import SidebarComponent from "../../components/Sidebar/Sidebar.component";
import NoUserSelectedComponent from "../../components/NoUserSelected/NoUserSelected.component";

const ChatPage = () => {
  const params = useParams();
  const userSelected = Object.keys(params).length;

  return (
    <>
      <NavbarComponent />
      <Stack
        direction="row"
        sx={{ bgcolor: "#eeeeee", boxSizing: "border-box" }}
      >
        <SidebarComponent />
        {userSelected ? <Outlet /> : <NoUserSelectedComponent />}
      </Stack>
    </>
  );
};

export default ChatPage;
