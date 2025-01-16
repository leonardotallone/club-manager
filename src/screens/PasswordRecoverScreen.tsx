import { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container, Typography } from "@mui/material";
import Background from "../assets/backgroundImages/Background.jpg"
import PasswordRecoverForm from '../components/PasswordRecoverForm';
import Advertising from "../components/Advertising";
import Footer from "../components/Footer";
import { signInContext } from '../context/SignInContext';

const PasswordRecoverScreen = () => {

  const { loading } = useContext(signInContext);

  return (
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
          mt: 5,
          mb: 5
        }}>
          <Grid size={{ xs: 12, sm: 10, md: 6, lg: 6 }} sx={{
            display: 'flex',

            flexDirection: 'column',
            alignItems: 'flex-start',
            // justifyContent: { xs: "center", md: "flex-end", lg:"flex-end" },
          }}>
            <Typography sx={{ fontSize: 54, color: "white", fontWeight: "600", justifyContent: { xs: "flex-start", md: "flex-start", lg: "flex-start", xl: "flex-start" } }}>Club Social de Junin</Typography>
            <Typography sx={{ mt: -1, fontSize: 16, color: "white", fontWeight: "450", justifyContent: { xs: "flex-start", md: "flex-start", lg: "flex-start", xl: "flex-start" } }}>Club Manager Solution</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 10, md: 6, lg: 6 }} sx={{
            display: 'flex',
            justifyContent: 'flex-end', // Alinea el formulario a la derecha
            alignItems: 'center',
          }}>
            <PasswordRecoverForm />
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
  );
};

export default PasswordRecoverScreen;

