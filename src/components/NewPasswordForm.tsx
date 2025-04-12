import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
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
import { newPasswordContext } from '../Context/NewPasswordContext';

// Validación con Yup
const validationSchema = Yup.object({
    password_1: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/,
            "Debe contener al menos una minúscula, una mayúscula y un carácter especial"
        )
        .required("El campo es obligatorio"),
    password_2: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/,
            "Debe contener al menos una minúscula, una mayúscula y un carácter especial"
        )
        .required("El campo es obligatorio")
        .oneOf([Yup.ref('password_1')], 'Las contraseñas deben coincidir'),
});

const NewPasswordForm: React.FC = () => {

    const { setResetPassworObject, newPasswordError, newPasswordSuccess, setNewPasswordError } = useContext(newPasswordContext);
    const [open, setOpen] = React.useState(false);

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const email = searchParams.get("email");
    console.log(token)

    useEffect(() => {
        if (newPasswordSuccess) {
            setOpen(true)
        }
    }, [newPasswordSuccess])

    const handleCloseModal = () => {
        setOpen(false);
        navigate("/");
    };
    const navigate = useNavigate();

    const handleSubmit = (values: { password_1: string; password_2: string; }) => {
        const PasswordObject = { newPassword: values.password_1, token: token, email: email };
        setResetPassworObject(PasswordObject)
    };

    return (
        <Box
            component={Paper}
            elevation={6}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px: 4,
                py: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width: 450,
                height: 450,
            }}
        >

            <Typography component="h1" variant="h5">Ingrese su nueva Contraseña</Typography>

            <Formik
                initialValues={{ password_1: "", password_2: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form style={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            type="password"
                            fullWidth
                            id="password_1"
                            label="Ingrese su contraseña"
                            name="password_1"
                            autoComplete="password_1"
                            autoFocus
                            value={values.password_1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={() => setNewPasswordError("")}
                            error={Boolean(touched.password_1 && errors.password_1) || Boolean(newPasswordError)} // Evalúa si hay un error de validación o de inicio de sesión
                            helperText={
                                touched.password_1 && errors.password_1 // Muestra el error de validación si existe
                                    ? errors.password_1
                                    : newPasswordError // Si no hay error de validación, muestra el error de inicio de sesión
                                        ? newPasswordError
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
                            type="password"
                            fullWidth
                            id="password_2"
                            label="Reingrese su contraseña"
                            name="password_2"
                            autoComplete="password_2"
                            autoFocus
                            value={values.password_2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={() => setNewPasswordError("")}
                            error={Boolean(touched.password_2 && errors.password_2) || Boolean(newPasswordError)} // Evalúa si hay un error de validación o de inicio de sesión
                            helperText={
                                touched.password_2 && errors.password_2 // Muestra el error de validación si existe
                                    ? errors.password_2
                                    : newPasswordError // Si no hay error de validación, muestra el error de inicio de sesión
                                        ? newPasswordError
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




                        <Grid
                            container
                            spacing={2}
                            justifyContent="center" // Centers the buttons horizontally
                            alignItems="center" // Aligns them vertically
                        >
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <Button href="/" variant="contained" fullWidth sx={{
                                    mt: 3, mb: 2, backgroundColor: "grey",
                                    '&:hover': {
                                        backgroundColor: 'darkred', // Color al pasar el mouse
                                    },
                                }}>
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 3, mb: 2, backgroundColor: '#b71c1c',
                                        '&:hover': {
                                            backgroundColor: 'darkred', // Color al pasar el mouse
                                        },
                                    }}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

            <Grid container alignItems="center" justifyContent={{ xs: "center", sm: "space-between", md: "space-between", lg: "space-between", }} spacing={{ xs: 3, sm: 20, md: 30, lg: 30 }} direction={{ xs: "column", sm: "row", md: "row", lg: "row", }}  >
                <Grid size={{ xs: 12, sm: "auto", md: "auto", lg: "auto" }} sx={{ textAlign: 'center' }}>
                    <Link href="/email-recover" variant="body2" sx={{ color: "#b71c1c", textDecoration: "none" }}>
                        ¿Olvidaste el correo?
                    </Link>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{
                    maxWidth: 300,
                    // maxHeight: 200,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgba(29, 29, 29, 0.75)', // Fondo oscuro semitransparente
                    borderRadius: '20px', // Esquinas redondeadas
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Sombra sutil
                    display: 'flex', // Usar flexbox para centrar
                    flexDirection: 'column', // Colocar elementos en columna
                    alignItems: 'center', // Centrar horizontalmente
                    textAlign: 'center' // Centrar texto
                }}>
                    <Typography id="child-modal-title"
                        sx={{ fontSize: 17, color: "white", fontWeight: "700", display: 'flex', fontFamily: 'San Francisco, -apple-system, BlinkMacSystemFont', pt: 3, mr: 2, ml: 2 }} >
                       Contraseña restablecida exitosamente.
                    </Typography>

                    <Typography id="child-modal-description"
                        sx={{ fontSize: 13, color: "white", fontWeight: "400", display: 'flex', fontFamily: 'San Francisco, -apple-system, BlinkMacSystemFont', pt: 1, pb: 3, mr: 2, ml: 2 }} >
                    Mucha gracias!
                    </Typography>

                    {/* Línea divisoria horizontal */}
                    <Box sx={{
                        width: '100%', // Ancho completo
                        height: '1px', // Altura de la línea horizontal
                        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Color blanco suave
                    }} />

                    {/* Contenedor para los botones y la línea vertical */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center', // Centra verticalmente
                        justifyContent: 'center', // Centra horizontalmente
                        height: 50,
                        // backgroundColor: "red",
                        width: '100%', // Ancho completo para alinear correctamente

                    }}>
                        {/* Botón Izquierdo */}
                        {/* <Button
                            onClick={handleCloseModal}
                            sx={{

                                backgroundColor: 'transparent', // Sin fondo
                                color: '#007aff', // Color azul predeterminado de iOS
                                ml: 4,
                                textTransform: 'none', // Sin mayúsculas
                                fontSize: 17,
                                fontWeight: "400",
                            }}
                        >
                            Cancelar
                        </Button> */}

                        {/* Línea divisoria vertical */}

                        {/* <Box sx={{
                            width: '1px', // Ancho de la línea vertical
                            height: '50px', // Altura de la línea vertical
                            backgroundColor: 'rgba(255, 255, 255, 0.15)', // Color blanco suave

                        }} /> */}

                        {/* Botón Derecho */}
                        <Button
                            onClick={handleCloseModal}
                            sx={{
                                backgroundColor: 'transparent', // Sin fondo
                                color: '#007aff', // Color azul predeterminado de iOS
                                textTransform: 'none', // Sin mayúsculas
                                fontSize: 17,
                                fontWeight: "400",
                            }}
                        >
                            Aceptar
                        </Button>
                    </Box>
                </Box>
            </Modal>



        </Box>
    );
};

export default NewPasswordForm;

