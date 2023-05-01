import { Mail, Notifications, Pets } from "@mui/icons-material";
import BoltIcon from '@mui/icons-material/Bolt';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLogout } from "../hooks/use-Auth";
import { DASHBOARD, FRIENDS, PROFILE } from "../routes/AppRoutes";
import { useNavigate } from 'react-router-dom';
import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";

const pages = [<Home fontSize="small" />, <Group fontSize="small" />, <Storefront fontSize="small" />];

const getUInfofromStorage = (type: any) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
  return userInfo ? userInfo[type] : "";
}

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const MuiNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { logout, isLoading } = useLogout();

  const handleTabSwitch = (value: any) => {
    setActiveTab(value);

    switch (value) {
      case 0:
        return navigate(DASHBOARD);
      case 1:
        return navigate(FRIENDS);
    }
  }

  const handleOpenNavMenu = (event:any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (value:any) => {
    setAnchorElNav(null);
    handleTabSwitch(value);
  };

  return (
    // <AppBar position="sticky">
    <AppBar variant="elevation" position="sticky" color="inherit">
      <StyledToolbar>
        <BoltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>  {/*// this is for mobile view */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={() => handleCloseNavMenu(activeTab)}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {/* <List
                  sx={{
                    // selected and (selected + hover) states
                    "&& .Mui-selected, && .Mui-selected:hover": {
                      bgcolor: "red",
                      "&, & .MuiListItemIcon-root": {
                        color: "pink",
                      },
                    },
                    // hover states
                    "& .MuiListItemButton-root:hover": {
                      bgcolor: "orange",
                      "&, & .MuiListItemIcon-root": {
                        color: "yellow",
                      },
                    },
                  }}
                > */}
            {pages.map((page, i) => ( // this is for mobile view
              <MenuItem
                // key={page}
                // selected={i === activeTab}
                // onClick={() => handleCloseNavMenu(i)}
                sx={{
                  "&.Mui-selected": {
                    color: "green",
                  },
                }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
              //     <ListItemButton
              //       key={i}
              //       onClick={() => handleCloseNavMenu(i)}
              //       selected={i === activeTab}
              //     >
              //       <ListItemIcon>
              //         <ListItemText>{page}</ListItemText>
              //       </ListItemIcon>
              //     </ListItemButton>
            ))}
            {/* // </List> */}
          </Menu>
        </Box>

        <Typography variant="h6" sx={{
          display: { xs: "none", sm: "block" },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
          MYBOOK
        </Typography>



        <Box
          // variant="h5"
          // noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
          }}
        >
          <BoltIcon sx={{ display: { xs: "block", sm: "none" } }} /> {/*visable in mobile view*/}
        </Box>
       
        <Tabs
          value={activeTab}
          onChange={(e, value) => handleTabSwitch(value)}
          indicatorColor="primary"
          sx={{
            flexGrow: 1,
            marginLeft: "36%",
            display: { xs: "none", md: "flex" },
          }}
        >
          {pages.map((page, i) => (
            <Tab key={i} label={page} sx={{
              ':hover': {
                bgcolor: 'ButtonShadow', // theme.palette.primary.main
                color: 'GrayText',
              },
            }} />
          ))}
        </Tabs>

        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setOpen(true)}
            color="inherit"
          >

          <Avatar
            sx={{ width: 30, height: 30 }}
            src={getUInfofromStorage('avatar')}
            onClick={(e) => setOpen(true)}
            />
            </IconButton>
        </Icons>
        {/* <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="body1">John</Typography>
        </UserBox> */}
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate(PROFILE)}>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default MuiNavbar;
