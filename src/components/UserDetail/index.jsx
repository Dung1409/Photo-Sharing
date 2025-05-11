import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Divider, CardMedia, Avatar } from '@mui/material';
import models from '../../modelData/models';

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  return (
    <div className="user-detail-container">
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: '#1976d2' }}>
              {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h2">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                {user.occupation}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Box mb={2}>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Location:</strong> {user.location}
            </Typography>
            
            <Typography variant="body1" component="div" gutterBottom>
              <strong>Description:</strong> 
              <p dangerouslySetInnerHTML={{ __html: user.description }} />
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to={`/photos/${userId}`}
            className="photos-link"
          >
            View {user.first_name}'s Photos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;