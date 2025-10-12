import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container, Typography } from "@mui/material";
// import Background from "../assets/backgroundImages/Background.jpg"
import Navbar from '../components/Navbar';
import SignInForm from "../components/SignInForm";
import Advertising from "../components/Advertising";
import Footer from "../components/Footer";

import { signInUserContext } from '../Context/SignInUserContext';
// import { joinUpContext } from '../Context/JoinUpContext';
import { getAllUsersContext } from '../Context/GetAllUsersContext';

const LandingScreen = () => {

  const { loading } = useContext(signInUserContext);
  // const { loadingJU } = useContext(joinUpContext);
  const { loguedUserInformation } = useContext(getAllUsersContext);

  console.log("Informacion de Usuario Conectado", loguedUserInformation)

  const navigate = useNavigate();

  useEffect(() => {
    if (loguedUserInformation && loguedUserInformation.admin === true) {
      navigate("/dashboard-admin-screen");
    } else if (loguedUserInformation && loguedUserInformation.admin === false) {
      navigate("/dashboard-user-screen");
    }
  }, [loguedUserInformation, navigate]);

  return (
    <>
      <Navbar />
      <Grid container >
        <Grid
          
          // sx={{
          //   width: '100%',
          //   height: "auto",
          //   display: 'flex',
          //   backgroundColor: "#eeeeee",
          //   backgroundSize: 'cover', // Cover the entire area
          //   backgroundPosition: 'center', // Center the image

          //   // Hace creecer el Grid al maximo de la pantalla
          //   flexDirection: 'column', // Apila los elementos en columna
          //   minHeight: '100vh', // Altura mínima de toda la pantalla

          // }}
        >
          <Container maxWidth="xl" sx={{
            flexGrow: 1, // Empuja el Footer al final
            display: 'flex',
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" },
            mt: 15,
            mb: 5
          }}>
            <Grid size={{ xs: 12, sm: 10, md: 6, lg: 6 }} sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',

              // justifyContent: { xs: "center", md: "flex-end", lg:"flex-end" },
            }}>
              <Box >
                <Typography sx={{ fontSize: 48, color: 'grey.800', fontWeight: "800" }}>CLUB SOCIAL</Typography>
                {/* <Typography sx={{  mt: -2,fontSize: 28, color: "white", fontWeight: "400"}}>de Junin</Typography> */}
              </Box>
              <Typography sx={{ mt: -1, fontSize: 16, color: 'grey.800', fontWeight: "450", justifyContent: { xs: "flex-start", md: "flex-start", lg: "flex-start", xl: "flex-start" } }}>Club Manager Solution</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 10, md: 6, lg: 6 }} sx={{
              display: 'flex',
              justifyContent: 'flex-end', // Alinea el formulario a la derecha
              alignItems: 'center',
            }}>
              {!loguedUserInformation ? <SignInForm /> : null}
              


            </Grid>
          </Container>





          <>
            {/* Primer Parallax */}
            <Box
              sx={{
                height: '500px',
                backgroundImage: `url(https://images.pexels.com/photos/8688170/pexels-photo-8688170.jpeg?cs=srgb&dl=pexels-kindelmedia-8688170.jpg&fm=jpg)`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />

            {/* Sección de contenido */}
            <Container sx={{ py: 8, backgroundColor: 'white' }}>
              <Typography variant="h2" gutterBottom>
                Parallax
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Parallax is an effect where the background content or image, in this case,
                is moved at a different speed than the foreground content while scrolling.
              </Typography>
            </Container>

            {/* Segundo Parallax */}
            <Box
              sx={{
                height: '500px',
                backgroundImage: `url(https://images.hdqwalls.com/wallpapers/football-ground-sun-rays-4k-ev.jpg)`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          </>





          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mt: 2 }}>
            <Advertising />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Footer />
          </Grid>

          {loading
            // || loadingJU 
            ? (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 20, // Asegura que esté por encima de otros elementos
              }}>
                <CircularProgress color="inherit" />
              </Box>
            ) : null}

        </Grid>

      </Grid>
    </>
  );
};

export default LandingScreen;
