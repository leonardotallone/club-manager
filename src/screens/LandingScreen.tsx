import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import Background from "../assets/backgroundImages/Background.jpg"
import Navbar from '../components/Navbar';
import SignInForm from "../components/SignInForm";
import JoinUpForm from '../components/JoinUpForm';
import Advertising from "../components/Advertising";
import Footer from "../components/Footer";
import { signInContext } from '../context/SignInContext';

const LandingScreen = () => {
  const [join, setJoin] = useState(false)

  const { loading } = useContext(signInContext);


  const handleJoin = () => {
    setJoin(prevJoin => !prevJoin);
    console.log(join)
  }



  return (
    <>
      <Navbar />
      <Grid container >
        <Grid
          container sx={{
            width: '100%',
            height: "auto",
            display: 'flex',
            // backgroundImage: 'url("https://cdn.pixabay.com/photo/2023/04/17/10/31/tennis-7932066_1280.jpg")', // Path to your image
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover', // Cover the entire area
            backgroundPosition: 'center', // Center the image

          }} >
          <Container maxWidth="xl" sx={{
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
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography sx={{ fontSize: 54, color: "white", fontWeight: "800" }}>CLUB SOCIAL</Typography>
                <Typography sx={{ fontSize: 38, color: "white", fontWeight: "400", ml: 2 }}>DE JUNÍN</Typography>
              </Box>
              <Typography sx={{ mt: -1, fontSize: 16, color: "white", fontWeight: "450", justifyContent: { xs: "flex-start", md: "flex-start", lg: "flex-start", xl: "flex-start" } }}>Club Manager Solution</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 10, md: 6, lg: 6 }} sx={{
              display: 'flex',
              justifyContent: 'flex-end', // Alinea el formulario a la derecha
              alignItems: 'center',
            }}>
             {!join ? <SignInForm /> : <JoinUpForm />}
            </Grid>
          </Container>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mt: 2 }}>
            <Advertising />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Footer />
          </Grid>

          {loading ? (
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
