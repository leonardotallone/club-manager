import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import '@fontsource/roboto'


const Footer = () => {
  return (
    <Box sx={{ bgcolor: "grey.900", color: "white", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        {/* ---------- Sección principal ---------- */}
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              // variant="h5"
              sx={{
                mb: 1,

                //  color: "#333",
                color: "#ffffffff",
                fontWeight: 600,
                fontFamily: '"Outfit", sans-serif',
                fontSize: { xs: "1.5rem", md: "2.0rem" },
              }}>
              Club Social de Junín
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.7,
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 400,
              }}>
              Club Social de Junín, Asoc. Civil © 2025. <br />
              Av. Rivadavia (B6000) Junín, Buenos Aires, Argentina. <br />
              Contacto: (54 236) 999-4444 • clubsocialdejunin@social.com.ar
            </Typography>
          </Grid>

          {/* ---------- Redes sociales ---------- */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 2 }}>
            <IconButton href="#" sx={{ color: "white", transition: "0.3s", "&:hover": { color: "#3b5998" } }} aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: "white", transition: "0.3s", "&:hover": { color: "#1da1f2" } }} aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "white", transition: "0.3s", "&:hover": { color: "#c13584" } }} aria-label="Instagram">
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: "white", transition: "0.3s", "&:hover": { color: "#ff0000" } }} aria-label="YouTube">
              <YouTube />
            </IconButton>
          </Grid>
        </Grid>

        {/* ---------- Sección inferior ---------- */}
        <Grid container spacing={2} sx={{ mt: { xs: 4, md: 6 }, borderTop: "1px solid rgba(255,255,255,0.2)", pt: 3 }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
            <Typography
              sx={{

                fontSize: { xs: "0.8rem", md: "0.8rem" },
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 400,
              }}>
              Desarrollado por&nbsp;
              <Link
                href="http://materializecss.com"
                sx={{
                  fontSize: { xs: "0.8rem", md: "0.8rem" },
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 400,
                }}>
                Club Manager Solution
              </Link>
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
            <Typography sx={{ fontSize: 12 }}>
              {'Copyright © '}
              <Link sx={{ color: 'white', fontWeight: 500 }} href="#">
                Club Social de Junín
              </Link>{' '}
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

