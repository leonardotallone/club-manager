import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Paper, Container, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';



import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
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
    "Gym"
];

function getStyles(name: string, discipline: readonly string[], theme: Theme) {
    return {
        fontWeight: discipline.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
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
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                px: 4,
                py: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width: "auto",
                height: "auto",
            }}
        >
            <Container maxWidth="xl"  >

                <Formik<SignUpFormValues>
                    initialValues={{ email: "", password: "", name: "", lastName: "", dni: "", address: "", birthDate: null, contactNumber: "", familyGroup: false, category: "", discipline: [], }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, }) => (
                        <Form>

                            <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid size={4}>
                                    <TextField
                                        autoFocus
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
                                </Grid>
                                <Grid size={4}>
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
                                </Grid>
                                <Grid size={4}>
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
                                </Grid>
                                <Grid size={4} sx={{ mt: 1 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
                                            <DatePicker
                                                sx={{
                                                    width: '100%',
                                                    "& .MuiInputLabel-root": {
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c", // Change label text color when focused
                                                        },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c", // Change border color when focused
                                                        },
                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c", // Change border color on hover
                                                        },
                                                    },
                                                }}
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
                                <Grid size={4}>
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
                                </Grid>
                                <Grid size={4}>
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
                                </Grid>
                                <Grid size={4}>
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
                                </Grid>
                                <Grid size={4}>
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
                                </Grid>
                                <Grid size={4} sx={{ mt: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{
                                            "&.Mui-focused": {
                                                color: "#b71c1c", // Ensure label color changes when focused
                                            },
                                        }}>Categoria</InputLabel>
                                        <Select

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.category} // Bind Formik value
                                            label="Categoria" // Update label to match the field
                                            onChange={(event) => {
                                                handleChange({ target: { name: 'category', value: event.target.value } }); // Correctly update Formik state
                                            }}
                                            sx={{
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c", // Change border color when focused
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c", // Change border color on hover
                                                },
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
                                            <Typography color="error" variant="caption">
                                                {errors.category}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>


                                <Grid size={8} sx={{ mt: 2 }}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-multiple-chip-label" sx={{
                                            "&.Mui-focused": {
                                                color: "#b71c1c", // Ensure label color changes when focused
                                            },
                                        }}>Disciplinas</InputLabel>
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
                                            sx={{
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c", // Change border color when focused
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c", // Change border color on hover
                                                },
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

                                <Grid size={4}>
                                    {/* <FormControlLabel
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
                                /> */}
                                </Grid>


                                <Grid size={8}>
                                    <Button href="/dashboard-admin-screen" variant="contained" fullWidth sx={{
                                        mt: 3, mb: 2, backgroundColor: 'grey', // Color de fondo gris
                                        '&:hover': {
                                            backgroundColor: 'darkgrey', // Color al pasar el mouse
                                        },
                                    }}>
                                        CANCELAR
                                    </Button>

                                </Grid>
                                <Grid size={4}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            mt: 3, mb: 2, backgroundColor: '#b71c1c', // Color de fondo rojo
                                            '&:hover': {
                                                backgroundColor: 'darkred', // Color al pasar el mouse
                                            },
                                        }}
                                    >
                                        REGISTRAR SOCIO
                                    </Button>

                                </Grid>


                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Box>
    );
};

export default SignUpForm;

