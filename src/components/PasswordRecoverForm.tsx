// PasswordRecoverForm.tsx
import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import Grid from "@mui/material/Grid2";


import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { recoverPasswordContext } from "../Context/RecoverPasswordContext";
import { controlModalsContext } from "../Context/ControModalsContext";

const validationSchema = Yup.object({
  email: Yup.string().email("Correo electrónico inválido").required("El campo es obligatorio"),
});

const PasswordRecoverForm: React.FC = () => {
  const ctx = useContext(recoverPasswordContext);
  if (!ctx) throw new Error("recoverPasswordContext no disponible");

  const { loading, handlePasswordReset } = ctx;
  const { setOpenRecoverPassword, setOpenRecoverEmail } = useContext(controlModalsContext);

  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [localError, setLocalError] = useState(""); // <-- error manejado localmente

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpenModalSuccess(false);
    navigate("/");
  };

  const handleSubmit = async (values: { email: string }) => {
    // Limpio el error local IMEDIATAMENTE
    setLocalError("");
    // Llamo al provider pasando el email
    const result = await handlePasswordReset(values.email);

    if (!result.ok) {
      // muestro el error en el helperText a través de localError
      setLocalError(result.message ?? "Error inesperado");
      return;
    }

    // éxito
    setModalMessage(result.message ?? "Solicitud enviada");
    setOpenModalSuccess(true);
  };

  return (
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "rgba(255, 255, 255, 0.8)",
      boxShadow: 24,
      borderRadius: 2,
      p: 4,
      width: { xs: "70%", sm: 400 },
      height: 365,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#424242" }}>
        Recuperar Contraseña
      </Typography>

      <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, values, errors, touched, isValid, dirty, setFieldError }) => (
          <Form style={{ width: "100%" }}>
            <TextField
              fullWidth
              variant="standard"
              label="Correo electrónico"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => {
                handleChange(e);
                // limpio el error local de forma inmediata al tipear
                if (localError) setLocalError("");
                // si el provider devolviera errores por campo podrías llamar:
                // setFieldError("email", "");
              }}
              onBlur={handleBlur}
              error={(touched.email && Boolean(errors.email)) || Boolean(localError)}
              helperText={
                touched.email && errors.email ? errors.email : localError ? localError : " "
              }
              sx={{
                mb: 3,
                "& label.Mui-focused": { color: "green" },
                "& .MuiInput-underline:after": { borderBottomColor: "green" },
              }}
            />

            <Grid container spacing={1.5}>
              <Grid size={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setOpenRecoverPassword(false)}
                  sx={{
                    backgroundColor: "grey",
                    "&:hover": { backgroundColor: "darkred" },
                    textTransform: "none",
                    height: 32,
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid size={6}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!isValid || !dirty || loading}
                  sx={{
                    backgroundColor: "#b71c1c",
                    "&:hover": { backgroundColor: "darkred" },
                    textTransform: "none",
                    height: 32,
                  }}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
              </Grid>
            </Grid>

            <Button
              fullWidth
              type="button"
              onClick={() => {
                setOpenRecoverEmail(true);
                setOpenRecoverPassword(false);
              }}
              sx={{
                mt: 1.5,
                textTransform: "none",
                color: "#b71c1c",
                fontSize: 13,
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              ¿Olvidaste el correo?
            </Button>
          </Form>
        )}
      </Formik>

      <Modal open={openModalSuccess} onClose={handleCloseModal} aria-labelledby="child-modal-title">
        <Box sx={{
          maxWidth: 300,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "rgba(29, 29, 29, 0.85)",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          textAlign: "center",
        }}>
          <Typography id="child-modal-title" sx={{ fontSize: 17, color: "white", fontWeight: 700, mb: 1 }}>
            Solicitud Enviada Exitosamente
          </Typography>
          <Typography sx={{ fontSize: 13, color: "white", fontWeight: 400, mb: 2 }}>
            {modalMessage}
          </Typography>
          <Button onClick={handleCloseModal} sx={{ backgroundColor: "transparent", color: "#b71c1c", textTransform: "none", fontSize: 17 }}>
            Aceptar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PasswordRecoverForm;
