import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';
import '@fontsource/roboto';


const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Configura Roboto como fuente global
  },
});
const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ bgcolor: "grey.800", py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Club Information Section */}
            <Grid size={{ xs: 12, sm: 12, md: 6, lg:6 }}>
              <Typography sx={{ fontSize: 26, fontWeight: "500", color: "white", mb: 1 }} >
                Club Social de Junin
              </Typography>
              <Typography sx={{ fontSize: 14, color: "white", fontWeight: "400" }}>
                Club Atlético Sarmiento, Asoc. Civil © 2022 Todos los derechos reservados.
                Av. Arias y Necochea (B6000) Junin, Buenos Aires, Argentina.
                Contacto: Informes: (54 236) 999-4444 • sarmiento@sarmiento.com.ar
              </Typography>
            </Grid>

            {/* Social Media Links Section */}
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 0 }}>
                <IconButton
                  href="#!"
                  sx={{ color: "white" }}
                  aria-label="Facebook"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="#!"
                  sx={{ color: "white" }}
                  aria-label="Twitter"
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  href="#!"
                  sx={{ color: "white" }}
                  aria-label="Instagram"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  href="#!"
                  sx={{ color: "white" }}
                  aria-label="YouTube"
                >
                  <YouTube />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* Footer Bottom Section */}
          <Grid
            size={{ xs: 12, sm: 12, md: 5, lg: 5 }}
            sx={{ mt: 2 }}
          >
            <Typography sx={{ fontSize: 14, color: "grey", fontWeight: "450", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              Desarrollado por{" "}
              <Link
                href="http://materializecss.com"
                sx={{
                  fontSize: 14,
                  color: "#558b2f",
                  fontWeight: "450",
                }}
              >
                Club Manager Solution
              </Link>
            </Typography>

          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
