import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Box, Container, Typography, Button, useRadioGroup } from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Footer from '../../components/Footer';
import Advertising from '../../components/Advertising';

import Avatar from '@mui/material/Avatar';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import avatar1 from "../../assets/avatars/1.jpg";
import avatar2 from "../../assets/avatars/2.jpg";
import avatar3 from "../../assets/avatars/3.jpg";
import avatar4 from "../../assets/avatars/4.jpg";

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import Pagination from '@mui/material/Pagination';

import { getAllUsersContext } from '../../Context/GetAllUsersContext';


const UsersList = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const { allUsers } = useContext(getAllUsersContext);

    console.log(allUsers)

    const navigate = useNavigate();

    const category = [
        'Afabetico',
        'Categoria',
        'Edad',
        'Estado de Cuenta',
    ];

    return (
        <>


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
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCategory}
                                    onChange={(event) => setSelectedCategory(event.target.value)}
                                    label="Categoria"
                                >
                                    {category.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                    </Grid>



                </Container>
            </Box>

            <Container maxWidth="xl">
                <Grid container>
                    {allUsers?.map((user, index) => (
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
                                        <Avatar alt="Avatar" src={user.avatarURL} sx={{ width: 50, height: 50 }} />
                                    </Grid>
                                    <Grid size={{ xs: 1.5, sm: 1.5, md: 1.5, lg: 1.5, xl: 2 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            NOMBRE Y APELLIDO
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
                                            {user.lastName} {user.name}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            DNI
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
                                            {user.dni}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            CATEGORIA
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
                                            {user.category}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 1.5, sm: 1.5, md: 1.5, lg: 1.5, xl: 1.2 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            BLOQUEAR USUARIO
                                        </Typography>
                                        {user.blockade === false ? <LockOpenIcon sx={{ fontSize: 24, color: 'Green', ml: 5 }} /> :
                                            <LockOutlinedIcon sx={{ fontSize: 24, color: 'Red', ml: 5 }} />}
                                    </Grid>

                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 0.7 }} direction="column">
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            GRUPO
                                        </Typography>
                                        {user.groupHead ?
                                            <FamilyRestroomOutlinedIcon sx={{ fontSize: 24, color: "black", ml: 1 }} /> :
                                            <ManOutlinedIcon sx={{ fontSize: 24, color: "black", ml: 1 }} />}
                                    </Grid>
                                    <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column" >
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
                                            ESTADO DE CUENTA
                                        </Typography>
                                        {/* <Typography sx={{ fontWeight: 600, fontSize: 14, color: socio.countState === "Sin Deuda" ? 'Green' : 'Red', textDecoration: 'none' }}>
                                            {socio.countState}
                                        </Typography> */}
                                    </Grid>
                                    <Grid size={{ xs: 1, sm: 6, md: 6, lg: 4 }} direction="column" sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        fontSize: 24,
                                        color: 'black',

                                    }}>
                                        <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none', mr: 1 }}>
                                            EDITAR
                                        </Typography>
                                        {/* <Button
                                            startIcon={<ModeEditOutlineOutlinedIcon sx={{ fontSize: 24, color: "black", mr: -3 }} />}
                                            onClick={() => navigate(`/edit-user/${user}`, { state: user })}
                                        >
                                        </Button> */}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Pagination count={10} variant="outlined" sx={{ mt: 1, display: 'flex', justifyContent: 'center' }} />
            </Container>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mt: 2 }}>
                <Advertising />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Footer />
            </Grid>
        </>
    );
};

export default UsersList;
