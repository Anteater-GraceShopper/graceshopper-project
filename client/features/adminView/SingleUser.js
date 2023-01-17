import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser, selectSingleUser } from "./singleUserSlice";
import { Select, MenuItem } from "@mui/material";
import UpdateUser from "./UpdateUser";

const SingleUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSingleUser);

  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

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
