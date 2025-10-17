import * as React from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar,
    Button, Tooltip, MenuItem, Divider, Modal, useTheme, Fade
    ,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ClubSocial from "../assets/svg/ClubSocial.png";
import avatar from "../assets/backgroundImages/Background.jpg";
import { signInUserContext } from '../Context/SignInUserContext';
import { getAllUsersContext } from '../Context/GetAllUsersContext';
import { controlModalsContext } from '../Context/ControModalsContext';
import { displaySelectorViewContext } from "../Context/DisplaySelectorViewContext"
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/Firebase";
import SignInForm from "../components/SignInForm";
import PasswordRecoverForm from "../components/PasswordRecoverForm";
import EmailRecoverForm from '../components/EmailRecoverForm';

const Navbar = () => {
    const theme = useTheme();
    const { setLoguedUser } = useContext(signInUserContext);
    const { loguedUserInformation, setLoguedUserInformation } = useContext(getAllUsersContext);
    const { openLogin, setOpenLogin, openRecoverPassword, setOpenRecoverPassword, openRecoverEmail, setOpenRecoverEmail } = useContext(controlModalsContext);
    const { setActiveAdminView, setActiveUserView } = useContext(displaySelectorViewContext);


    const [anchorNav, setAnchorNav] = useState(null);
    const [anchorUser, setAnchorUser] = useState(null);

    const isAdmin = loguedUserInformation?.admin === true;

    const pageAdmin = [
        { name: 'Dashboard', view: 'Admindashboard' },
        { name: 'Usuarios', view: 'users' },
        { name: 'Solicitudes', view: 'applications' },
        { name: 'Solicitudes Rechazadas', view: 'rejected' },
    ];

    const pageUsers = [
        { name: 'Dashboard', view: 'Userdashboard' },
        { name: 'Documentos', view: 'docs' },
        // { name: 'Historia', href: '/historia' },
        // { name: 'Autoridades', href: '/autoridades' },
    ];

    const pageNoUser = [
        { name: 'El Club', view: 'club' },  // 👈  el ID ("club")debe ser igual al q tengo en Landing Screen para navegar desde navbar
        { name: 'Equipo', view: 'equipo' },

    ];

    const pagesToMap = !loguedUserInformation ? pageNoUser : isAdmin ? pageAdmin : pageUsers;


    const handleOpenNavMenu = (event: { currentTarget: any; }) => setAnchorNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorNav(null);

    const handleOpenUserMenu = (event: { currentTarget: any; }) => setAnchorUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorUser(null);
    const navigate = useNavigate();
    const handleLogOut = () => {
        const auth = FIREBASE_AUTH;
        signOut(auth)
            .then(() => {
                setLoguedUserInformation(null);
                setLoguedUser(null);
                localStorage.removeItem("LoguedUser");
                navigate("/");
            })
            .catch((error) => console.error("Error logOut:", error.message));
    };


    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const yOffset = -80; // altura aproximada del navbar
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };


    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    background: "rgba(255, 255, 255, 1)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                    zIndex: 1100,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        {/* ---------- LOGO ---------- */}
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <Box
                                component="img"
                                src={ClubSocial}
                                alt="Club Social"
                                sx={{ width: 45, height: 45, mr: 2 }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    fontWeight: 600,
                                    color: theme.palette.grey[800],
                                    fontFamily: '"Outfit", sans-serif',
                                    fontSize: { xs: "1rem", md: "1.2rem" },
                                }}
                            >
                                Club Social
                            </Typography>
                        </Box>

                        {/* ---------- MENÚ MOBILE ---------- */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: theme.palette.grey[800] }}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorNav)}
                                onClose={handleCloseNavMenu}
                            >
                                {pagesToMap.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            if (isAdmin) setActiveAdminView(page.view);
                                        }}
                                        sx={{ justifyContent: 'center', color: theme.palette.grey[800] }}
                                    >
                                        {page.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* ---------- MENÚ DESKTOP ---------- */}
                        {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            {pagesToMap.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => {
                                        if (isAdmin) setActiveAdminView(page.view);
                                        else setActiveUserView(page.view)
                                    }}
                                    sx={{
                                        mx: 1,
                                        color: theme.palette.grey[800],
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        '&:hover': { color: '#b71c1c' },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box> */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            {pagesToMap.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => {
                                        handleCloseNavMenu(); // cerrar menú mobile si es necesario
                                        if (!loguedUserInformation) {
                                            // si no hay usuario logueado, hacemos scroll a la sección
                                            scrollToSection(page.view); // ⚡ aquí llamamos la función
                                        } else if (isAdmin) {
                                            setActiveAdminView(page.view);
                                        } else {
                                            setActiveUserView(page.view);
                                        }
                                    }}
                                    sx={{
                                        mx: 1,
                                        color: theme.palette.grey[800],
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        '&:hover': { color: '#b71c1c' },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* ---------- PERFIL USUARIO ---------- */}
                        {loguedUserInformation ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#424242', mr: 2 }}>
                                    {isAdmin ? "Administrador" : `${loguedUserInformation.name} ${loguedUserInformation.lastName}`}
                                </Typography>

                                <Tooltip title="Configuración">
                                    <IconButton sx={{ color: '#424242' }}>
                                        <SettingsOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Cerrar sesión">
                                    <IconButton onClick={handleLogOut} sx={{ color: '#424242' }}>
                                        <LogoutOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={loguedUserInformation?.email}>
                                    <Avatar alt="Usuario" src={avatar} sx={{ ml: 1 }} />
                                </Tooltip>
                            </Box>
                        ) : (
                            <Button
                                variant="text"
                                sx={{
                                    color: theme.palette.grey[800],
                                    textTransform: 'none',
                                    '&:hover': { color: '#b71c1c' },
                                }}
                                onClick={() => setOpenLogin(true)}
                            >
                                Iniciar sesión
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* ---------- MODALES ---------- */}
            <Modal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                closeAfterTransition
                slotProps={{
                    backdrop: {
                        timeout: 2000, // duración de la animación del backdrop
                        style: { backdropFilter: "blur(3px)" }
                    }
                }}
            >
                <Fade in={openLogin} timeout={{ enter: 2000, exit: 2000 }}>
                    <Box>
                        <SignInForm />
                    </Box>
                </Fade>
            </Modal>

            <Modal
                open={openRecoverPassword}
                onClose={() => setOpenRecoverPassword(false)}
                closeAfterTransition
                slotProps={{
                    backdrop: {
                        timeout: 2000, // duración de la animación del backdrop
                        style: { backdropFilter: "blur(3px)" }
                    }
                }}
            >
                <Fade in={openRecoverPassword} timeout={{ enter: 2000, exit: 2000 }}>
                    <Box>
                        <PasswordRecoverForm />
                    </Box>
                </Fade>
            </Modal>

            <Modal
                open={openRecoverEmail}
                onClose={() => setOpenRecoverEmail(false)}
                closeAfterTransition
                slotProps={{
                    backdrop: {
                        timeout: 2000, // duración de la animación del backdrop
                        style: { backdropFilter: "blur(3px)" }
                    }
                }}
            >
                <Fade in={openRecoverEmail} timeout={{ enter: 2000, exit: 2000 }}>
                    <Box>
                        <EmailRecoverForm />
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default Navbar;





