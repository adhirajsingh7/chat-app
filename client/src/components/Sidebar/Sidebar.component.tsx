import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { users } from "../../data/users.json";
import { NavLink } from "react-router-dom";
import "./Sidebar.styles.scss";

const SidebarComponent = () => {
  return (
    <Stack
      direction="column"
      gap={3}
      sx={{
        height: "calc(100vh - 64px)",
        width: "400px",
        bgcolor: "white",
      }}
    >
      <Stack direction="row" justifyContent="center" sx={{ p: 1 }}>
        <Typography variant="h4">Users list</Typography>
      </Stack>
      <List>
        {users.map((user, index) => {
          return (
            <React.Fragment key={index}>
              <NavLink
                style={{ textDecoration: "none" }}
                to={`${user.id}`}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                replace
                children={({ isActive }) => {
                  return (
                    <>
                      <ListItem
                        disablePadding
                        className={isActive ? "active" : "inactive"}
                        sx={{ color: "black" }}
                        secondaryAction={
                          <Typography variant="caption">{`12:27:00 PM`}</Typography>
                        }
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <Avatar />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              user.name.charAt(0).toUpperCase() +
                              user.name.slice(1)
                            }
                            secondary={"some messages"}
                          />
                        </ListItemButton>
                      </ListItem>
                    </>
                  );
                }}
              ></NavLink>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Stack>
  );
};

export default SidebarComponent;
