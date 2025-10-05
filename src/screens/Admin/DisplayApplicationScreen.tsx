import React, { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from '../../components/Navbar';
import BlackBanner from '../../components/BlackBanner';
import SignUpForm from '../../components/Admin/SignUpForm';

import Footer from '../../components/Footer';
import Advertising from '../../components/Advertising';

import { getAllUsersContext } from '../../Context/GetAllUsersContext';

const DisplayApplicationScreen = () => {

    const { loading } = useContext(getAllUsersContext);
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
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mt: 2 }}>
                    <Advertising />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Footer />
                </Grid>
        </>
    );
};

export default DisplayApplicationScreen;