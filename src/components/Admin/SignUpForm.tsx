import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FormControlLabel, Avatar, Box, Paper, Card, Container, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';

import avatar1 from "../../assets/avatars/1.jpg";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { getAllCategoriesContext } from "../../Context/GetAllCategoriesContext"
import { signUpContext } from "../../Context/SignUpContext"


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
const usuario =
{
    name: "Catalina",
    lastName: "Tallone",
    email: "catalina@gmail.com",
    dni: "56.883.870",
    birthdate: "11/02/2018",
    address: "Alvarez Rodriguez 231",
    category: "Activo",
    group: true,
    groupHead: false,
    countState: "Sin Deuda",
    avatar: avatar1,
    contactNumber: "+54 236 4321985",
    discipline: "Hockey Femenino",
    blockade: false,
}

const names = [
    'Fútbol',
    'Tenis',
    'Hockey',
    'Natación',
    "Gym"
];

const sociosList = [
    "Leonardo Tallone",
    'Catalina Tallone',
    'Salvador Tallone',
    'Victoria Semino',
    "Federico Palmieri",
    "Bruno, Barbieri",
    "Catalina, Gazola",
];

function getStyles(name: string, discipline: readonly string[], theme: Theme) {
    return {
        fontWeight: discipline.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface SignUpFormValues {
    name: string;
    lastName: string;
    address: string;
    birthDate: Dayjs
    dni: string;
    contactNumber: string;
    avatarURL: string,
    gender: string;
  
    email: string;
    id: string,
    admin: boolean,
    password: string;
  
    disciplines: object,
    category: object,
    blockade: boolean,
    groupHead: boolean,
    familyGroup: object,
}

// Validación con Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
        .required("El campo es obligatorio"),
    lastName: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
        .required("El campo es obligatorio"),
    email: Yup.string()
        .email("Dirección de correo electrónico inválida")
        .required("El campo es obligatorio"),
    // password: Yup.string()
    //     .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    //     .required("El campo es obligatorio"),
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
    category: Yup.string()
        .required("El campo es obligatorio"),
    discipline: Yup.array()
        .of(Yup.string().required("La disciplina es obligatoria"))
        .min(1, "Debes seleccionar al menos una disciplina")
        .required("El campo es obligatorio"),
});


const SignUpForm: React.FC = () => {

    const { categorias } = useContext(getAllCategoriesContext)
    const { setSignUpUser } = useContext(signUpContext)

    const [discipline, setDiscipline] = React.useState<string[]>([]);
    const [socios, setSocios] = React.useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [isGroupHeadActive, setIsGroupHeadActive] = useState(false);



    const handleGroupHeadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsGroupHeadActive(event.target.checked);
    };

    //   Limpiar campos cuando se desactiva el checkbox

    useEffect(() => {
        if (!isGroupHeadActive) {
            setSocios([]); // Limpia la lista de socios
            setEmail("");  // Limpia el campo de correo
        }
    }, [isGroupHeadActive]);

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
    const handleSocios = (event: SelectChangeEvent<typeof socios>) => {
        const {
            target: { value },
        } = event;
        setSocios(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (
        values: SignUpFormValues,
        formikHelpers: FormikHelpers<SignUpFormValues>
    ) => {
        const user = {
            name: values.name,
            lastName: values.lastName,
            address: values.address,
            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
            dni: values.dni,
            contactNumber: values.contactNumber,
            avatarURL: "",
            gender: "",

            email: values.email,
            password: values.password,
            admin:false,

            group: values.group,
            groupHead: values.groupHead === "true" ? true : false,
            countState: values.countState,
            avatar: null,
            category: values.category,
            disciplines: values.disciplines,
            blockade: values.blockade,
        };
        console.log(user);
        // navigate("/home");
    };

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                // px: 4,
                py: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width: "auto",
                height: "auto",
            }}
        >
            <Container maxWidth="xl"  >

                <Formik<SignUpFormValues>
                    initialValues={{
                        // id:"",
                        name: "",
                        lastName: "",
                        email: "",
                        password: "",
                        dni: "",
                        birthDate: null,
                        address: "",
                        contactNumber: "",
                        group: [],
                        groupHead: "",
                        countState: "Sin Deuda",
                        avatar: null,
                        category: "",
                        discipline: [],
                        blockade: false
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, }) => (
                        <Form>
                            <Grid container columnSpacing={2} direction="row">
                                <Grid container direction="column" size={4}>
                                    <Grid size={12} >
                                        {/* AVATAR */}
                                        <Box
                                            component={Card}
                                            elevation={1}
                                            sx={{
                                                display: "flex",
                                                alignItems: 'center',
                                                // backgroundColor: 'rgba(245, 186, 206, 1)',
                                                backgroundColor: 'rgba(71, 71, 71, 0.33)',
                                                borderRadius: 1,
                                                border: '1px solid rgba(240, 8, 8, 0.5)',
                                                height: '45%',
                                                mb: 3,
                                            }}
                                        >
                                            <Avatar alt="Avatar" src={usuario.avatar} sx={{ width: 120, height: 120, ml: 3, boxShadow: 1 }} />
                                        </Box>
                                        {/* NAME */}
                                        <TextField
                                            // margin="normal"
                                            // autoFocus
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
                                            // helperText={touched.name && errors.name}
                                            helperText={touched.name && errors.name ? errors.name : " "} // 
                                            sx={{ mt: 1 }}
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
                                        {/* LASTNAME */}
                                        <TextField
                                            // margin="normal"
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
                                            helperText={touched.lastName && errors.lastName ? errors.lastName : " "} // 
                                            sx={{ mt: 1 }}
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
                                </Grid>

                                <Grid container direction="column" size={4}>
                                    <Grid size={12} >
                                        {/* EMAIL */}
                                        <TextField
                                            // autoFocus
                                            // margin="normal"
                                            required={isGroupHeadActive}
                                            disabled={!isGroupHeadActive}
                                            fullWidth
                                            id="email"
                                            label="Dirección de correo"
                                            name="email"
                                            autoComplete="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email ? errors.email : " "} // 
                                            // sx={{ mb: -1 }}
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
                                        {/* DNI */}
                                        <TextField
                                            // margin="none"
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
                                            helperText={touched.dni && errors.dni ? errors.dni : " "}
                                            sx={{ mt: 1 }}
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
                                        {/* ADDRESS */}
                                        <TextField
                                            // margin="none"
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
                                            helperText={touched.address && errors.address ? errors.address : " "}
                                            sx={{ mt: 1 }}
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
                                        {/* CONTACT NUMBER */}
                                        <TextField
                                            // margin="normal"
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
                                            helperText={touched.contactNumber && errors.contactNumber ? errors.contactNumber : " "}
                                            sx={{ mt: 1 }}
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
                                </Grid>








                                <Grid container direction="column" size={4} sx={{ mt: -1 }}>
                                    <Grid container size={12} >
                                        {/* BIRTHDATE */}
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DatePicker']} sx={{ width: '100%' }} >
                                                <DatePicker
                                                    format="DD/MM/YYYY"
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
                                            {touched.birthDate && errors.birthDate ?
                                                <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                    {errors.birthDate as string}
                                                </Typography> : <span> &nbsp; </span>
                                            }
                                        </LocalizationProvider>
                                        {/* DISCIPLINE */}
                                        <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
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
                                                    height: '56px',
                                                }}
                                                input={<OutlinedInput id="select-multiple-chip" label="Disciplinas" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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

                                            </Select>
                                            {touched.discipline && errors.discipline ?
                                                <Typography color="error" variant="caption" >
                                                    {errors.discipline}
                                                </Typography> : <span> &nbsp; </span>
                                            }

                                        </FormControl>
                                        {/* GRUPO Y CATEGORIA */}
                                        <Grid container columnSpacing={2} sx={{ mb: 0, mt: 1 }} size={12}>
                                            <Grid size={6} >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={isGroupHeadActive}
                                                            onChange={handleGroupHeadChange}
                                                        />
                                                    }
                                                    label="Cabeza de Grupo"
                                                />

                                                {/* <FormControl fullWidth sx={{ mb: 0 }}>
                                                    <InputLabel id="group-head-label" sx={{
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c", // Ensure label color changes when focused
                                                        },
                                                    }}>Cabeza de Grupo</InputLabel>
                                                    <Select

                                                        labelId="group-head-label"
                                                        id="group-head-select"
                                                        value={values.groupHead} // Bind Formik value
                                                        label="Cabeza de Grupo" // Update label to match the field
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'groupHead', value: event.target.value } }); // Correctly update Formik state
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

                                                        <MenuItem value={"true"}>Si</MenuItem>
                                                        <MenuItem value={"false"}>No</MenuItem>


                                                    </Select>
                                                    {touched.groupHead || errors.groupHead ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.groupHead}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl> */}
                                            </Grid>
                                            <Grid size={6} >



                                                <FormControl fullWidth sx={{ mb: 0, mt: 0 }}>
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

                                                        {categorias?.length > 0 ? (
                                                            categorias.map(({ id, descripcion }) => (
                                                                <MenuItem key={id} value={id}>
                                                                    {descripcion}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <p>Cargando Categorias...</p>
                                                        )}

                                                    </Select>
                                                    {touched.category && errors.category ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.category}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                            </Grid>


                                        </Grid>
                                        {/* LISTA DE SOCIOS */}
                                        <FormControl fullWidth sx={{ mt: 0.9 }}>
                                            <InputLabel id="demo-multiple-chip-label" sx={{
                                                "&.Mui-focused": {
                                                    color: "#b71c1c", // Ensure label color changes when focused
                                                },
                                            }}>Lista de Socios</InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                required={isGroupHeadActive}
                                                disabled={!isGroupHeadActive}
                                                value={socios}
                                                onChange={(event) => {
                                                    handleSocios(event);
                                                    handleChange({ target: { name: 'group', value: event.target.value } });
                                                }}
                                                sx={{
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c", // Change border color when focused
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c", // Change border color on hover
                                                    },
                                                    height: '56px',
                                                }}
                                                input={<OutlinedInput id="select-multiple-chip" label="Lista de Socios" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: '100%' }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {sociosList.map((name) => (
                                                    <MenuItem key={name} value={name} style={getStyles(name, socios, theme)}>
                                                        <Checkbox checked={socios.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                            {touched.discipline && errors.discipline ?
                                                <Typography color="error" variant="caption" >
                                                    {errors.discipline}
                                                </Typography> : <span> &nbsp; </span>
                                            }
                                        </FormControl>


                                    </Grid>
                                </Grid>


                                {/* BOTONES */}
                                <Grid size={8}>
                                    <Button href="/dashboard-admin-screen" variant="contained" fullWidth sx={{
                                        mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
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
                                            mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo rojo
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

