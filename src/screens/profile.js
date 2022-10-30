import React, { useEffect, useState } from 'react';

//imports of firebase
import { db } from '../firebase/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

//imports of MUI
import {
  Box,
  IconButton,
  Avatar,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';

//imports Components
import NavBar from '../component/navbar';
import defaultAvatar from '../assets/Default-avatar.jpg'

const Profile = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const email = localStorage.getItem('email');

  const uploadFile = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `Profile/${Date.now()}`);

    // 'file' comes from the Blob or File API
    return uploadBytes(storageRef, file).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((downloadedUrl) => downloadedUrl)
    );
  };

  const handleAvatar = async (e) => {
    e.preventDefault();
    setLoading(true)
    const file = e.target.files[0]
    let url = '';
    if (file) {
      url = await uploadFile(file);
    }
    const dbRef = doc(db, 'users', userData?.id);
    await updateDoc(dbRef, {
      profileImageUrl: url,
    });
    setRefresh(!refresh);
  };

  const getUserData = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('email', '==', email))
    );
    querySnapshot.forEach((doc) => {
      setUserData({
        id: doc.id,
        value: doc.data(),
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, [refresh]);

  console.log(userData?.value);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          width: 'calc(100% - 80px)',
          height: 'calc(100vh - 144px)',
          margin: '40px',
          borderRadius: '20px',
          boxShadow: '0px 0px 15px #000',
        }}
      >
        {loading ? (
          <Stack sx={{ height: '90vh' }} justifyContent='center'>
            <CircularProgress sx={{ margin: '0 auto' }} />
          </Stack>
        ) : (
          <Stack
            direction='column-reverse'
            justifyContent='space-around'
            alignItems='center'
            className='profile'
          >
            <IconButton color='primary' component='label'>
              <input
                hidden
                accept='image/*'
                type='file'
                onChange={handleAvatar}
              />
              <Avatar
                sx={{
                  width: '300px',
                  height: '300px',
                  border: '20px solid #1976d2',
                  background: '#fff',
                  padding: '10px',
                  boxShadow: '0 0 20px #00000026',
                }}
                src={userData?.value?.profileImageUrl || defaultAvatar}
              />
            </IconButton>
            <Stack gap='10px'>
              <Typography variant='h5'>
                UserName : {userData?.value?.userName}
              </Typography>
              <Typography variant='h5'>
                Email : {userData?.value?.email}
              </Typography>
              <Typography variant='h5'>
                Role : {userData?.value?.role}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default Profile;
