import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';
import '@fontsource/roboto';


const Footer = () => {
  return (


    <Box sx={{ bgcolor: "grey.800", py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Club Information Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
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
        <Grid container spacing={4}>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}
            sx={{


              justifyContent: { xs: "center", md: "center", lg: "flex-start", xl: "flex-start" },
              display: 'flex',
              mb: { xs: -1, md: 0 },
              mt: { lg: 2, xs: 2 }
            }}
          >
            <Typography sx={{ fontSize: 12, color: "white", fontWeight: "400", display: 'flex' }}>
              Desarrollado por &nbsp;
              <Link
                href="http://materializecss.com"
                sx={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: 12,
                  // color: "#558b2f",
                }}
              >
                Club Manager Solution
              </Link>
            </Typography>

          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}
            sx={{

              justifyContent: { xs: "center", md: "center", lg: "flex-end", xl: "flex-end" },
              display: 'flex',
              mb: { xs: -1, md: 0 },
              mt: { lg: 2, xs: -2 }
            }}
          >
            <Typography sx={{ fontSize: 12, color: "white", fontWeight: "400", display: 'flex' }}>
              {'Copyright © '}
              <Link sx={{ color: 'white' }} href="https://mui.com/">
                Club Social de Junín
              </Link>
              {'\u00A0'} {/* This adds a space */}
              {new Date().getFullYear()}
              {'.'}
            </Typography>

          </Grid>
        </Grid>
      </Container>
    </Box>

  );
};

export default Footer;
