import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Drawer, List, ListItem, ListItemText, ListItemButton,
  Box, Toolbar, AppBar, Typography, IconButton
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { supabase } from "../supabaseClient";
import CreateItem from "../features/CreateItem";
import ItemList from "../features/ItemList";
import ItemView from "../features/ItemView";

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }
        }}
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/create")}> 
              <ListItemText primary="Create Item" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/list")}> 
              <ListItemText primary="Item List" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="create" element={<CreateItem />} />
          <Route path="list" element={<ItemList />} />
          <Route path="view/:id" element={<ItemView />} />
        </Routes>
      </Box>
    </Box>
  );
}
