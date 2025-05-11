import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import models from '../../modelData/models';

function TopBar() {
  const location = useLocation();
  const params = useParams();

  const [context, setContext] = useState('');

  useEffect(() => {
    let currentContext = '';
    const userId = params.userId;

    if (location.pathname.startsWith('/users/') && !location.pathname.includes('/imagesimages')) {
      const user = models.userModel(userId);
      if (user) {
        currentContext = `${user.first_name} ${user.last_name}`;
      }
    } else if (location.pathname.includes('/imagesimages')) {
      const user = models.userModel(userId);
      if (user) {
        currentContext = `Photos of ${user.first_name} ${user.last_name}`;
      }
    } else {
      currentContext = 'Welcome';
    }

    setContext(currentContext);
  }, [location]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Nguyễn Văn A
        </Typography>
        <Typography variant="h6">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
