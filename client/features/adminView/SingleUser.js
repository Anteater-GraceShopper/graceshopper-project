import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUser,
  selectSingleUser,
  editSingleUser,
} from "./singleUserSlice";
import { Select, MenuItem } from "@mui/material";
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
  const [admin, setAdmin] = useState("");
  const handleAdmin = (e) => {
    setAdmin(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editSingleUser({ userId, admin }));
  };
  console.log(user.isAdmin);
  return (
    <div>
      <p>
        {user.first} {user.last}
      </p>
      {user.isAdmin ? <p>Admin</p> : <p>Customer</p>}
      <form className="update-user" onSubmit={handleSubmit}>
        <select value={admin || ""} onChange={handleAdmin}>
          <option value={user.isAdmin}>Admin</option>
          <option value={!user.isAdmin}>Customer</option>
        </select>
        <button type="submit" onClick={handleSubmit}>
          Update admin
        </button>
      </form>
    </div>
  );
};

export default SingleUser;
