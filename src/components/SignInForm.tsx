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
    email: Yup.string()
        .email("Dirección de correo electrónico inválida")
        .required("El campo es obligatorio"),
    password: Yup.string()
        .min(6, "La contraseña debe tener como mínimo 6 caracteres")
        .required("El campo es obligatorio"),
});




const SignInForm: React.FC = () => {

    const handleSubmit = (values: { email: string; password: string }) => {
        const user = { username: values.email, password: values.password };
        console.log(user);
        navigate("/home");
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
                // justifyContent: 'center',
                px: 4,
                py: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width: 600,
                height: 600,
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Iniciar Sesión</Typography>

            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
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
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
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
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Iniciar Sesión
                        </Button>
                    </Form>
                )}
            </Formik>


            <Grid container alignItems="center" justifyContent={{ xs: "center", sm: "space-between", md: "space-between", lg: "space-between", }} spacing={{ xs: 3, sm: 20, md: 30, lg: 30 }} direction={{ xs: "column", sm: "row", md: "row", lg: "row", }}  >
                <Grid size={{ xs: 12, sm:"auto", md: "auto", lg: "auto" }} sx={{ textAlign: 'center' }}>
                    <Link href="/password-recover" variant="body2">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Grid>
                <Grid size={{ xs: 12, sm:"auto", md: "auto", lg: "auto" }} sx={{ textAlign: 'center' }}>
                    <Link href="/signup" variant="body2">
                        ¿Aún no sos socio?
                    </Link>
                </Grid>
            </Grid>


            <Box mt={5}>
                <Copyright />
            </Box>
        </Box>
    );
};

export default SignInForm;

