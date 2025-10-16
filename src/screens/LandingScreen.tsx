import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Modal,
  Container,
  Typography,
  CircularProgress,
  Fade,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { signInUserContext } from "../Context/SignInUserContext";
import { getAllUsersContext } from "../Context/GetAllUsersContext";
import { controlModalsContext } from "../Context/ControModalsContext";

import Navbar from "../components/Navbar";
import Advertising from "../components/Advertising";
import Footer from "../components/Footer";
import JoinUpForm from "../components/JoinUpForm";

const LandingScreen = () => {
  const { loading } = useContext(signInUserContext);
  const { loguedUserInformation } = useContext(getAllUsersContext);
  const { openJoinUp, setOpenJoinUp, setOpenLogin } = useContext(controlModalsContext)

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (loguedUserInformation?.admin) {
      navigate("/admin-screen");
      setOpenLogin(false);
    } else if (loguedUserInformation && !loguedUserInformation.admin) {
      navigate("/user-screen");
      setOpenLogin(false);
    } else if (!loguedUserInformation) {
      navigate("/");
    }
  }, [loguedUserInformation, navigate]);

  const handleCloseJoinUp = () => {
    setOpenJoinUp(false);
  };

  return (
    <>
      <Navbar />

      <Box sx={{ backgroundColor: "#f5f5f5" }}>
        {/* 🟢 HERO SECTION */}
        <Box
          sx={{
            minHeight: { xs: "100vh", md: "90vh" },
            py: { xs: 6, md: 0 },
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://wallpapers.com/images/hd/gym-background-3avpur3zeam79mrd.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Container maxWidth="xl">
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
              direction={{ xs: "column", md: "row" }}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Fade in timeout={1000}>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        color: "white",
                        fontWeight: 800,
                        mb: 1,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      CLUB SOCIAL
                    </Typography>
                    <Typography
                      sx={{
                        typography: { xs: "body1", sm: "h6", md: "h5" },
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 400,
                        mb: 3,
                        maxWidth: { xs: "100%", md: "80%" },
                        mx: { xs: "auto", md: 0 },
                      }}
                    >
                      Conectá, compartí y gestioná tu comunidad con facilidad.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenJoinUp(true)}
                      sx={{
                        borderColor: "#b71c1c",
                        color: "white",
                        px: 4,
                        py: 1,
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#b71c1c",
                          borderColor: "#b71c1c",
                        },
                      }}
                    >
                      QUIERO ASOCIARME
                    </Button>
                  </Box>
                </Fade>
              </Grid>

              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: { xs: 4, md: 0 },
                }}
              >
                {/* <Fade in timeout={1200}>
                  <Box sx={{ width: { xs: "100%", sm: 400 } }}>
                    {!loguedUserInformation && <SignInForm />}
                  </Box>
                </Fade> */}
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Modal
          open={openJoinUp}
          onClose={handleCloseJoinUp}
          closeAfterTransition

          slotProps={{
            backdrop: {
              timeout: 2000, // duración de la animación del backdrop
              style: { backdropFilter: "blur(3px)" }
            }
          }}
        >
          <Fade in={openJoinUp} timeout={{ enter: 2000, exit: 2000 }}>
            <Box>
              <JoinUpForm />
            </Box>
          </Fade>
        </Modal>

        {/* 🟠 PARALLAX 1 */}
        <Box
          sx={{
            height: { xs: 250, sm: 350, md: 450 },
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/8688170/pexels-photo-8688170.jpeg)",
            backgroundAttachment: isMobile ? "scroll" : "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
              textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
              textAlign: "center",
              px: 2,
            }}
          >
            Unidos por la pasión de compartir.
          </Typography>
        </Box>

        {/* 🟣 CONTENT SECTION */}
        <Container sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}>
          <Typography
            sx={{
              typography: { xs: "h5", md: "h4" },
              mb: 2,
              fontWeight: 700,
            }}
          >
            Club Manager Solution
          </Typography>
          <Typography
            sx={{
              typography: { xs: "body2", md: "body1" },
              mb: 4,
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Una plataforma diseñada para administrar tu comunidad, eventos,
            membresías y experiencias en un solo lugar.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#b71c1c",
              "&:hover": { backgroundColor: "darkred" },
            }}
            onClick={() => { setOpenJoinUp(true) }}
          >
            Descubrí más
          </Button>
        </Container>

        {/* 🔵 PARALLAX 2 */}
        <Box
          sx={{
            height: { xs: 250, sm: 350, md: 450 },
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://img.freepik.com/premium-photo/boy-swimming-pool-with-sunny-skies-clear-water_1072437-11958.jpg)",
            backgroundAttachment: isMobile ? "scroll" : "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
              textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
            Donde la comunidad se convierte en familia.
          </Typography>
        </Box>

        <Box sx={{ my: { xs: 6, md: 5 } }}>
          <Advertising />
        </Box>



        <Footer />

        {/* ⚫ Loading Overlay */}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default LandingScreen;
