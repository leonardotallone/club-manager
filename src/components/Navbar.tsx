import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ClubSocial from "../assets/svg/ClubSocial.png"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import avatar from "../assets/backgroundImages/Background.jpg";

import { signInContext } from '../context/SignInContext';

const pageAdmin = [
    { name: 'alta de Socio', href: '/signup' },
    { name: 'usuarios', href: "/admin-users-list" },
    { name: 'Alta Disciplinas', href: '/blog' },
    { name: 'Documentos', href: '/blog' },
];
const pageUsers = [
    { name: 'Noticias', href: "/noticias" },
    { name: 'El Club', href: '/elclub' },
    { name: 'Historia', href: '/historia' },
    { name: 'Autoridades', href: '/autoridades' },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const [admin] = useState(true);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const { accessToken, setDecodedToken, setAccessToken } = useContext(signInContext);

    const pagesToMap = admin ? pageAdmin : pageUsers;
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleLogOut = (event: React.MouseEvent<HTMLElement>) => {
        setDecodedToken("")
        setAccessToken("")
        // window.localStorage.removeItem('accessToken')
        // window.localStorage.removeItem('user')
        navigate("/");
    };



    // useEffect(() => {
    //     if (!accessToken) {
    //         navigate("/");
    //     }
    // }, [accessToken])

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href="/">
                        <img src={ClubSocial} style={{ width: 45, height: 45 }} alt="Club Social" />
                    </a>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            ml: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            // letterSpacing: '.3rem',
                            color: 'grey.800', // Cambia el color aquí
                            textDecoration: 'none',
                        }}
                    >
                        CLUB SOCIAL
                    </Typography>
                    {/*---------------------------------------------------------------------------------  Navbar Comprimida  --------------------------------------------------------------- */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: 'grey.800' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pagesToMap.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center', color: 'grey.800' }}>{page.name}</Typography> {/* Cambia el color aquí */}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/*--------------------------------------------------------------------------------- Menu Descomprimido  --------------------------------------------------------------- */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: "red" } }}>
                        {pagesToMap.map((page) => (
                            <Button
                                key={page.name}
                                href={page.href}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'grey.800', display: 'block' }} // Cambia el color aquí
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {/*---------------------------------------------------------------------------------  Margen Derecho si hay usuario Conectado  --------------------------------------------------------------- */}

                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 14, fontWeight: "500", color: "#424242", mr: 1.5 }} >
                            {admin ? "Bienvenido Admin" : "Leonardo Tallone"}
                        </Typography>
                        <IconButton onClick={handleLogOut} >
                            <LogoutOutlinedIcon sx={{ display: { xs: 'flex', md: 'flex', color: '#424242' }, mr: 1.5 }} />
                        </IconButton>
                        <Tooltip title="leonardo.gabriel.tallone@gmail.com">
                            <IconButton onClick={handleOpenUserMenu} >
                                <Avatar alt="Remy Sharp" src={avatar} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
