import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUsersAsync } from "./usersSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <div>
      {users && users.length
        ? users.map((user) => {
            return (
              <div key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <p>
                    {user.first} {user.last}
                  </p>
                </Link>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default AllUsers;
