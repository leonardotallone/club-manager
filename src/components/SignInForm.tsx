import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import Grid from '@mui/material/Grid2';
import * as Yup from "yup";

import { signInUserContext } from '../Context/SignInUserContext';
import { controlModalsContext } from '../Context/ControModalsContext';

const emailRegex = /^[a-zA-Z0-9\u00E0-\u00FC._%+!#$&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegex, 'Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
    password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("El campo es requerido"),
});

const SignInForm: React.FC = () => {
    const { setCredentials, signInError, setSignInError } = useContext(signInUserContext);
    const { setOpenRecoverPassword, setOpenLogin } = useContext(controlModalsContext);

    const navigate = useNavigate();

    const handleSubmit = (values: { email: string; password: string }) => {
        setCredentials(values);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "rgba(255, 255, 255, 0.8)", // blanco con 80% de opacidad
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
                width: { xs: "70%", sm: 400 },
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#424242' }}>
                Iniciar Sesión
            </Typography>

            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched, isValid, dirty }) => (
                    <Form style={{ width: '100%' }}>
                        {/* EMAIL */}
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Correo electrónico"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email) || Boolean(signInError)}
                            helperText={
                                touched.email && errors.email
                                    ? errors.email
                                    : signInError ? "Datos incorrectos" : " "
                            }
                            sx={{
                                mb: 1.5,
                                "& label.Mui-focused": { color: "green" },
                                "& .MuiInput-underline:after": { borderBottomColor: "green" },
                            }}
                        />

                        {/* PASSWORD */}
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password) || Boolean(signInError)}
                            helperText={
                                touched.password && errors.password
                                    ? errors.password
                                    : signInError ? "Datos incorrectos" : " "
                            }
                            sx={{
                                mb: 2.5,
                                "& label.Mui-focused": { color: "green" },
                                "& .MuiInput-underline:after": { borderBottomColor: "green" },
                            }}
                        />
                        <Grid container >
                            <Grid  size={{ xs: 12, md: 12 }}>
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
                                    Iniciar Sesión
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            type="button"
                            onClick={() => {
                                setOpenLogin(false);
                                setOpenRecoverPassword(true)
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
        </Box>
    );
};

export default SignInForm;





