import React, { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import SignUpForm from '../../components/Admin/SignUpForm';
import Navbar from '../../components/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import { signUpContext } from '../../context/SignUpContext';
import BlackBanner from '../../components/BlackBanner';

const SignUpScreen = () => {

  const { loading } = useContext(signUpContext);
  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{
          width: '100%',
          height: "auto",
          display: 'flex',
          mt: 12, // Ajusta este valor según la altura de tu Navbar
        }}
      >
        <BlackBanner />
      </Grid>
      <Grid
        container
        sx={{
          width: '100%',
          height: "auto",
          display: 'flex',
          mt: 3, // Ajusta este valor según la altura de tu Navbar
        }}
      >
        {loading ? (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20, // Asegura que esté por encima de otros elementos
          }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : <SignUpForm />}
      </Grid>
    </>
  );
};

export default SignUpScreen;