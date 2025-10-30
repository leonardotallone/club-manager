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
  const { setOpenLogin } = useContext(controlModalsContext);

   const [openJoinUp, setOpenJoinUp] = useState(false);

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

      <Box sx={{ backgroundColor: "#fafafa" }}>
        {/* HERO SECTION */}

        <Box
          sx={{
            minHeight: { xs: "100vh", md: "90vh" },
            py: { xs: 6, md: 0 },
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://wallpapers.com/images/hd/gym-background-3avpur3zeam79mrd.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Container maxWidth="xl">
            <Grid container>
              <Grid size={{ xs: 12, md: 12, lg: 7 }}>
                <Fade in timeout={1000}>
                  <Box>
                    <Typography
                      // variant="h1"
                      sx={{
                        color: "#b71c1c",
                        fontWeight: 600,
                        mb: 2,
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: { xs: "6rem", md: "6rem" },
                        textShadow: "none",
                        lineHeight: 1.2,
                        letterSpacing: "-0.02rem"
                      }}
                    >
                      Club Social
                    </Typography>
                    <Typography
                      sx={{
                        color: "#333",
                        fontWeight: 600,
                        mb: 4,
                        maxWidth: { xs: "100%", md: "75%" },
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: { xs: "2.5rem", md: "3rem" },
                      }}
                    >
                      Conectá, compartí y gestioná tu comunidad con facilidad.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenJoinUp(true)}
                      sx={{
                        borderColor: "#b71c1c",
                        color: "#b71c1c",
                        px: 5,
                        py: 1.5,
                        fontWeight: 600,
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: { xs: "1rem", md: "1.0rem" },
                        "&:hover": {
                          backgroundColor: "#b71c1c",
                          borderColor: "#b71c1c",
                          color: "white",
                        },

                      }}
                    >
                      QUIERO ASOCIARME
                    </Button>
                  </Box>
                </Fade>
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
              timeout: 2000,
              style: { backdropFilter: "blur(3px)" }
            }
          }}
        >
          <Fade in={openJoinUp} timeout={{ enter: 2000, exit: 2000 }}>
            <Box>
              <JoinUpForm onClose={handleCloseJoinUp} />
            </Box>
          </Fade>
        </Modal>

        {/* PARALLAX 1 */}
        <Box
          sx={{
            height: { xs: 250, sm: 350, md: 450 },
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(https://images.pexels.com/photos/8688170/pexels-photo-8688170.jpeg)",
            backgroundAttachment: isMobile ? "scroll" : "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#333",
              // color: "#b71c1c",
              fontWeight: 600,
              fontFamily: '"Outfit", sans-serif',
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Unidos por la pasión de compartir.
          </Typography>
        </Box>

        {/* CONTENT SECTION */}
        <Container 
         id="club" // 👈  id para navegar desde navbar
        sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}>
          <Typography
            sx={{
              // color: "#333",
              color: "#b71c1c",
              fontWeight: 600,
              fontFamily: '"Outfit", sans-serif',
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Club Manager Solution
          </Typography>
          <Typography
            sx={{

              color: "#333",
              fontWeight: 100,
              fontFamily: '"Outfit", sans-serif',
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Una plataforma diseñada para administrar tu comunidad, eventos,
            membresías y experiencias en un solo lugar.
          </Typography>
        </Container>

        {/* EQUIPO DIRECTIVO */}
        <Box
          id="equipo" // 👈  id para navegar desde navbar
          sx={{
            backgroundColor: "#fff",
            py: { xs: 8, md: 10 },
            textAlign: "center",
          }}
        >
          <Container maxWidth="xl">
            <Typography
              sx={{
                color: "#333",
                // color: "#b71c1c",
                fontWeight: 600,
                fontFamily: '"Outfit", sans-serif',
                fontSize: { xs: "2.5rem", md: "4rem" },
                mb: 4,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Nuestro equipo
            </Typography>

            <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
              {[
                {
                  nombre: "Juana Martinez",
                  cargo: "Presidente",
                  foto:
                    "https://i.pinimg.com/736x/40/55/1b/40551b99dcd86abb8a880b85e8ba48f1.jpg",
                },
                {
                  nombre: "Ramiro Apellido",
                  cargo: "Vicepresidente",
                  foto:
                    "https://beatapraska.com/wp-content/uploads/2021/04/fotografia-perfil-profesional-en-madrid-00013.jpg",
                },
                {
                  nombre: "Brad López",
                  cargo: "Tesorero",
                  foto:
                    "https://i.pinimg.com/236x/ea/97/dd/ea97ddf175f9db019b6a4b0c94e46a92.jpg",
                },
              ].map((persona, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Fade in timeout={800 + index * 200}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        textAlign: "left",
                      }}
                    >
                      <Box
                        component="img"
                        src={persona.foto}
                        alt={persona.nombre}
                        sx={{
                          width: "100%",
                          height: 400,
                          objectFit: "cover",
                          filter: "grayscale(100%)",
                          transition: "filter 0.4s ease",
                          "&:hover": {
                            filter: "grayscale(0%)",
                          },
                        }}
                      />
                      <Typography

                        sx={{
                          mt: 2,
                          color: "#333",
                          // color: "#b71c1c",
                          fontWeight: 600,
                          fontFamily: '"Outfit", sans-serif',
                          fontSize: { xs: "1.5rem", md: "1.5rem" },
                        }}
                      >
                        {persona.nombre}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: "#5e5d5dff",
                          fontFamily: '"Outfit", sans-serif',
                          fontSize: { xs: "0.8rem", md: "0.8rem" },
                        }}
                      >
                        {persona.cargo}
                      </Typography>
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* PARALLAX 2 */}
        <Box
          sx={{
            height: { xs: 250, sm: 350, md: 450 },
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(https://img.freepik.com/premium-photo/boy-swimming-pool-with-sunny-skies-clear-water_1072437-11958.jpg)",
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
              color: "#333",
              // color: "#b71c1c",
              fontWeight: 600,
              fontFamily: '"Outfit", sans-serif',
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Donde la comunidad se convierte en familia.
          </Typography>
        </Box>

        <Box sx={{ my: { xs: 8, md: 6 } }}>
          <Advertising />
        </Box>

        <Footer />

        {/* Loading Overlay */}
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




