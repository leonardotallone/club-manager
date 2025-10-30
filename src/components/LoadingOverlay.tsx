// src/components/LoadingOverlay.tsx
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingOverlayProps {
  message?: string;
  color?: string;
  size?: number;
  open?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Cargando...",
  color = "#b71c1c",
  size = 48,
  open = false,
}) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(3px)",
        borderRadius: 4,
        zIndex: 10,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={size} thickness={4} sx={{ color }} />
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            fontFamily: '"Outfit", sans-serif',
            color: "#444",
            fontWeight: 600,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingOverlay;
