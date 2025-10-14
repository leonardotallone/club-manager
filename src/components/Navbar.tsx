import * as React from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Divider,
    Modal,
    useTheme,
    Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ClubSocial from "../assets/svg/ClubSocial.png";
import avatar from "../assets/backgroundImages/Background.jpg";
import { signInUserContext } from '../Context/SignInUserContext';
import { getAllUsersContext } from '../Context/GetAllUsersContext';
import { controlModalsContext } from '../Context/ControModalsContext';
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/Firebase";

import SignInForm from "../components/SignInForm";
import PasswordRecoverForm from "../components/PasswordRecoverForm";
import EmailRecoverForm from '../components/EmailRecoverForm';

const pageAdmin = [
    { name: 'Solicitudes', href: "/admin-applications" },
    { name: 'Usuarios', href: "/admin-users-list" },
];

const pageUsers = [
    { name: 'Noticias', href: "/noticias" },
    { name: 'El Club', href: '/elclub' },
    { name: 'Historia', href: '/historia' },
    { name: 'Autoridades', href: '/autoridades' },
];

const Navbar = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const { setLoguedUser } = useContext(signInUserContext);
    const { loguedUserInformation, setLoguedUserInformation } = useContext(getAllUsersContext);
    const { openLogin, setOpenLogin, openRecoverPassword, setOpenRecoverPassword, openRecoverEmail, setOpenRecoverEmail } = useContext(controlModalsContext);

    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
    const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);


    const isAdmin = loguedUserInformation?.admin === true;
    const pagesToMap = isAdmin ? pageAdmin : pageUsers;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorNav(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorUser(null);

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

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };
    const handleClosePasswordRecover = () => {
        setOpenRecoverPassword(false);
    };
    const handleCloseEmailRecover = () => {
        setOpenRecoverEmail(false);
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    // backgroundColor: "rgba(255,255,255,0.95)",
                    // boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
                    // backdropFilter: "blur(6px)",
                    // zIndex: 1100,

                    background: "rgba(255, 255, 255, 1)",  // 🔹 sutil transparencia
                    backdropFilter: "blur(8px)",               // 🔹 desenfoque moderado
                    WebkitBackdropFilter: "blur(8px)",         // 🔹 compatibilidad Safari
                    // borderBottom: "1px solid rgba(255, 255, 255, 0.4)", // 🔹 leve brillo en borde inferior
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)", // 🔹 sombra discreta
                    transition: "background 0.3s ease, backdrop-filter 0.3s ease", // 🔹 suavidad en scroll
                    zIndex: 1100,




                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        {/* ---------- LOGO + TÍTULO ---------- */}
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
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
                                    fontWeight: 700,
                                    color: theme.palette.grey[800],
                                    letterSpacing: 0.5,
                                }}
                            >
                                CLUB SOCIAL
                            </Typography>
                        </Box>

                        {/* ---------- MENÚ MOBILE ---------- */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                onClick={handleOpenNavMenu}
                                sx={{ color: theme.palette.grey[800] }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pagesToMap.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={() => { navigate(page.href); handleCloseNavMenu(); }}
                                        sx={{
                                            mx: 1,
                                            color: theme.palette.grey[800],
                                            fontWeight: 500,
                                            fontSize: "0.85rem", // 🔹 igual que los botones
                                            textTransform: 'none',
                                            letterSpacing: 0.3,
                                            justifyContent: 'center',
                                            fontFamily: theme.typography.fontFamily,
                                            '&:hover': { color: '#b71c1c' },
                                        }}
                                    >
                                        {page.name}
                                    </MenuItem>
                                ))}
                                {!loguedUserInformation && (
                                    <>
                                        <Divider />
                                        <MenuItem
                                            onClick={() => { setOpenLogin(true); handleCloseNavMenu(); }}
                                            sx={{
                                                mx: 1,
                                                color: theme.palette.grey[800],
                                                fontWeight: 500,
                                                fontSize: "0.85rem", // 🔹 igual que los botones
                                                textTransform: 'none',
                                                letterSpacing: 0.3,
                                                justifyContent: 'center',
                                                fontFamily: theme.typography.fontFamily,
                                                '&:hover': { color: '#b71c1c' },
                                            }}
                                        >
                                            Iniciar sesión
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </Box>

                        {/* ---------- MENÚ DESKTOP ---------- */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            {pagesToMap.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => navigate(page.href)}
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

                        {/* ---------- USUARIO LOGUEADO o BOTONES ---------- */}
                        {loguedUserInformation ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#424242', mr: 2 }}>
                                    {isAdmin ? "Administrador" : `${loguedUserInformation.name} ${loguedUserInformation.lastName}`}
                                </Typography>

                                <Tooltip title="Configuración">
                                    <IconButton
                                        onClick={() => navigate(`/edit-user/${loguedUserInformation.id}`, { state: loguedUserInformation })}
                                        sx={{ color: '#424242' }}
                                    >
                                        <SettingsOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Cerrar sesión">
                                    <IconButton onClick={handleLogOut} sx={{ color: '#424242' }}>
                                        <LogoutOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={loguedUserInformation?.email}>
                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Avatar alt="Usuario" src={avatar} />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    anchorEl={anchorUser}
                                    open={Boolean(anchorUser)}
                                    onClose={handleCloseUserMenu}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem disabled>
                                        <Typography variant="body2">{loguedUserInformation?.email}</Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => navigate(`/edit-user/${loguedUserInformation.id}`)}>
                                        Configuración
                                    </MenuItem>
                                    <MenuItem onClick={handleLogOut}>Cerrar sesión</MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            // ---------- VISITANTE (no logueado) ----------
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* ---------- MODAL LOGIN ---------- */}
            <Modal
                open={openLogin}
                onClose={handleCloseLogin}
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

            {/* ---------- MODAL PASSWORD RECOVER ---------- */}
            <Modal
                open={openRecoverPassword}
                onClose={handleClosePasswordRecover}
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

            {/* ---------- MODAL RECOVER EMAIL---------- */}
            <Modal
                open={openRecoverEmail}
                onClose={handleCloseEmailRecover}
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




