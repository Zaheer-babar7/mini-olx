import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

//imports of firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

//imports of MUI
import { Box, Stack, TextField, Button, Typography, CircularProgress } from '@mui/material';

//imports of Components
import FormImg from '../assets/formImg.png';

const Signup = () => {
  const navigate = useNavigate();
  const alert = useAlert()
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpHandle = () => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resolve) => {
        const obj = {
          email,
          role: 'user',
          profileImageUrl: null,
          userName: userName ? userName : `USER${Math.floor(100 + Math.random() * 900)}`,
          uid: resolve.user.uid,
        };
        await setDoc(doc(db, "users", resolve.user.uid), obj);
        alert.show("signUp Succesfull")
        setLoading(false)
        navigate("/");
      })
      .catch((err) => {
        setLoading(false)
        alert.error(err.message);
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
            Sign up
          </Typography>
          <TextField
            placeholder='Enter User Name'
            sx={{ width: '50%' }}
            fullWidth
            variant='outlined'
            required
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <TextField
            placeholder='Enter Email'
            sx={{ width: '50%' }}
            fullWidth
            variant='outlined'
            required
            type="email"
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
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            sx={{ width: '50%', padding: '12px' }}
            variant='contained'
            onClick={signUpHandle}
          >
            { loading? <CircularProgress size={20} color="inherit" sx={{ margin: '0 auto' }} /> : 'Sign Up'}
          </Button>
          <Typography
            onClick={() => navigate('/')}
            variant='subtitle2'
            sx={{ cursor: 'pointer', color: '#fff' }}
          >
            Already have an account
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Signup;
