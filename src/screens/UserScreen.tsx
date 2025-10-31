import React, { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Container, Fade } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from '../components/Navbar';

import UserDashboard from '../components/Users/UserDashboard';
import DigitalCard from "../components/Users/DigitalCard"

import UserDocs from '../components/Users/UserDocs';

import LoadingOverlay from "../components/LoadingOverlay"
import Footer from '../components/Footer';
import Advertising from '../components/Advertising';

import { getAllUsersContext } from '../Context/GetAllUsersContext';
import { displaySelectorViewContext } from "../Context/DisplaySelectorViewContext";

const UserScreen = () => {
    const { loading } = useContext(getAllUsersContext);
    const { activeUserView } = useContext(displaySelectorViewContext);


    const renderView = () => {
        switch (activeUserView) {
            case "docs": return <UserDocs />;

            default: return <UserDashboard />;
            case "digitalCard": return <DigitalCard />;
        }
    };

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
                        <LoadingOverlay open={loading}/>
                    ) : (
                        <Fade key={activeUserView} in timeout={1200}>
                            <Box sx={{ width: "100%" }}>
                                {renderView()}
                            </Box>
                        </Fade>
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

export default UserScreen;
