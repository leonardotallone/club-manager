// import React, { useEffect, useContext } from 'react';
// import { Box, Button, TextField, Typography, Grid, Modal } from "@mui/material";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { recoverUserContext } from '../Context/RecoverUserContext';
// import { controlModalsContext } from '../Context/ControModalsContext';

// // Validación con Yup
// const validationSchema = Yup.object({
//     dni: Yup.string()
//         .matches(/^\d+$/, "El DNI debe contener solo números")
//         .test(
//             "longitud-dni",
//             "El DNI debe tener entre 7 y 8 dígitos",
//             (value) => value && value.length >= 7 && value.length <= 8
//         )
//         .required("El campo es obligatorio"),
// });

// const EmailRecoverForm: React.FC = () => {
//     const { setDni, recoverUserError, setRecoverUserError, recoverUserSuccess } =
//         useContext(recoverUserContext);
//     const { setOpenRecoverEmail , setOpenRecoverPassword} = useContext(controlModalsContext)
//     const [open, setOpen] = React.useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (recoverUserSuccess) setOpen(true);
//     }, [recoverUserSuccess]);

//     const handleCloseModal = () => {
//         setOpen(false);
//         navigate("/");
//     };

//     const handleSubmit = (values: { dni: string }) => {
//         const user = { dni: values.dni };
//         setDni(user);
//     };

//     return (
//         <Box
//             sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 bgcolor: "rgba(255, 255, 255, 0.8)",
//                 boxShadow: 24,
//                 borderRadius: 2,
//                 p: 4,
//                 width: { xs: "70%", sm: 400 },
//                 height: 365, // 🔹 igualamos la altura con SignInForm
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center", // centra internamente el contenido
//             }}
//         >
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#424242" }}>
//                 Recuperar Correo
//             </Typography>

//             <Formik
//                 initialValues={{ dni: "" }}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ handleChange, handleBlur, values, errors, touched, isValid, dirty }) => (
//                     <Form style={{ width: "100%" }}>
//                         {/* DNI */}
//                         <TextField
//                             fullWidth
//                             variant="standard"
//                             label="Ingrese su DNI"
//                             name="dni"
//                             value={values.dni}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             onFocus={() => setRecoverUserError("")}
//                             error={touched.dni && Boolean(errors.dni) || Boolean(recoverUserError)}
//                             helperText={
//                                 touched.dni && errors.dni
//                                     ? errors.dni
//                                     : recoverUserError
//                                         ? recoverUserError
//                                         : " "
//                             }
//                             sx={{
//                                 mb: 2,
//                                 "& label.Mui-focused": { color: "green" },
//                                 "& .MuiInput-underline:after": { borderBottomColor: "green" },
//                             }}
//                         />

//                         <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                                 <Button
//                                     fullWidth
//                                     variant="contained"
//                                     onClick={() => setOpenRecoverEmail(false)}
//                                     sx={{
//                                         backgroundColor: "grey",
//                                         textTransform: "none",
//                                         height: 32,
//                                         '&:hover': { backgroundColor: "darkred" },
//                                     }}
//                                 >
//                                     Cancelar
//                                 </Button>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <Button
//                                     fullWidth
//                                     type="submit"
//                                     variant="contained"
//                                     disabled={!isValid || !dirty}
//                                     sx={{
//                                         backgroundColor: "#b71c1c",
//                                         '&:hover': { backgroundColor: "darkred" },
//                                         textTransform: "none",
//                                         height: 32,
//                                     }}
//                                 >
//                                     Enviar
//                                 </Button>
//                             </Grid>
//                         </Grid>

//                         <Button
//                             fullWidth
//                             type="button"
//                             onClick={() => {
//                                 setOpenRecoverEmail(false);
//                                 setOpenRecoverPassword(true);
//                             }}
//                             sx={{
//                                 mt: 1.5,
//                                 textTransform: "none",
//                                 color: "#b71c1c",
//                                 fontSize: 13,
//                                 '&:hover': { backgroundColor: 'transparent' },
//                             }}
//                         >
//                             ¿Olvidaste tu contraseña?
//                         </Button>
//                     </Form>
//                 )}
//             </Formik>

//             {/* MODAL DE CONFIRMACIÓN */}
//             <Modal
//                 open={open}
//                 onClose={handleCloseModal}
//                 aria-labelledby="child-modal-title"
//                 aria-describedby="child-modal-description"
//             >
//                 <Box
//                     sx={{
//                         maxWidth: 300,
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         bgcolor: "rgba(29, 29, 29, 0.75)",
//                         borderRadius: 2,
//                         boxShadow: 24,
//                         p: 3,
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         textAlign: "center",
//                     }}
//                 >
//                     <Typography
//                         id="child-modal-title"
//                         sx={{
//                             fontSize: 17,
//                             color: "white",
//                             fontWeight: "700",
//                             mb: 1,
//                         }}
//                     >
//                         {recoverUserSuccess}
//                     </Typography>
//                     <Typography
//                         id="child-modal-description"
//                         sx={{
//                             fontSize: 13,
//                             color: "white",
//                             fontWeight: "400",
//                             mb: 2,
//                         }}
//                     >
//                         Muchas gracias.
//                     </Typography>

//                     <Button
//                         onClick={handleCloseModal}
//                         sx={{
//                             backgroundColor: "transparent",
//                             color: "#007aff",
//                             textTransform: "none",
//                             fontSize: 16,
//                             fontWeight: 400,
//                         }}
//                     >
//                         Aceptar
//                     </Button>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default EmailRecoverForm;


import React, { useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, Grid, Modal } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { recoverUserContext } from '../Context/RecoverUserContext';
import { controlModalsContext } from '../Context/ControModalsContext';

const validationSchema = Yup.object({
  dni: Yup.string()
    .matches(/^\d+$/, "El DNI debe contener solo números")
    .test("longitud-dni", "El DNI debe tener entre 7 y 8 dígitos", (v) => v && v.length >= 7 && v.length <= 8)
    .required("El campo es obligatorio"),
});

const EmailRecoverForm: React.FC = () => {
  const { setDni, recoverUserError, setRecoverUserError, recoverUserSuccess } = useContext(recoverUserContext);
  const { setOpenRecoverEmail, setOpenRecoverPassword } = useContext(controlModalsContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (recoverUserSuccess) setOpen(true);
  }, [recoverUserSuccess]);

  const handleCloseModal = () => {
    setOpen(false);
    navigate("/");
  };

  const handleSubmit = (values: { dni: string }) => setDni({ dni: values.dni });

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
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, values, errors, touched, isValid, dirty }) => (
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
              error={(touched.dni && Boolean(errors.dni)) || Boolean(recoverUserError)}
              helperText={
                touched.dni && errors.dni
                  ? errors.dni
                  : recoverUserError
                    ? recoverUserError
                    : " "
              }
              sx={{
                mb: 3,
                "& label.Mui-focused": { color: "green" },
                "& .MuiInput-underline:after": { borderBottomColor: "green" },
              }}
            />

            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setOpenRecoverEmail(false)}
                  sx={{
                    backgroundColor: "grey",
                    '&:hover': { backgroundColor: "darkred" },
                    textTransform: "none",
                    height: 32,
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={6}>
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
        )}
      </Formik>

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            maxWidth: 300,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(29, 29, 29, 0.75)",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 17, color: "white", fontWeight: 700, mb: 1 }}>
            {recoverUserSuccess}
          </Typography>
          <Typography sx={{ fontSize: 13, color: "white", mb: 2 }}>
            Muchas gracias.
          </Typography>
          <Button
            onClick={handleCloseModal}
            sx={{
              backgroundColor: "transparent",
              color: "#007aff",
              textTransform: "none",
              fontSize: 16,
            }}
          >
            Aceptar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmailRecoverForm;
