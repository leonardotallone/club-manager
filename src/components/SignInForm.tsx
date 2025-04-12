import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import Typography from '@mui/material/Typography';
import { Formik, Form } from "formik";
import * as Yup from "yup";


import { signInContext } from '../Context/SignInContext';
import { displayLandingFormsContext } from '../Context/DisplayLandingFormsContext';

const emailRegex = /^[a-zA-Z0-9\u00E0-\u00FC._%+!#$&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Validación con Yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegex, 'Dirección de correo electrónico inválida')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, "La contraseña debe tener como mínimo 6 caracteres")
        .required("El campo es obligatorio"),
});


const SignInForm: React.FC = () => {

    const { setCredentials, signInError, setSignInError } = useContext(signInContext);
    const { setJoin } = useContext(displayLandingFormsContext);

    const handleSubmit = (values: { email: string; password: string }) => {
        const user = {
            username: values.email,
            password: values.password,
        };
        setCredentials(user);
        // Navigation to ADMIN page or USER page is in LandingScreen Component
    };

    const handleJoin = () => {
        setJoin((prevJoin: any) => !prevJoin);
    }

    return (
        <>
            <Box
                component={Paper}
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    px: 4,
                    py: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 2,
                    width: 450,
                    height: 450,
                }}
            >
                <Typography component="h1" variant="h5">Iniciar Sesión</Typography>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, isValid, dirty }) => (
                        <Form>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Dirección de correo"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={() => setSignInError("")}
                                error={Boolean(touched.email && errors.email) || Boolean(signInError)} // Evalúa si hay un error de validación o de inicio de sesión
                                helperText={
                                    touched.email && errors.email // Muestra el error de validación si existe
                                        ? errors.email
                                        : signInError // Si no hay error de validación, muestra el error de inicio de sesión
                                            ? "Los datos ingresados son incorrectos."
                                            : null // No muestra nada si no hay errores
                                }
                                slotProps={{
                                    input: {
                                        sx: {
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#b71c1c",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#b71c1c",
                                            },
                                        },
                                    },
                                    inputLabel: {
                                        sx: {
                                            "&.Mui-focused": {
                                                color: "#b71c1c",
                                            },
                                        },
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={() => setSignInError("")}

                                error={Boolean(touched.password && errors.password) || Boolean(signInError)} // Evalúa si hay un error de validación o de inicio de sesión
                                helperText={
                                    touched.password && errors.password // Muestra el error de validación si existe
                                        ? errors.password
                                        : signInError // Si no hay error de validación, muestra el error de inicio de sesión
                                            ? "Los datos ingresados son incorrectos."
                                            : null // No muestra nada si no hay errores
                                }
                                slotProps={{
                                    input: {
                                        sx: {
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#b71c1c",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#b71c1c",
                                            },
                                        },
                                    },
                                    inputLabel: {
                                        sx: {
                                            "&.Mui-focused": {
                                                color: "#b71c1c",
                                            },
                                        },
                                    },
                                }}
                            />
                            {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                        /> */}
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                    <Button onClick={(e) => {
                                        e.preventDefault(); // Prevenir el envío del formulario
                                        handleJoin();
                                    }} fullWidth variant="contained" sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: "grey",
                                        '&:hover': {
                                            backgroundColor: 'darkred', // Color al pasar el mouse
                                        },
                                    }}>
                                        QUIERO ASOCIARME
                                    </Button>
                                </Grid>

                                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                    <Button type="submit" fullWidth variant="contained" disabled={!isValid || !dirty} sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: '#b71c1c',
                                        '&:hover': {
                                            backgroundColor: 'darkred', // Color al pasar el mouse
                                        },
                                    }}>
                                        INICIAR SESIÓN
                                    </Button>
                                </Grid>
                            </Grid>

                        </Form>
                    )}
                </Formik>




                <Grid container alignItems="center" justifyContent={{ xs: "center", sm: "space-between", md: "space-between", lg: "space-between", }} spacing={{ xs: 3, sm: 20, md: 30, lg: 30 }} direction={{ xs: "column", sm: "row", md: "row", lg: "row", }}  >
                    <Grid size={{ xs: 12, sm: "auto", md: "auto", lg: "auto" }} sx={{ textAlign: 'center' }}>
                        <Link href="/password-recover" variant="body2" sx={{ color: "#b71c1c", textDecoration: "none" }}>
                            ¿Olvidaste tu contraseña?
                        </Link>

                    </Grid>
                    {/* <Grid size={{ xs: 12, sm:"auto", md: "auto", lg: "auto" }} sx={{ textAlign: 'center' }}>
                    <Link href="/signup" variant="body2">
                    ¿Aún no sos socio?
                    </Link>
                    </Grid> */}
                </Grid>
            </Box>

        </>

    );
};

export default SignInForm;

