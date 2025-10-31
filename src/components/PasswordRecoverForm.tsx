import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import Grid from "@mui/material/Grid2";


import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { recoverPasswordContext } from "../Context/RecoverPasswordContext";
import { controlModalsContext } from "../Context/ControModalsContext";

import LoadingOverlay from "./LoadingOverlay";
import Notification from "./Notification";

const validationSchema = Yup.object({
  email: Yup.string().email("Correo electrónico inválido").required("El campo es obligatorio"),
});

const PasswordRecoverForm: React.FC = () => {


  const {
    handleRecoverPassword,
    recoverPasswordSuccess,
    setRecoverPasswordSuccess,
    recoverPasswordError,
    setRecoverPasswordError,
    loading,
  } = useContext(recoverPasswordContext);
  const { setOpenRecoverPassword, setOpenRecoverEmail, setOpenLogin } = useContext(controlModalsContext);

  const navigate = useNavigate();



  const handleSubmit = async (values: { email: string }, { resetForm }: any) => {
    const ok = await handleRecoverPassword(values.email);
    if (ok) resetForm(); // limpia el campo si fue exitoso

    if (ok) {
      resetForm();
      // ✅ Espera breve para que el usuario vea la notificación
      setTimeout(() => {
        setOpenRecoverPassword(false);
        setOpenLogin(true);
      }, 3000);
    }

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
                // if (localError) setLocalError("");
                // si el provider devolviera errores por campo podrías llamar:
                // setFieldError("email", "");
              }}
              onBlur={handleBlur}
              error={(touched.email && Boolean(errors.email))}
              helperText={
                touched.email && errors.email ? errors.email : " "
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
                  Enviar
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


      <Notification
        open={recoverPasswordSuccess}
        message={recoverPasswordSuccess}
        type="success"
        onClose={() => setRecoverPasswordSuccess("")}
      />
      <Notification
        open={recoverPasswordError}
        message={recoverPasswordError}
        type="error"
        onClose={() => setRecoverPasswordError("")}
      />

      <LoadingOverlay open={loading} />
    </Box>
  );
};

export default PasswordRecoverForm;
