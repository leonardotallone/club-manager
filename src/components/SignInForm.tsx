import React, { useEffect, useContext } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import Typography from '@mui/material/Typography';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { signInContext } from '../context/SignInContext';
import { displayLandingFormsContext } from '../context/DisplayLandingForms';

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

    const { setCredentials, signInError, setSignInError, userRole } = useContext(signInContext);
    const { setJoin } = useContext(displayLandingFormsContext);

    const handleSubmit = (values: { email: string; password: string }) => {
        const user = {
            username: values.email,
            password: values.password,
        };
        setCredentials(user);
    };

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken && userRole && userRole === "admin") {
            navigate("/dashboard-admin-screen");
        } else if (accessToken && userRole && userRole === "socio") {
            navigate("/dashboard-user-screen");
        }
    }, [accessToken, userRole]);




    const handleJoin = () => {
        setJoin((prevJoin: any) => !prevJoin);
    }

    const navigate = useNavigate();

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

                                error={touched.email && Boolean(errors.email) || signInError} // Evalúa ambos errores
                                helperText={
                                    (touched.email && errors.email) && signInError ?
                                        `${errors.email}. Los datos ingresados son incorrectos` : // Ambos errores
                                        (touched.email && errors.email) ?
                                            errors.email :
                                            signInError ?
                                                "Los datos ingresados son incorrectos." : // Mostrará este mensaje si signInError es true
                                                null // No mostrará nada si no hay errores
                                }


                                InputProps={{
                                    sx: {
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#b71c1c", // Cambia el color del borde activo
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#b71c1c", // Cambia el color al pasar el mouse
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        "&.Mui-focused": {
                                            color: "#b71c1c", // Cambia el color del texto del label activo
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
                                // error={touched.password && Boolean(errors.password)}
                                error={touched.password && Boolean(errors.password) || signInError} // Evalúa ambos errores
                                helperText={
                                    (touched.password && errors.password) && signInError ?
                                        `${errors.password}. Los datos ingresados son incorrectos` : // Ambos errores
                                        (touched.password && errors.password) ?
                                            errors.password :
                                            signInError ?
                                                "Los datos ingresados son incorrectos." : // Mostrará este mensaje si signInError es true
                                                null // No mostrará nada si no hay errores
                                }
                                // helperText={touched.password && errors.password}
                                InputProps={{
                                    sx: {
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#b71c1c", // Cambia el color del borde activo
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#b71c1c", // Cambia el color al pasar el mouse
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        "&.Mui-focused": {
                                            color: "#b71c1c", // Cambia el color del texto del label activo
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

