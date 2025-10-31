import React, { useEffect, useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { recoverUserContext } from '../Context/RecoverUserContext';
import { controlModalsContext } from '../Context/ControModalsContext';

import LoadingOverlay from './LoadingOverlay';
import Notification from './Notification';

const validationSchema = Yup.object({
  dni: Yup.string()
    .matches(/^\d+$/, "El DNI debe contener solo números")
    .test("longitud-dni", "El DNI debe tener entre 7 y 8 dígitos", (v) => v && v.length >= 7 && v.length <= 8)
    .required("El campo es obligatorio"),
});

const EmailRecoverForm: React.FC = () => {
  const { setDni, recoverUserError, setRecoverUserError, recoverUserSuccess, setRecoverUserSuccess, loading } = useContext(recoverUserContext);
  const { setOpenRecoverEmail, setOpenRecoverPassword, setOpenLogin } = useContext(controlModalsContext);
  // const [open, setOpen] = React.useState(false);

  // Estado para almacenar la función resetForm de Formik
  const [resetFn, setResetFn] = useState<(() => void) | null>(null);

  // useEffect(() => {
  //   if (recoverUserSuccess) setOpen(true);
  // }, [recoverUserSuccess]);

  // useEffect(() => {
  //   if (!open && resetFn) {
  //     resetFn();
  //   }
  // }, [open, resetFn]);

  // const handleCloseModal = () => {
  //   setOpen(false);
  //   setDni("");
  //   setRecoverUserSuccess("");
  //   setRecoverUserError("");
  //   if (resetFn) resetFn();
  //   setOpenRecoverEmail(false)
  //   setOpenLogin(true);
  // };

  const handleSubmit = (values: { dni: string }, { resetForm }: { resetForm: () => void }) => {
    setDni({ dni: values.dni });
    resetForm();
  };

  return (
    <Box
      sx={{
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
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#424242" }}>
        Recuperar Correo
      </Typography>

      <Formik
        initialValues={{ dni: "" }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
          dirty,
          resetForm
        }) => {
          // Guarda resetForm para uso en efectos y handler externos
          if (resetFn !== resetForm) setResetFn(() => resetForm);

          return (
            <Form style={{ width: "100%" }}>
              <TextField
                fullWidth
                variant="standard"
                label="Ingrese su DNI"
                name="dni"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => setRecoverUserError("")}
                error={(touched.dni && Boolean(errors.dni))}
                helperText={
                  touched.dni && errors.dni
                    ? errors.dni :
                    " "
                }
                sx={{
                  mb: 3,
                  "& label.Mui-focused": { color: "green" },
                  "& .MuiInput-underline:after": { borderBottomColor: "green" },
                }}
              />
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setOpenRecoverEmail(false);
                      setOpenLogin(true);
                    }}
                    sx={{
                      backgroundColor: "grey",
                      '&:hover': { backgroundColor: "darkred" },
                      textTransform: "none",
                      height: 32,
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={!isValid || !dirty}
                    sx={{
                      backgroundColor: "#b71c1c",
                      '&:hover': { backgroundColor: "darkred" },
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
                  setOpenRecoverEmail(false);
                  setOpenRecoverPassword(true);
                }}
                sx={{
                  mt: 1.5,
                  textTransform: "none",
                  color: "#b71c1c",
                  fontSize: 13,
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Form>
          );
        }}
      </Formik>

      <Notification
        open={recoverUserSuccess}
        message={`Su Correo es ${recoverUserSuccess}`}
        type="success"
        onClose={() => setRecoverUserSuccess("")}
      />
      <Notification
        open={recoverUserError}
        message={recoverUserError}
        type="error"
        onClose={() => setRecoverUserError("")}
      />

      <LoadingOverlay open={loading} />
    </Box>
  );
};

export default EmailRecoverForm;
