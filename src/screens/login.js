import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

//imports of firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

//imports of MUI
import { Box, Stack, TextField, Button, Typography, CircularProgress } from '@mui/material';

//imports of Component
import FormImg from '../assets/formImg.png';

const Login = () => {
  const alert = useAlert()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resolve) => {
        localStorage.setItem('uid', resolve.user.uid);
        localStorage.setItem('email', resolve.user.email);
        getUser()
        setLoading(false)
        navigate('/home');
      })
      .catch((err) => {
        setLoading(false)
        alert.error(err.message);
      });
  };

  const getUser = async () => {
    const querySnapshot = await getDocs(query(collection(db, 'users'), where("email", "==", email)));
    const userArr = [];
    querySnapshot.forEach((doc) => {
      userArr.push(doc.data())
      localStorage.setItem('user', userArr[0]?.role);
    });
};

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction='row'>
        <Stack
          justifyContent='center
        '
          sx={{
            width: '50%',
            height: '100vh',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <img src={FormImg} alt='welcome' />
        </Stack>
        <Stack
          sx={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#62beff',
            borderRadius: { xs: '0px', sm: '25px 0 0 25px' },
          }}
          gap='20px'
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Typography color='white' mb='100px' variant='h4'>
            Login
          </Typography>
          <TextField
            placeholder='Enter Email'
            sx={{ width: '50%' }}
            fullWidth
            variant='outlined'
            required
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            placeholder='Enter Password'
            sx={{ width: '50%' }}
            fullWidth
            variant='outlined'
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            sx={{ width: '50%', padding: '12px' }}
            variant='contained'
            onClick={loginHandler}
          >
            { loading? <CircularProgress size={20} color="inherit" sx={{ margin: '0 auto' }} /> : 'Log In'}
          </Button>
          <Button
            sx={{ width: '50%', padding: '12px' }}
            variant='contained'
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
