import {
  AccountBox,
  Group,
  Home,
  Storefront
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, FRIENDS, PROFILE } from "../routes/AppRoutes";

const Sidebar = ({mode,setMode}:any) => {
  const navigate = useNavigate();

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding onClick={() => navigate(DASHBOARD)}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding onClick={() => navigate(FRIENDS)}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding onClick={() => navigate(PROFILE)}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
