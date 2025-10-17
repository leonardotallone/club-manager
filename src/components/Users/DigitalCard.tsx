import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const DigitalCard: React.FC = () => {
  const user = {
    name: "Juan Pérez",
    dni: "12.345.678",
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://club-social.com/user/12345"
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", md: 400 },
        p: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #fff0f0 0%, #ffffff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        gap: 3,
      }}
    >
      {/* Foto del usuario */}
      <Avatar
        src={user.avatarUrl}
        alt={user.name}
        sx={{ width: 120, height: 120, border: "3px solid #b71c1c" }}
      />

      {/* Nombre */}
      <Typography
        sx={{
          fontSize: { xs: "1.8rem", md: "2.2rem" },
          fontWeight: 700,
          color: "#111",
          textAlign: "center",
        }}
      >
        {user.name}
      </Typography>

      {/* DNI */}
      <Typography
        sx={{
          fontSize: { xs: "1.2rem", md: "1.4rem" },
          fontWeight: 600,
          color: "#b71c1c",
        }}
      >
        DNI: {user.dni}
      </Typography>

      {/* QR Code hardcodeado */}
      <Box
        sx={{
          mt: 2,
          padding: 1,
          backgroundColor: "#fff",
          borderRadius: 2,
        }}
      >
        <img src={user.qrUrl} alt="QR Code" width={120} height={120} />
      </Box>
    </Box>
  );
};

export default DigitalCard;
