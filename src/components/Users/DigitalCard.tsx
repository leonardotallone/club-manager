import React, { useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import { getAllUsersContext } from "../../Context/GetAllUsersContext";
import { useTheme } from "@mui/material/styles";

// ✅ Definimos props opcionales
interface DigitalCardProps {
  user?: any;
}

const DigitalCard: React.FC<DigitalCardProps> = ({ user }) => {
  const { loguedUserInformation } = useContext(getAllUsersContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Usa el "user" recibido o, si no existe, el del contexto
  const currentUser = user || loguedUserInformation;
  if (!currentUser) return null;

  const palette = {
    primary: "#2E7D32",
    accent: "#81C784",
    text: "#111",
    lightBg: "#f9f9f9",
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://club-social.com/user/${currentUser.id}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mi Carnet Digital",
          text: `Soy ${currentUser.name} ${currentUser.lastName} del Club Social Harley Davidson 🏍️`,
          url: `https://club-social.com/user/${currentUser.id}`,
        });
      } else {
        alert("La función de compartir no está disponible en este dispositivo.");
      }
    } catch (error) {
      console.log("Error al compartir:", error);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: 400, md: 700 },
        p: { xs: 3, md: 4 },
        borderRadius: "20px",
        bgcolor: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        mx: "auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? 3 : 5,
        fontFamily: '"Outfit", sans-serif',
        color: palette.text,
      }}
    >
      {/* 🧍 Información del usuario */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <Avatar
          src={
            currentUser.avatarURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={currentUser.name}
          sx={{
            width: isMobile ? 110 : 130,
            height: isMobile ? 110 : 130,
            border: `3px solid ${palette.primary}`,
            mb: 2,
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", md: "2rem" },
            fontWeight: 600,
            color: palette.text,
            mb: 0.5,
          }}
        >
          {currentUser.name} {currentUser.lastName}
        </Typography>

        <Typography sx={{ fontSize: "1rem", color: "#555", mb: 1 }}>
          DNI {currentUser.dni}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent={isMobile ? "center" : "flex-start"}
          sx={{ mb: 1.5 }}
        >
          <Typography sx={{ fontWeight: 600, color: palette.primary }}>
            {currentUser.category}
          </Typography>
          {currentUser.full && (
            <Typography sx={{ fontWeight: 700, color: palette.primary }}>
              • PLENO
            </Typography>
          )}
        </Stack>

        <Divider
          sx={{
            width: isMobile ? "60%" : "80%",
            my: 1.5,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        />

        <Button
          onClick={handleShare}
          variant="outlined"
          startIcon={<ShareRoundedIcon />}
          sx={{
            color: palette.primary,
            borderColor: palette.primary,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "12px",
            "&:hover": {
              bgcolor: palette.primary,
              color: "#fff",
              borderColor: palette.primary,
            },
          }}
        >
          Compartir
        </Button>
      </Box>

      {/* QR */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: palette.lightBg,
          borderRadius: "16px",
          p: { xs: 2, md: 3 },
        }}
      >
        <QrCode2RoundedIcon
          sx={{ color: palette.primary, fontSize: isMobile ? 32 : 40, mb: 1 }}
        />

        <Box
          sx={{
            p: 1.5,
            bgcolor: "#fff",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={qrUrl}
            alt="QR Code"
            width={isMobile ? 140 : 160}
            height={isMobile ? 140 : 160}
            style={{ borderRadius: "8px" }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "#777",
            fontWeight: 400,
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          Mostrá este código al ingresar al club
        </Typography>
      </Box>
    </Box>
  );
};

export default DigitalCard;
