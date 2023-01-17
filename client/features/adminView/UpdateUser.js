import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUser,
  editSingleUser,
} from "./singleUserSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  const handleAdmin = (e) => {
    setAdmin(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editSingleUser({ userId, isAdmin }));
  };

  return (
    <div>
      <form className="update-user" onSubmit={handleSubmit}>
        <select value={isAdmin} onChange={handleAdmin}>
          <option value="true" onChange={handleAdmin}>
            Admin
          </option>
          <option value="false" onChange={handleAdmin}>
            Customer
          </option>
        </select>
        <button type="submit">Update admin</button>
      </form>
    </div>
  );
};

export default UpdateUser;
