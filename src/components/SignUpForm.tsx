import * as React from 'react';
import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dayjs } from 'dayjs';

import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { ListItemText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const category = [
    'Activo',
    'Pleno',
    'Jubilado',
    'Vitalício',
];
const names = [
    'Fútbol',
    'Tenis',
    'Hockey',
    'Natación',
];

function getStyles(name: string, discipline: readonly string[], theme: Theme) {
    return {
        fontWeight: discipline.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

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

interface SignUpFormValues {
    email: string;
    password: string;
    name: string;
    lastName: string;
    dni: string;
    address: string;
    birthDate: Dayjs;
    contactNumber: string;
    familyGroup: boolean;
    category: string;
    discipline: string[];
}

// Validación con Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Dirección de correo electrónico inválida")
        .required("El campo es obligatorio"),

    password: Yup.string()
        .min(6, "La contraseña debe tener como mínimo 6 caracteres")
        .required("El campo es obligatorio"),

    name: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
        .required("El campo es obligatorio"),

    lastName: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
        .required("El campo es obligatorio"),

    dni: Yup.string()
        .matches(/^\d+$/, "El DNI debe contener solo números")
        .test(
            "longitud-dni",
            "El DNI debe tener entre 7 y 8 dígitos",
            (value) => value && value.length >= 7 && value.length <= 8
        )
        .required("El campo es obligatorio"),

    address: Yup.string()
        .min(5, "La dirección debe tener como mínimo 5 caracteres")
        .required("El campo es obligatorio"),

    birthDate: Yup.date()
        .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
        .required("El campo es obligatorio"),

    contactNumber: Yup.string()
        .matches(/^\+?\d{7,15}$/, "Número de contacto inválido")
        .required("El campo es obligatorio"),

    familyGroup: Yup.boolean()
        .required("El campo es obligatorio"),

    category: Yup.string()
        .oneOf(["A", "B", "C"], "La categoría debe ser A, B o C")
        .required("El campo es obligatorio"),
    discipline: Yup.array()
        .of(Yup.string().required("La disciplina es obligatoria"))
        .min(1, "Debes seleccionar al menos una disciplina")
        .required("El campo es obligatorio"),
});


const SignUpForm: React.FC = () => {

    const [discipline, setDiscipline] = React.useState<string[]>([]);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const {
            target: { value },
        } = event;
        setDiscipline(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (
        values: SignUpFormValues,
        formikHelpers: FormikHelpers<SignUpFormValues>
    ) => {
        const user = { username: values.email, password: values.password, name: values.name, lastName: values.lastName, dni: values.dni, address: values.address, familyGroup: values.familyGroup, category: values.category, discipline: values.discipline };
        console.log(user);
        // navigate("/home");
    };


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
                width: 600,
                height: "auto",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Alta de nuevo socio</Typography>

            <Formik<SignUpFormValues>
                initialValues={{ email: "", password: "", name: "", lastName: "", dni: "", address: "", birthDate: null, contactNumber: "", familyGroup: false, category: "", discipline: [], }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched, }) => (
                    <Form>
                        <Grid
                            container
                            spacing={1}
                            justifyContent="center" // Centers the buttons horizontally
                            alignItems="center" // Aligns them vertically
                        >
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
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
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>

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
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="name"
                                    label="Nombre"
                                    type="name"
                                    id="name"
                                    autoComplete="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
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
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
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
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="address"
                                    label="Domicilio"
                                    type="address"
                                    id="address"
                                    autoComplete="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.address && Boolean(errors.address)}
                                    helperText={touched.address && errors.address}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Fecha de Nacimiento"
                                            value={values.birthDate} // This should now be a Dayjs object
                                            onChange={(newValue) => {
                                                handleChange({ target: { name: 'birthDate', value: newValue } }); // Update Formik state
                                            }}
                                        />
                                    </DemoContainer>
                                    {touched.birthDate && errors.birthDate && (
                                        <Typography color="error" variant="caption" sx={{ mt: 1, fontSize: '0.75rem' }}>
                                            {errors.birthDate as string}
                                        </Typography>
                                    )}
                                </LocalizationProvider>
                            </Grid>

                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="contactNumber"
                                    label="Número de Contacto"
                                    type="contactNumber"
                                    id="contactNumber"
                                    autoComplete="contactNumber"
                                    value={values.contactNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.contactNumber && Boolean(errors.contactNumber)}
                                    helperText={touched.contactNumber && errors.contactNumber}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.category} // Bind Formik value
                                        label="Categoria" // Update label to match the field
                                        onChange={(event) => {
                                            handleChange({ target: { name: 'category', value: event.target.value } }); // Correctly update Formik state
                                        }}
                                    // onBlur={handleBlur} // Optional: Handle blur event if needed
                                    >
                                        {category.map((cat) => (
                                            <MenuItem key={cat} value={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                    {touched.category && errors.category && (
                                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                            {errors.category}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }} sx={{ mt: 3, mb: 2 }}>

                                <FormControlLabel


                                    control={
                                        <Checkbox
                                            checked={values.familyGroup} // Bind checkbox to Formik value
                                            onChange={(event) => {
                                                handleChange({ target: { name: 'familyGroup', value: event.target.checked } }); // Update Formik state
                                            }}
                                            color="primary"
                                        />
                                    }
                                    label="Grupo Familiar"
                                />
                            </Grid>


                   
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >

                                <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Disciplinas</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                         id="demo-multiple-chip"
                                        multiple
                                        required
                                        value={discipline}
                                        onChange={(event) => {
                                            handleDiscipline(event);
                                            handleChange({ target: { name: 'discipline', value: event.target.value } });
                                        }}
                                        input={<OutlinedInput id="select-multiple-chip" label="Disciplinas" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name} style={getStyles(name, discipline, theme)}>
                                                <Checkbox checked={discipline.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                        {/* {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, discipline, theme)}

                                            >
                                                {name}
                                            </MenuItem>
                                        ))} */}
                                    </Select>
                                    {touched.discipline && errors.discipline && (
                                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                            {errors.discipline}
                                        </Typography>
                                    )}
                                </FormControl>





                            </Grid>


                        </Grid >


                        <Grid
                            container
                            spacing={2}
                            justifyContent="center" // Centers the buttons horizontally
                            alignItems="center" // Aligns them vertically
                        >
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <Button href="/" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                                    CANCELAR
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ENVIAR SOLICITUD
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

            <Box mt={5}>
                <Copyright />
            </Box>
        </Box>
    );
};

export default SignUpForm;

