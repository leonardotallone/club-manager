import * as React from 'react';
import { useContext } from "react";
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
import ClubSocial from "../assets/svg/ClubSocial.png"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import avatar from "../assets/backgroundImages/Background.jpg";

import { signInUserContext } from '../Context/SignInUserContext';
import { getAllUsersContext } from '../Context/GetAllUsersContext';
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/Firebase";

const pageAdmin = [
    { name: 'solicitudes', href: "/admin-applications" },
    { name: 'alta de Socio', href: '/signup' },
    { name: 'usuarios', href: "/admin-users-list" },
    // { name: 'Alta Disciplinas', href: '/blog' },
    // { name: 'Documentos', href: '/blog' },
];
const altaSocioOptions = [
    { name: 'Individual', href: '/signup/unique' },
    { name: 'Cabeza de Grupo', href: '/signup/grouphead' },
    { name: 'Menor', href: '/signup/minor' },
];
const pageUsers = [
    { name: 'Noticias', href: "/noticias" },
    { name: 'El Club', href: '/elclub' },
    { name: 'Historia', href: '/historia' },
    { name: 'Autoridades', href: '/autoridades' },
];

const Navbar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElAltaSocio, setAnchorElAltaSocio] = React.useState<null | HTMLElement>(null);

    const { setLoguedUser } = useContext(signInUserContext);
    const { loguedUserInformation, setLoguedUserInformation } = useContext(getAllUsersContext);


    let pagesToMap = pageUsers;
if (loguedUserInformation) {
  pagesToMap = loguedUserInformation.admin === true ? pageAdmin : pageUsers;
}
   
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenAltaSocio = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAltaSocio(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseAltaSocio = () => {
        setAnchorElAltaSocio(null);
    };

    const handleLogOut = () => {
        const auth = FIREBASE_AUTH;
        signOut(auth)
            .then(() => {
                setLoguedUserInformation(null);
                setLoguedUser(null);
                localStorage.removeItem("LoguedUser");
                navigate("/");
            })
            .catch((error) => {
                console.error("Error logOut:", error.message);
            });
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pagesToMap.map((page) => (
                            page.name === 'alta de Socio' ? (
                                <div key={page.name}>
                                    <Button
                                        onClick={handleOpenAltaSocio}
                                        sx={{ my: 2, color: 'grey.800', display: 'block' }}
                                    >
                                        {page.name}
                                    </Button>
                                    <Menu
                                        anchorEl={anchorElAltaSocio}
                                        open={Boolean(anchorElAltaSocio)}
                                        onClose={handleCloseAltaSocio}
                                    >
                                        {altaSocioOptions.map((option) => (
                                            <MenuItem
                                                key={option.name}
                                                onClick={handleCloseAltaSocio}
                                                component="a"
                                                href={option.href}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            ) : (
                                <Button
                                    key={page.name}
                                    href={page.href}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'grey.800', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            )
                        ))}
                    </Box>


                    {/*---------------------------------------------------------------------------------  Margen Derecho si hay usuario Conectado  --------------------------------------------------------------- */}
                    {loguedUserInformation ?
                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 14, fontWeight: "500", color: "#424242", mr: 1.5 }} >
                                {loguedUserInformation.admin === true ? "Bienvenido Admin" : null}
                                {loguedUserInformation.admin === false ? `${loguedUserInformation.name} ${loguedUserInformation.lastName}` : null}
                            </Typography>
                            <IconButton onClick={handleLogOut} >
                                <LogoutOutlinedIcon sx={{ display: { xs: 'flex', md: 'flex', color: '#424242' }, mr: 1.5 }} />
                            </IconButton>
                            <Tooltip title={loguedUserInformation?.email}>
                                <IconButton onClick={handleOpenUserMenu} >
                                    <Avatar alt="Remy Sharp" src={avatar} />
                                </IconButton>
                            </Tooltip>
                        </Box> : null}

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
