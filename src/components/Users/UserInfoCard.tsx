import React from "react";
import { Box, Typography, Avatar, Stack, Chip } from "@mui/material";

const UserDashboardInfo: React.FC = () => {
  const user = {
    name: "Juan",
    lastName: "Pérez",
    address: "Calle Falsa 123, Buenos Aires",
    phone: "+54 9 11 1234-5678",
    paymentMethod: "Tarjeta de crédito",
    familyMembers: [
      { name: "María", lastName: "Pérez" },
      { name: "Luis", lastName: "Pérez" },
    ],
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 4, md: 10 },
        py: { xs: 6, md: 12 },
        bgcolor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Avatar
        src={user.avatarUrl}
        alt={`${user.name} ${user.lastName}`}
        sx={{
          width: 140,
          height: 140,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "50%",
        }}
      />

      <Typography
        component="h1"
        sx={{
          fontSize: { xs: "2.8rem", md: "3.6rem" },
          fontWeight: 600,
          color: "#222",
          letterSpacing: "-0.02em",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        {user.name} {user.lastName}
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={8}
        justifyContent="center"
        sx={{ width: "100%", maxWidth: 900 }}
      >
        {[
          { label: "Dirección", value: user.address },
          { label: "Teléfono", value: user.phone },
          { label: "Forma de pago", value: user.paymentMethod },
        ].map(({ label, value }) => (
          <Box key={label} sx={{ textAlign: "center" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#d32f2f",
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.15rem",
                color: "#444",
                userSelect: "text",
              }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Stack>

      {user.familyMembers.length > 0 && (
        <Box sx={{ width: "100%", maxWidth: 900, textAlign: "center" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.75rem",
              mb: 3,
              color: "#d32f2f",
              letterSpacing: "0.05em",
              userSelect: "none",
            }}
          >
            Socios adheridos
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            {user.familyMembers.map((member, idx) => (
              <Chip
                key={idx}
                label={`${member.name} ${member.lastName}`}
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#555",
                  bgcolor: "#fff",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  px: 3,
                  py: 0.6,
                  userSelect: "none",
                  cursor: "default",
                  transition: "background-color 0.25s ease",
                  "&:hover": {
                    bgcolor: "#fce4e4",
                    color: "#b71c1c",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default UserDashboardInfo;
