import * as React from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar,
    Button, Tooltip, Modal, useTheme, Fade, Divider, Drawer, List, ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ClubSocial from "../assets/svg/ClubSocial.png";
import avatar from "../assets/backgroundImages/Background.jpg";
import { signInUserContext } from '../Context/SignInUserContext';
import { getAllUsersContext } from '../Context/GetAllUsersContext';
import { controlModalsContext } from '../Context/ControModalsContext';
import { displaySelectorViewContext } from "../Context/DisplaySelectorViewContext";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/Firebase";
import SignInForm from "../components/SignInForm";
import PasswordRecoverForm from "../components/PasswordRecoverForm";
import EmailRecoverForm from '../components/EmailRecoverForm';


import { SvgIcon } from "@mui/material";

const Navbar = () => {
    const theme = useTheme();
    const { setLoguedUser } = useContext(signInUserContext);
    const { loguedUserInformation, setLoguedUserInformation } = useContext(getAllUsersContext);
    const { openLogin, setOpenLogin, openRecoverPassword, setOpenRecoverPassword, openRecoverEmail, setOpenRecoverEmail } = useContext(controlModalsContext);
    const { setActiveAdminView, setActiveUserView } = useContext(displaySelectorViewContext);
    const navigate = useNavigate();

    const [openDrawer, setOpenDrawer] = useState(false);
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
        { name: 'Carnet Digital', view: 'digitalCard' },
    ];

    const pageNoUser = [
        { name: 'El Club', view: 'club' },
        { name: 'Equipo', view: 'equipo' },
    ];

    const pagesToMap = !loguedUserInformation ? pageNoUser : isAdmin ? pageAdmin : pageUsers;

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpenDrawer(open);
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
            .catch((error) => console.error("Error logOut:", error.message));
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };
    const handleMenuClick = (pageView: string) => {
        // Cierra el drawer
        setOpenDrawer(false);

        // Navegación o scroll
        if (!loguedUserInformation) scrollToSection(pageView);
        else if (isAdmin) setActiveAdminView(pageView);
        else setActiveUserView(pageView);
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    background: "rgba(255, 255, 255, 1)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                    zIndex: 1100,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                        {/* LOGO */}
                        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <Box component="img" src={ClubSocial} alt="Club Social" sx={{ width: 45, height: 45, mr: 2 }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    display: { xs: "none", md: "block" },
                                    fontWeight: 600,
                                    color: theme.palette.grey[800],
                                    fontFamily: '"Outfit", sans-serif',
                                    fontSize: { xs: "1rem", md: "1.2rem" },
                                }}
                            >
                                Club Social
                            </Typography>
                        </Box>

                        {/* MENÚ MOBILE FULL-SCREEN DESDE ABAJO */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton size="large" onClick={toggleDrawer(true)} sx={{ color: theme.palette.grey[800] }}>
                                <MenuIcon fontSize="large" />
                            </IconButton>
                            <Drawer
                                anchor="bottom" // <--- sale desde abajo
                                open={openDrawer}
                                onClose={toggleDrawer(false)}
                                PaperProps={{
                                    sx: {
                                        width: "100%",       // ocupa todo el ancho
                                        height: "100%",      // ocupa toda la altura
                                        backgroundColor: "#fafafaff",
                                        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                                        borderRadius: 0,     // sin bordes redondeados
                                        display: "flex",
                                        flexDirection: "column",
                                    },
                                }}
                                transitionDuration={600}
                            >
                                {/* Cerrar */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        px: 2,
                                        py: 2,
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)} sx={{ color: "#333" }}>
                                        <SvgIcon sx={{ fontSize: 60 }}>
                                            <path
                                                d="M6 6 L18 18 M6 18 L18 6"
                                                stroke="currentColor"
                                                strokeWidth="0.9"
                                                strokeLinecap="round"
                                            />
                                        </SvgIcon>
                                    </IconButton>
                                </Box>

                                {/* <Divider /> */}

                                <List
                                    sx={{
                                        px: 3,
                                        py: 2,

                                        flexGrow: 1,
                                        // display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}>
                                    {pagesToMap.map((page) => (

                                        <ListItemButton
                                            key={page.name}
                                            onClick={() => handleMenuClick(page.view)}
                                            sx={{
                                                py: 0,
                                                mb: 0.5,
                                                backgroundColor: "transparent",
                                                "&:hover": { backgroundColor: "transparent" },
                                            }}
                                        >
                                            <ListItemText
                                                primary={page.name}
                                                slotProps={{
                                                    primary: {
                                                        sx: {
                                                            mb: 1,
                                                            color: "#333",
                                                            fontWeight: 550,
                                                            fontFamily: '"Manrope", sans-serif',
                                                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                                                            lineHeight: 1,
                                                            transition: "color 0.3s",
                                                            "&:hover": { color: "#b71c1c" },
                                                        }
                                                    }
                                                }}
                                            />
                                        </ListItemButton>

                                    ))}
                                </List>


                                <Divider />


                                {/* Perfil / login */}
                                <Box sx={{ p: 3 }}>
                                    {loguedUserInformation ? (
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            {/* Nombre del usuario alineado al margen de los list items */}
                                            <Typography
                                                sx={{
                                                    ml: 3, // margen izquierdo igual que los list items
                                                    color: "#333",
                                                    fontWeight: 550,
                                                    fontFamily: '"Manrope", sans-serif',
                                                    fontSize: { xs: "2.0rem", md: "2.0rem" },
                                                }}
                                            >
                                                {isAdmin ? "Administrador" : `${loguedUserInformation.name} ${loguedUserInformation.lastName}`}
                                            </Typography>

                                            {/* Icono de logout */}
                                            <Tooltip title="Cerrar sesión">
                                                <IconButton
                                                    onClick={handleLogOut}
                                                    sx={{
                                                        color: "#333",
                                                        fontSize: 30,           // tamaño más pequeño
                                                        "&:hover": { color: "#b71c1c", backgroundColor: "transparent" },
                                                    }}
                                                >
                                                    <LogoutOutlinedIcon sx={{ fontSize: 30 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                textTransform: "none",
                                                color: "#b71c1c",
                                                borderColor: "#b71c1c",
                                                borderRadius: 3,
                                                py: 1.5,
                                                fontSize: "1rem",
                                                "&:hover": { backgroundColor: "#b71c1c", color: "#fff" },
                                            }}
                                            onClick={() => {
                                                setOpenLogin(true);
                                                setOpenDrawer(false);
                                            }}
                                        >
                                            Iniciar sesión
                                        </Button>
                                    )}
                                </Box>



                            </Drawer>
                        </Box>


                        {/* MENÚ DESKTOP MODERNO SIN EFECTO BOTÓN */}
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }}>
                            {pagesToMap.map((page) => (
                                <Typography
                                    key={page.name}
                                    onClick={() => {
                                        if (!loguedUserInformation) scrollToSection(page.view);
                                        else if (isAdmin) setActiveAdminView(page.view);
                                        else setActiveUserView(page.view);
                                    }}
                                    sx={{
                                        mx: 3,
                                        color: "#333",
                                        fontWeight: 600,
                                        fontFamily: '"Manrope", sans-serif',
                                        fontSize: "1rem",
                                        lineHeight: 1.2,
                                        cursor: "pointer",
                                        transition: "color 0.3s, transform 0.2s",
                                        "&:hover": {
                                            color: "#b71c1c",
                                            transform: "translateY(-2px)",
                                        },
                                    }}
                                >
                                    {page.name}
                                </Typography>
                            ))}
                        </Box>

                        {/* PERFIL DESKTOP MODERNO */}
                        {loguedUserInformation ? (
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    alignItems: "center",
                                    gap: 2,
                                    padding: 1,
                                    borderRadius: 3,
                                    backgroundColor: "#f5f5f5",
                                }}
                            >
                                <Box sx={{ textAlign: "right" }}>
                                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                                        {isAdmin ? "Administrador" : `${loguedUserInformation.name} ${loguedUserInformation.lastName}`}
                                    </Typography>
                                    <Typography sx={{ fontSize: 12, color: "#666" }}>{loguedUserInformation?.email}</Typography>
                                </Box>

                                <Tooltip title="Configuración">
                                    <IconButton sx={{ color: "#424242" }}>
                                        <SettingsOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Cerrar sesión">
                                    <IconButton onClick={handleLogOut} sx={{ color: "#b71c1c" }}>
                                        <LogoutOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Avatar alt="Usuario" src={avatar} sx={{ width: 42, height: 42, border: "2px solid #b71c1c" }} />
                            </Box>
                        ) : (
                            <Typography
                                onClick={() => setOpenLogin(true)}
                                sx={{
                                    display: { xs: "none", md: "block" },
                                    color: "#b71c1c",
                                    fontWeight: 600,
                                    fontFamily: '"Manrope", sans-serif',
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    transition: "color 0.3s",
                                    "&:hover": { color: "#333" },
                                }}
                            >
                                Iniciar sesión
                            </Typography>
                        )}
                    </Toolbar>
                </Container>
            </AppBar >

            {/* MODALES */}

            <Modal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                closeAfterTransition
                slotProps={{
                    backdrop: {
                        timeout: 2000,
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
                        timeout: 2000,
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
                        timeout: 2000,
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







