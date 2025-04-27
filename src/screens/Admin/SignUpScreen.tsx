import React, { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import SignUpForm from "../../components/Admin/SignUpForm"
import Navbar from '../../components/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container } from "@mui/material";
import { signUpContext } from '../../Context/SignUpContext';
import BlackBanner from '../../components/BlackBanner';
import Footer from '../../components/Footer';
import Advertising from '../../components/Advertising';



const SignUpScreen = () => {

  const { loading } = useContext(signUpContext);


  return (
    <>
      <Navbar />
            <Grid container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Grid size={12} sx={{ mt: 12 }}>
                    <BlackBanner />
                </Grid>

                <Grid
                    container
                    sx={{
                        flexGrow: 1, display: 'flex', flexDirection: 'column',
                        // backgroundColor: "#eeeeee",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center', // Center the image
                    }}
                >
                    <Container maxWidth="xl" sx={{
                        flexGrow: 1, // Empuja el Footer al final
                        display: 'flex',
                        flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" },
                        mt: 5,
                        mb: 5,
                    }}>

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
                        ) : <SignUpForm />}



                    </Container>




                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mt: 2 }}>
                    <Advertising />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Footer />
                </Grid>
            </Grid>
    </>
  );
};

export default SignUpScreen;