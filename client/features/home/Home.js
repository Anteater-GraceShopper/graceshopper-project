import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
/**
 * COMPONENT
 */
const Home = (props) => {
  const firstName = useSelector((state) => state.auth.me.first);

  return (
    <div>
      <Typography align="center" variant="h3" sx={{ mt: 3 }}>
        Welcome, {firstName}!
      </Typography>
    </div>
  );
};

export default Home;
