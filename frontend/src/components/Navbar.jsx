import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';



const Navbar = () => {
  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    toast.success("User Logout Successfully");
    navigate("/login"); 
  };





  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">NB Blogs</Typography>

          {isLogin && (
            <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
              <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />

              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button 
                  sx={{ margin: 1, color: "white" }} 
                  component={Link} 
                  to="/login"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button 
                  sx={{ margin: 1, color: "white" }} 
                  component={Link} 
                  to="/register"
                  startIcon={<HowToRegIcon />}
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button 
                onClick={handleLogout} 
                sx={{ margin: 1, color: "white" }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
