import React, { useEffect, useContext, useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import Modal from '@mui/material/Modal';
import { FormControlLabel, Avatar, Box, Paper, Card, Container, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { joinUpContext } from '../Context/JoinUpContext';



// Componente Copyright

interface JoinUpFormValues {
    email: string;
    password: string;
    name: string;
    lastName: string;
    dni: string;
    phone: string;
    groupHead: boolean;
}

// Validación con Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Correo electrónico inválido")
        .required("El campo es requerido"),
    name: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
        .required("El campo es requerido"),
    lastName: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
        .required("El campo es requerido"),
    dni: Yup.string()
        .matches(/^\d+$/, "El DNI debe contener solo números")
        .test(
            "longitud-dni",
            "El DNI debe tener entre 7 y 8 dígitos",
            (value) => value && value.length >= 7 && value.length <= 8
        )
        .required("El campo es requerido"),
    phone: Yup.string()
        .matches(
            /^\d{10}$/,
            "Número de teléfono inválido"
        )
        .required("El campo es requerido"),
});


const JoinUpForm: React.FC = () => {

    const { setJoinUpUser, joinUpSuccess, joinUpError, setJoinUpError } = useContext(joinUpContext);
    const [open, setOpen] = React.useState(false);
  
    useEffect(() => {
        if (joinUpSuccess) {
            setOpen(true);
        }
    }, [joinUpSuccess])

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (
        values: JoinUpFormValues,
        formikHelpers: FormikHelpers<JoinUpFormValues>
    ) => {
        const user = {
            email: values.email,
            name: values.name, lastName: values.lastName,
            dni: values.dni,
            phone: values.phone,
            date: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            groupHead: values.groupHead
        };
        setOpen(true)
        setJoinUpUser(user);
    };


    const navigate = useNavigate();

    return (
        <Box
            component={Paper}
            elevation={6}
            sx={{

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                px: 4,
                py: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width: 650,
                height: 450,
            }}
        >

            <Typography component="h1" variant="h5">Solicitud de Nuevo Socio</Typography>

            <Formik<JoinUpFormValues>
                initialValues={{ email: "", password: "", name: "", lastName: "", dni: "", phone: "", groupHead: false }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched, isValid, dirty }) => (
                    <Form>
                        <Grid container spacing={2}
                        >
                            <Grid size={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="name"
                                    label="Nombre"
                                    type="name"
                                    id="name"
                                    autoFocus
                                    autoComplete="current-name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
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
                                    }} />

                            </Grid>


                            <Grid size={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="lastName"
                                    label="Apellido/s"
                                    type="lastName"
                                    id="lastName"
                                    autoComplete="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
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

                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Dirección de correo"
                                    name="email"
                                    autoComplete="email"
                                    // autoFocus
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
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

                            </Grid>

                            <Grid size={3}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Telefono"
                                    type="phone"
                                    id="phone"
                                    autoComplete="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.phone && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
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
                                    }} />

                            </Grid>

                            <Grid size={3}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="dni"
                                    label="DNI"
                                    type="dni"
                                    id="dni"
                                    autoComplete="dni"
                                    value={values.dni}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.dni && Boolean(errors.dni)}
                                    helperText={touched.dni && errors.dni}
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
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                <FormControl fullWidth sx={{ mb: 0 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            name="groupHead"
                                            checked={values.groupHead}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            />
                                        }
                                        label="Grupo Familiar"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <Button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevenir el envío del formulario
                                        navigate('/')
                                    }}
                                    fullWidth variant="contained" sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: "grey",
                                        '&:hover': {
                                            backgroundColor: 'darkred', // Color al pasar el mouse
                                        },
                                    }}>
                                    CANCELAR
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
                                    ENVIAR SOLICITUD
                                </Button>
                            </Grid>

                        </Grid>
                    </Form>
                )}
            </Formik>

            <Modal
                open={open}
                onClose={handleClose}
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
                        Solicitud Enviada Exitosamente
                    </Typography>

                    <Typography id="child-modal-description"
                        sx={{ fontSize: 13, color: "white", fontWeight: "400", display: 'flex', fontFamily: 'San Francisco, -apple-system, BlinkMacSystemFont', pt: 1, pb: 3, mr: 2, ml: 2 }} >
                        Te contactaremos a la brevedad! Muchas gracias.
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
                        alignItems: 'center', // Alinear verticalmente
                        height: 50,
                        // backgroundColor: "red",
                        width: '100%', // Ancho completo para alinear correctamente
                        justifyContent: 'center' // Espacio entre los botones y la línea vertical
                    }}>
                        {/* Botón Izquierdo */}
                        {/* <Button
                            onClick={handleClose}
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
                            onClick={handleClose}
                            sx={{

                                backgroundColor: 'transparent', // Sin fondo
                                color: '#007aff', // Color azul predeterminado de iOS
                                // mr: 5,
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
        </Box >
    );
};

export default JoinUpForm;

