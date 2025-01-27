import React, { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from '../components/Navbar';
import BlackBanner from '../components/BlackBanner';
import Dashboard from '../components/Users/Dashboard';
import Advertising from '../components/Advertising';
import Footer from '../components/Footer';

import { getAllUsersContext } from '../context/GetAllUsersContext';

const DashboardUserScreen = () => {

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
            </Grid>
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
            ) : <Dashboard />}
             <Grid
                container
                sx={{
                    width: '100%',
                    height: 435,
                    display: 'flex',
                   
                }}
            >
            </Grid>


            <Advertising />
            <Footer />
        </>
    );
};

export default DashboardUserScreen;
