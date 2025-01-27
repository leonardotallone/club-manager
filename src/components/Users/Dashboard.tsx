import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Container, Typography } from "@mui/material";


const Dashboard = () => {

    return (
        <>
            <Container maxWidth="xl">
                <Typography sx={{ fontWeight: 800, fontSize: 14, color: '#616161', textDecoration: 'none' }}>
                    USER DASHBOARD
                </Typography>
            </Container>
        </>
    );
};

export default Dashboard;
