import React, { useEffect, useContext } from 'react';

import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { recoverUserContext } from '../context/RecoverUserContext';

// Componente Copyright
// function Copyright(props: React.HTMLAttributes<HTMLDivElement>) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// Validación con Yup
const validationSchema = Yup.object({
    dni: Yup.string()
        .matches(/^\d+$/, "El DNI debe contener solo números") // Validar solo números
        .test(
            "longitud-dni",
            "El DNI debe tener entre 7 y 8 dígitos",
            (value) => value && value.length >= 7 && value.length <= 8
        )
        .required("El campo es obligatorio"), // Validar que sea obligatorio
});


const EmailRecoverForm: React.FC = () => {

    const { setDni, recoverUserError, recoverUserSuccess } = useContext(recoverUserContext);

    const [open, setOpen] = React.useState(true);
    
        const handleOpenModal = () => {
            setOpen(true);
        };
        const handleCloseModal = () => {
            setOpen(false);
        };

    const navigate = useNavigate();

    const handleSubmit = (values: { dni: string; }) => {
        const user = { dni: values.dni };
   
        setDni(user)
        // navigate("/");
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
            <Typography component="h1" variant="h5">Recuperación de Correo</Typography>

            <Formik
                initialValues={{ dni: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form style={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dni"
                            label="Ingrese su DNI"
                            name="dni"
                            autoComplete="dni"
                            autoFocus
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
                                    ENVIAR
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
                    <Link href="#" variant="body2">
                        ¿Aún no sos socio?
                    </Link>
                </Grid> */}
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
                                    justifyContent: 'space-between' // Espacio entre los botones y la línea vertical
                                }}>
                                    {/* Botón Izquierdo */}
                                    <Button
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
                                    </Button>
            
                                    {/* Línea divisoria vertical */}
                                    <Box sx={{
                                        width: '1px', // Ancho de la línea vertical
                                        height: '50px', // Altura de la línea vertical
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Color blanco suave
            
                                    }} />
            
                                    {/* Botón Derecho */}
                                    <Button
                                        onClick={handleCloseModal}
                                        sx={{
            
                                            backgroundColor: 'transparent', // Sin fondo
                                            color: '#007aff', // Color azul predeterminado de iOS
                                            mr: 5,
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

export default EmailRecoverForm;

