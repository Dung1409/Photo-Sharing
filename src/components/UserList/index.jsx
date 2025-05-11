import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Divider, Avatar, ListItemAvatar } from '@mui/material';
import models from '../../modelData/models';

function UserList() {
  const location = useLocation();
  const users = models.userListModel();

  return (
    <div className="user-list-container">
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <Divider />
      <List>
        {users.map((user) => (
          <ListItem 
            key={user._id}
            component={Link}
            to={`/photos/${user._id}`}  // ← Chuyển sang route hiển thị ảnh
            className={location.pathname === `/photos/${user._id}` ? 'user-item active' : 'user-item'}
            disablePadding
          >
            <ListItemAvatar>
              <Avatar>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={`${user.first_name} ${user.last_name}`}
              secondary={user.occupation}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
