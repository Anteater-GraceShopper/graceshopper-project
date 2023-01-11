import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppBar } from "@mui/material";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 0 }}>
      <AppBar position="static" sx={{ bgcolor: "#ffc300" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ color: "#000000" }}>
            Everything Honey
          </Typography>
          <nav>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}

                <Typography
                  variant="h5"
                  component={Link}
                  to="/home"
                  sx={{ mr: 3, ml: 3 }}>
                  Home
                </Typography>

                <Typography
                  variant="h5"
                  component={Link}
                  to="/products"
                  sx={{ mr: 3, ml: 3 }}>
                  Products
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ mr: 3, ml: 3 }}
                  component={Link}
                  onClick={logoutAndRedirectHome}
                  className="logout-button">
                  Logout
                </Typography>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/products">Products</Link>
              </div>
            )}
          </nav>
          <hr />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
