import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser, selectSingleUser } from "./singleUserSlice";
import { Select, MenuItem } from "@mui/material";
import UpdateUser from "./UpdateUser";
// import Grid from "@mui/material/Grid";
// import CardMedia from "@mui/material/CardMedia";
// import { CardContent } from "@mui/material";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";

const SingleUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSingleUser);

  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  console.log(user.isAdmin);
  return (
    <div>
      <p>
        {user.first} {user.last}
      </p>
      {user.isAdmin ? <p>Admin</p> : <p>Customer</p>}
      <UpdateUser />
    </div>
  );
};

export default SingleUser;
