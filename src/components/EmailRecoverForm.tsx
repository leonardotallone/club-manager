import React, { useEffect } from 'react';

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

// Componente Copyright
function Copyright(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

    const handleSubmit = (values: { dni: string; }) => {
        const user = { username: values.dni };
        console.log(user);
        navigate("/");
    };

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (accessToken) {
    //         navigate("/home");
    //     }
    // }, [accessToken])

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

        </Box>
    );
};

export default EmailRecoverForm;

