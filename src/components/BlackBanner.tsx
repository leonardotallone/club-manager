import React from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Box, Container, Typography } from "@mui/material";
import QrCode2Icon from '@mui/icons-material/QrCode2';

const titles = [
    {
        title: "Dashboard Administrador",
        subtitle: "Subtitulo Dashboard Administrador",
        path: "/dashboard-admin-screen"
    },
    {
        title: "Lista de Usuarios",
        subtitle: "Subtitulo Lista de Usuarios",
        path: "/admin-users-list"
    },
    {
        title: "Listado de Solicitudes",
        subtitle: "Subtitulo Listado de Solicitudes",
        path: "/admin-applications"
    },

    {
        title: "Alta de nuevo Socio",
        subtitle: "Subtitulo Nuevo Socio",
        path: "/signup"
    },



    {
        title: "Dashboard Socio",
        subtitle: "Subtitulo Dashboard Socio",
        path: "/dashboard-screen"
    },
   
];

const BlackBanner = () => {

    const location = useLocation();
    const currentTitle = titles.find(item => item.path === location.pathname);

    return (
        <Box
            sx={{
                bgcolor: "black",
                height: 100,
                width: '100%', // Asegura que tome todo el ancho del viewport
                boxShadow: 5, // Cambia este valor para ajustar la sombra
            }}
        >
            <Container maxWidth="xl"  >
                <Grid container >
                    <Grid size={{ xs: 10, sm: 10, md: 10, lg: 10 }} sx={{
                        mt: 1,
                    }}>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                            <Typography
                                // component="a"
                                sx={{
                                    // fontFamily: 'monospace',
                                    fontWeight: 600,
                                    fontSize: 20,
                                    color: 'white', // Cambia el color aquí
                                    textDecoration: 'none',
                                }}
                            >
                                {currentTitle?.title || 'Título por defecto'}
                            </Typography>
                        </Grid>
                        <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                            <Typography
                                component="a"

                                sx={{
                                    // fontFamily: 'monospace',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    color: 'white', // Cambia el color aquí
                                    textDecoration: 'none',
                                }}
                            >
                                {currentTitle?.subtitle || 'Subtítulo por defecto'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 2, md: 2, lg: 2 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <QrCode2Icon sx={{ fontSize: 48, color: "grey" }} />
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
};

export default BlackBanner;