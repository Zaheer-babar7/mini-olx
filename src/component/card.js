import * as React from 'react';

//imports of MUI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CircularProgress, Stack } from '@mui/material';

export default function DetailCard({
  title,
  url,
  description,
  isApproved,
  approved,
  profileImageUrl,
  userName,
  loading
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profileImageUrl}
          />
        }
        title={userName}
        subheader={title}
      />
      <CardMedia
        component='img'
        height='194'
        image={url}
        alt='your post image'
      />
      <CardContent>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          {!isApproved && (
            <Button onClick={approved} variant='contained'>
              {loading ? (
                <CircularProgress
                  size={20}
                  color='inherit'
                  sx={{ margin: '0 auto' }}
                />
              ) : (
                'Approved'
              )}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
