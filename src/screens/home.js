import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

//imports firebase
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//import MUI
import {
  Modal,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

//imports redux
import { useDispatch, useSelector } from 'react-redux';
import { GetData } from '../redux/actions';

//imports of Components
import DetailCard from '../component/card';
import NavBar from '../component/navbar';
import nodata from '../assets/nodata.png';

const Home = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const user = localStorage.getItem('uid');
  const role = localStorage.getItem('user');
  const email = localStorage.getItem('email');
  const data = useSelector((state) => state.getDataReducer.data);

  const handleClose = () => setOpen(false);
  
  const uploadFile = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now()}`);

    // 'file' comes from the Blob or File API
    return uploadBytes(storageRef, file).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((downloadedUrl) => downloadedUrl)
    );
  };

  const addPost = async () => {
    setPostLoading(true);
    try {
      let url = '';
      if (file) {
        url = await uploadFile();
      }
      const docRef = await addDoc(collection(db, 'products'), {
        title: formData.title,
        description: formData.description,
        profileImageUrl: userData?.value.profileImageUrl,
        userName: userData?.value.userName,
        isApproved: role === 'ADMIN' ? true : false,
        url,
      });
      handleClose();
      setPostLoading(false);
      setRefresh(!refresh);
      alert.show(
        role === 'ADMIN'
          ? 'Your Post Has Been Uploaded'
          : 'Your Post Is Pending Wait For Admin Approval'
      );
    } catch (e) {
      alert.error(e.message);
    }
  };

  const handleFile = (e) => {
    try {
      if (e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    } catch (error) {
      console.log(error);
    }
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
    dispatch(GetData(setLoading));
    getUserData();
  }, [refresh, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  console.log(userData)

  return (
    <>
      <NavBar onClickAction={() => setOpen(true)} />
      {loading ? (
        <Stack sx={{ height: '90vh' }} justifyContent='center'>
          <CircularProgress sx={{ margin: '0 auto' }} />
        </Stack>
      ) : data.length !== 0 ? (
        <Grid p='50px' container spacing={3}>
          {data?.map((data, ind) => {
            return (
              <Grid key={ind} item xs={12} sm={6} md={4} lg={3}>
                <DetailCard {...data} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Stack
          sx={{ width: '100%', height: '90vh' }}
          justifyContent='center'
          alignItems='center'
        >
          <Box
            sx={{ width: '40%', marginTop: '10px' }}
            component='img'
            src={nodata}
            alt='404'
          />
        </Stack>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography textAlign='center' variant='h4'>
            Upload Product
          </Typography>
          {postLoading ? (
            <CircularProgress sx={{ margin: '0 auto' }} />
          ) : (
            <>
              <Box
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
                component='form'
                onSubmit={addPost}
              >
                <TextField
                  placeholder='Enter Title'
                  fullWidth
                  variant='outlined'
                  required
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    });
                  }}
                />
                <TextField
                  type='file'
                  fullWidth
                  variant='outlined'
                  required='true'
                  onChange={handleFile}
                  accept='image/*'
                />
                <TextField
                  placeholder='Enter Description'
                  fullWidth
                  multiline
                  rows={4}
                  variant='outlined'
                  required
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    });
                  }}
                />
                <Button
                  sx={{ padding: '12px' }}
                  variant='contained'
                  type='submit'
                >
                  Upload
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
};
export default Home;
