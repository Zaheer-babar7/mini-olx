import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

//imports of firebase
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

//imports of MUI
import { CircularProgress, Grid, Box, Stack } from '@mui/material';

//imports of redux
import { useDispatch, useSelector } from 'react-redux';
import { GetDataForAdmin } from '../redux/actions';

//import of Components
import DetailCard from '../component/card';
import NavBar from '../component/navbar';
import nodata from '../assets/nodata.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  const role = localStorage.getItem('user');
  const allData = useSelector(
    (state) => state.getDataForAdminReducer.adminData
  );

  const Approved = async (id) => {
    setBtnLoading(true)
    const dbRef = doc(db, 'products', id);
    await updateDoc(dbRef, {
      isApproved: true,
    });
    setBtnLoading(false)
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate(-1);
      alert.error('YOU ARE NOT ADMIN');
    }
  }, [role, navigate, alert]);

  useEffect(() => {
    dispatch(GetDataForAdmin(setLoading));
  }, [refresh, dispatch]);

  return (
    <>
      <NavBar />
      {loading ? (
        <Stack sx={{ height: '90vh' }} justifyContent='center'>
          <CircularProgress sx={{ margin: '0 auto' }} />
        </Stack>
      ) : allData.length !== 0 ? (
        <Grid p='50px' container spacing={3}>
          {allData?.map((data, ind) => {
            return (
              <Grid key={ind} item xs={12} sm={6} md={4} lg={3}>
                <DetailCard
                  loading={btnLoading}
                  approved={() => Approved(data.id)}
                  {...data.value}
                />
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
    </>
  );
};

export default Dashboard;
