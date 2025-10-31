
import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

function SlideUp(props: any) {
  return <Slide {...props} direction="up" />;
}

interface NotificationProps {
  open: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  type = "success",
  onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={3500}
    onClose={onClose}
    TransitionComponent={SlideUp}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert
      onClose={onClose}
      severity={type}
      variant="filled"
       sx={{
    fontFamily: '"Outfit", sans-serif',
    borderRadius: 3,
    px: 3,
    py: 1.5,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    wordBreak: "break-word",
    whiteSpace: "normal", // 👈 deja que se rompan las líneas naturalmente
    minWidth: 380,        // 👈 ancho mínimo para mensajes cortos
    maxWidth: 600,        // 👈 evita que los largos ocupen toda la pantalla
    "& .MuiAlert-message": {
      width: "100%",
      textAlign: "center",
    },
  }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default Notification;
