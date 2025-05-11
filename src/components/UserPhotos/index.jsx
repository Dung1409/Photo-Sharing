import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Avatar,
  ListItemAvatar,
  Paper
} from '@mui/material';
import models from '../../modelData/models';
import './styles.css';

// Date formatting function
const formatDate = (dateTimeStr) => {
  if (!dateTimeStr) return 'Unknown date';
  
  const date = new Date(dateTimeStr);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  };
  
  return date.toLocaleString('en-US', options);
};

function UserPhotos() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  if (!user) {
    return <Typography variant="h6" className="not-found-message">User not found</Typography>;
  }

  if (photos.length === 0) {
    return (
      <div className="user-photos-container">
        <Button 
          variant="outlined" 
          component={Link} 
          to={`/users/${userId}`}
          startIcon={<span>←</span>}
          className="back-button"
        >
          Back to {user.first_name}'s Profile
        </Button>
        <Typography variant="h6" className="no-photos-message">No photos found for this user</Typography>
      </div>
    );
  }

  return (
    <div className="user-photos-container">
      <Button 
        variant="outlined" 
        component={Link} 
        to={`/users/${userId}`}
        startIcon={<span>←</span>}
        className="back-button"
      >
        Back to {user.first_name}'s Profile
      </Button>
      
      <Typography variant="h4" gutterBottom className="photos-title">
        {user.first_name} {user.last_name}'s Photos
      </Typography>
      
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card" elevation={3}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" gutterBottom className="photo-date">
              {formatDate(photo.date_time)}
            </Typography>
            
            <CardMedia
              component="img"
              image={`/images/${photo.file_name}`}
              alt={`Photo by ${user.first_name}`}
              className="photo-image"
              sx={{ height: 400, objectFit: 'cover', marginBottom: 2 }}
            />
            
            <Typography variant="h6" gutterBottom className="comments-heading">
              Comments:
            </Typography>
            
            {photo.comments && photo.comments.length > 0 ? (
              <List className="comments-list">
                {photo.comments.map((comment) => (
                  <Paper key={comment._id} elevation={1} sx={{ mb: 2, p: 1 }} className="comment-paper">
                    <ListItem alignItems="flex-start" className="comment-item">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#1976d2' }} className="comment-avatar">
                          {`${comment.user.first_name.charAt(0)}${comment.user.last_name.charAt(0)}`}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Link to={`/users/${comment.user._id}`} className="user-link">
                              {comment.user.first_name} {comment.user.last_name}
                            </Link>
                            <Typography 
                              component="span" 
                              variant="body2" 
                              color="textSecondary"
                              sx={{ ml: 1 }}
                              className="comment-date"
                            >
                              • {formatDate(comment.date_time)}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={comment.comment}
                        className="comment-text"
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary" className="no-comments">
                No comments yet
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;