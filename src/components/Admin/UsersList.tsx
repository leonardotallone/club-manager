import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Container, Typography } from "@mui/material";


import BlackBanner from '../BlackBanner';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Avatar from '@mui/material/Avatar';


import Select, { SelectChangeEvent } from '@mui/material/Select';
import avatar1 from "../../assets/avatars/1.jpg";
import avatar2 from "../../assets/avatars/2.jpg";
import avatar3 from "../../assets/avatars/3.jpg";

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Pagination from '@mui/material/Pagination';


const UsersList = () => {


    const usuarios = [
        {
            nombre: "Catalina Tallone Semino, Semino",
            dni: "56.883.870",
            categoria: "Activo",
            grupo: "Familia",
            estadoCuenta: "Sin Deuda",
            avatar: avatar1
        },
        {
            nombre: "Juan Pérez",
            dni: "45.678.901",
            categoria: "Pleno",
            grupo: "Familia",
            estadoCuenta: "Con Deuda",
            avatar: avatar2
        },
        {
            nombre: "Juan Pérez",
            dni: "45.678.901",
            categoria: "Pleno",
            grupo: "Familia",
            estadoCuenta: "Con Deuda",
            avatar: avatar3
        },
    ];

    const category = [
        'Activo',
        'Pleno',
        'Jubilado',
        'Vitalício',
    ];
    return (
        <>
            {/* <BlackBanner /> */}

            <Box
                sx={{
                    mb: 3,
                    // position: "fixed", // Asegura que ocupe toda la pantalla
                    width: '100%', // Asegura que tome todo el ancho del viewport

                }}
            >
                <Container maxWidth="xl">
                    <Grid container direction="column">
                        <Grid size={{ xs: 6, sm: 6, md: 6, lg: 12 }} >
                            <Typography
                                sx={{
                                    // fontFamily: 'monospace',
                                    // bgcolor:"red",
                                    fontWeight: 600,
                                    fontSize: 16,
                                    color: 'grey', // Cambia el color aquí
                                    textDecoration: 'none',
                                }}
                            >
                                Ordenar Usuarios
                            </Typography>

                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6, lg: 2 }} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={values.category} // Bind Formik value
                                    label="Categoria" // Update label to match the field
                                // onChange={(event) => {
                                //     handleChange({ target: { name: 'category', value: event.target.value } }); // Correctly update Formik state
                                // }}
                                // onBlur={handleBlur} // Optional: Handle blur event if needed
                                >
                                    {category.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}

                                </Select>
                                {/* {touched.category && errors.category && (
                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                            {errors.category}
                        </Typography>
                    )} */}
                            </FormControl>
                        </Grid>
                    </Grid>



                </Container>
            </Box>

            <Container maxWidth="xl">
                <Grid container>
                    {usuarios.map((usuario, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 12 }} sx={{ mb: 1.5 }}>
                            <Box
                                sx={{
                                    bgcolor: "#eeeeee",
                                    height: 65,
                                    borderRadius: 2,
                                    borderWidth: 1,
                                    borderColor: "#ffab91",
                                    borderStyle: 'solid',
                                    width: '100%',
                                    boxShadow: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid container sx={{ width: '100%' }} >
                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 0.7 }} sx={{ ml: 1 }}>
                                        <Avatar alt="Avatar" src={usuario.avatar} sx={{ width: 50, height: 50 }} />
                                    </Grid>
                                    <Grid size={{ xs: 1.5, sm: 1.5, md: 1.5, lg: 1.5, xl: 2 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            NOMBRE Y APELLIDO
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
                                            {usuario.nombre}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            DNI
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
                                            {usuario.dni}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            CATEGORIA
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
                                            {usuario.categoria}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 1.5, sm: 1.5, md: 1.5, lg: 1.5, xl: 1.2 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            BLOQUEAR USUARIO
                                        </Typography>
                                        <LockOpenIcon sx={{ fontSize: 24, color: "black", ml: 5 }} />
                                    </Grid>

                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 0.7 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            GRUPO
                                        </Typography>
                                        <FamilyRestroomOutlinedIcon sx={{ fontSize: 24, color: "black", ml: 1 }} />
                                    </Grid>
                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column" >
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            ESTADO DE CUENTA
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: usuario.estadoCuenta === "Sin Deuda" ? 'Green' : 'Red', textDecoration: 'none' }}>
                                            {usuario.estadoCuenta}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 1, sm: 6, md: 6, lg: 4 }} direction="column" sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        fontSize: 24,
                                        color: 'black',

                                    }}>
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            EDITAR
                                        </Typography>
                                        <ModeEditOutlineOutlinedIcon sx={{ fontSize: 24, color: "black", ml: 1 }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Pagination count={10} variant="outlined" sx={{ mt: 1, display: 'flex', justifyContent: 'center' }} />
            </Container>
        </>
    );
};

export default UsersList;
