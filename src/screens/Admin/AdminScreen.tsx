import React, { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Container, Fade } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from '../../components/Navbar';

import Dashboard from '../../components/Admin/Dashboard';
import UsersList from '../../components/Admin/UsersList';
import ApplicationsList from '../../components/Admin/ApplicationsList';
import RejectedApplicationsList from '../../components/Admin/RejectedApplicationsList';

import Footer from '../../components/Footer';
import Advertising from '../../components/Advertising';

import { getAllUsersContext } from '../../Context/GetAllUsersContext';

const AdminScreen = () => {
    const { loading } = useContext(getAllUsersContext);

    return (
        <>
            <Navbar />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: '#eeeeee',
                    pt: { xs: 10, sm: 12 },
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch', // 👈 Asegura ancho completo de los hijos
                        py: { xs: 3, md: 5 },
                        position: 'relative',
                        px: { xs: 2, sm: 3, md: 4 }, // opcional: un poco de respiro lateral
                    }}
                >
                    {loading ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 2,
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </Box>
                    ) : (<>
                        <Fade in={!loading} timeout={1200}>
                            <Box sx={{ width: '100%' }}>
                                <Dashboard />
                            </Box>
                        </Fade>


                        <Fade in={!loading} timeout={1200}>
                            <Box sx={{ width: '100%' }}>
                                <UsersList />
                            </Box>
                        </Fade>

                          <Fade in={!loading} timeout={1200}>
                            <Box sx={{ width: '100%' }}>
                                <ApplicationsList />
                            </Box>
                        </Fade>

                            <Fade in={!loading} timeout={1200}>
                            <Box sx={{ width: '100%' }}>
                                <RejectedApplicationsList />
                            </Box>
                        </Fade>




                    </>

                    )}
                </Container>

                <Box component="section" sx={{ mt: 'auto' }}>
                    <Box sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
                        <Advertising />
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </>
    );
};

export default AdminScreen;
