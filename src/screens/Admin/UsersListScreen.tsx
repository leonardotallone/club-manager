import React, { useContext } from 'react';
import { Box, CircularProgress, Container } from "@mui/material";

import Navbar from '../../components/Navbar';
import BlackBanner from '../../components/BlackBanner';
import UsersList from '../../components/Admin/UsersList';
import Footer from '../../components/Footer';

import { getAllUsersContext } from '../../Context/GetAllUsersContext';

const UserListScreen = () => {
    const { loading } = useContext(getAllUsersContext);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}>
            {/* Navbar */}
            <Navbar />

            {/* BlackBanner opcional */}
            {/* <BlackBanner /> */}

            {/* Contenedor principal */}
            <Container
                maxWidth="xl"
                sx={{
                    flex: 1,
                    mt: 6, // separación de la Navbar
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 4,
                }}
            >
                {/* Loader overlay */}
                {loading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                        }}
                    >
                        <CircularProgress color="inherit" />
                    </Box>
                )}

                {/* Lista de usuarios */}
                {!loading && <UsersList />}
            </Container>

            {/* Footer full width */}
            {/* <Box sx={{ width: '100%' }}>
                <Footer />
            </Box> */}
        </Box>
    );
};

export default UserListScreen;
