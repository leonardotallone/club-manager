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
import { Formik, Form, FormikHelpers, } from "formik";

import * as Yup from "yup";

import { useParams } from "react-router-dom";
import { getAllCategoriesContext } from "../../Context/GetAllCategoriesContext"
import { getAllDisciplinesContext } from "../../Context/GetAllDisciplinesContext"
import { getAllGendersContext } from "../../Context/GetAllGendersContext"
import { getAllUsersContext } from '../../Context/GetAllUsersContext';
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
    admin: boolean,

    disciplines: object,
    category: string,
    blockade: boolean,
    groupHead: boolean,
    familyGroup: object,
}




const SignUpFormUnique: React.FC = () => {

    const { categories } = useContext(getAllCategoriesContext)
    const { disciplines } = useContext(getAllDisciplinesContext)
    const { genders } = useContext(getAllGendersContext)
    const { allUsers } = useContext(getAllUsersContext)
    const { setSignUpUser } = useContext(signUpContext)

    const [discipline, setDiscipline] = React.useState<string[]>([]);
    const [familyGroupS, setFamilyGroupS] = React.useState<string[]>([]);

    const { type } = useParams();
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
    const handleFamilyGroup = (event: SelectChangeEvent<typeof familyGroupS>) => {
        const {
            target: { value },
        } = event;
        setFamilyGroupS(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // Validación con Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
            .required("El campo es requerido"),
        lastName: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
            .required("El campo es requerido"),
        birthDate: Yup.date()
            .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
            .required("El campo es requerido"),
        gender: Yup.string()
            .required("El campo es requerido"),
        dni: Yup.string()
            .matches(/^\d+$/, "El DNI debe contener solo números")
            .test(
                "longitud-dni",
                "El DNI debe tener entre 7 y 8 dígitos",
                (value) => value && value.length >= 7 && value.length <= 8
            )
            .required("El campo es requerido"),
        address: Yup.string()
            .min(5, "La dirección debe tener como mínimo 5 caracteres")
            .required("El campo es requerido"),
        contactNumber: Yup.string()
            .matches(/^\+?\d{7,15}$/, "Número de contacto inválido")
            .required("El campo es requerido"),
        // discipline: Yup.array()
        //     .of(Yup.string().required("La disciplina es obligatoria"))
        //     .min(1, "Debes seleccionar al menos una disciplina")
        //     .required("El campo es obligatorio"),
        category: Yup.string()
            .required("El campo es requerido"),

        email: Yup.string()
            .when([], {
                is: () => type === "grouphead" || type === "unique",
                then: (schema) =>
                    schema
                        .required("El email es requerido")
                        .email("Dirección de correo electrónico inválida"),
                otherwise: (schema) => schema.notRequired(),
            }),
        familyGroup: Yup.array()
            .when([], {
                is: () => type === "grouphead",
                then: (schema) =>
                    schema
                        .required("El campo es requerido para grouphead o unique")
                        .min(1, "Debes seleccionar al menos un socio"),
                otherwise: (schema) => schema.notRequired(),
            }),
    });

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
            gender: values.gender,

            email: values.email,
            admin: false,

            disciplines: discipline,
            category: values.category,
            blockade: false,
            groupHead: type === "grouphead" ? true : false,
            familyGroup: familyGroupS,
        };
        console.log(user)
        setSignUpUser(user)
        navigate("/");
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
                width: "100%",
                height: "auto",
            }}
        >
            <Container maxWidth="xl"  >

                <Formik<SignUpFormValues>
                    initialValues={{

                        name: "",
                        lastName: "",
                        address: "",
                        birthDate: null,
                        dni: "",
                        contactNumber: "",
                        avatarURL: "",
                        gender: "",


                        email: "",
                        admin: false,



                        disciplines: [],
                        category: "",
                        blockade: false,
                        groupHead: false,
                        familyGroup: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}

                >
                    {({ handleChange, handleBlur, values, errors, touched, }) => (
                        <Form>
                            <Grid container columnSpacing={2} direction="row">
                                {/* Columna IZQUIERDA */}
                                <Grid container direction="column" size={4}>

                                    {/* AVATAR */}
                                    <Box
                                        component={Card}
                                        elevation={1}
                                        sx={{
                                            display: "flex",
                                            alignItems: 'center',
                                            // backgroundColor: 'rgba(245, 186, 206, 1)',
                                            backgroundColor: 'white',
                                            borderRadius: 1,
                                            border: '1px solid rgba(240, 8, 8, 0.5)',
                                            height: '39%',
                                            mb: 3,
                                            mt: 1
                                        }}
                                    >
                                        <Avatar alt="Avatar" src={avatar1} sx={{ width: 120, height: 120, ml: 3, boxShadow: 1 }} />
                                    </Box>

                                    {/* NAME */}
                                    <TextField
                                        // margin="normal"
                                        // autoFocus
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
                                {/* Columna CENTRO */}
                                <Grid container direction="column" size={4}>
                                    <Grid container  >
                                        {/* BIRTHDATE */}
                                        <Grid size={6} >
                                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                <DemoContainer components={['DatePicker']} sx={{ width: '100%' }} >

                                                    <DatePicker
                                                        format="DD/MM/YYYY"
                                                        label="Fecha de Nacimiento"
                                                        value={values.birthDate} // This should now be a Dayjs object
                                                        onChange={(newValue) => {
                                                            handleChange({ target: { name: 'birthDate', value: newValue } }); // Update Formik state
                                                        }}
                                                        slotProps={{
                                                            textField: {
                                                                onBlur: () => handleBlur({ target: { name: 'birthDate' } }),
                                                                InputLabelProps: {
                                                                    style: {
                                                                        color: touched.birthDate && errors.birthDate ? "#b71c1c" : undefined,
                                                                    },
                                                                },
                                                                sx: {
                                                                    width: '100%',
                                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                                        borderColor: touched.birthDate && errors.birthDate ? "#b71c1c" : undefined,
                                                                    },
                                                                    "& .MuiInputLabel-root": {
                                                                        "&.Mui-focused": {
                                                                            color: "#b71c1c",
                                                                        },
                                                                    },
                                                                    "& .MuiOutlinedInput-root": {
                                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                            borderColor: "#b71c1c",
                                                                        },
                                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                                            borderColor: "#b71c1c",
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </DemoContainer>
                                                {touched.birthDate && errors.birthDate ?
                                                    <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                        {errors.birthDate as string}
                                                    </Typography> : <span> &nbsp; </span>
                                                }
                                            </LocalizationProvider>
                                        </Grid>
                                        {/* GENDER */}
                                        <Grid size={6} >
                                            <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
                                                <InputLabel
                                                    id="demo-simple-select-label"
                                                    error={touched.gender && Boolean(errors.gender)}
                                                    sx={{
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c", // Ensure label color changes when focused

                                                        },
                                                    }}>Genero</InputLabel>
                                                <Select
                                                    labelId="gender-label"
                                                    id="gender"
                                                    name="gender"
                                                    value={values.gender}
                                                    onChange={(event) => {
                                                        handleChange({ target: { name: 'gender', value: event.target.value } }); // Correctly update Formik state
                                                    }}
                                                    onBlur={handleBlur}
                                                    label="Género"
                                                    sx={{
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: touched.gender && errors.gender ? "#b71c1c" : undefined,
                                                        },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c", // Change border color when focused
                                                        },
                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c", // Change border color on hover
                                                        },
                                                    }}

                                                >
                                                    {genders?.length > 0 ? (
                                                        genders.map((name) => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <p>Cargando Generos...</p>
                                                    )}

                                                </Select>
                                                {touched.gender && errors.gender ?
                                                    <Typography color="error" variant="caption">
                                                        {errors.gender}
                                                    </Typography> : <span> &nbsp; </span>
                                                }
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    {/* DNI */}
                                    <TextField
                                        // margin="none"
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
                                        sx={{ mt: -2 }}
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

                                <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                    <Grid container size={12} >
                                        {/* DISCIPLINE */}
                                        <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
                                            <InputLabel
                                                id="demo-multiple-chip-label"
                                                sx={{
                                                    "&.Mui-focused": {
                                                        color: "#b71c1c", // Ensure label color changes when focused
                                                    },
                                                }}>Disciplinas</InputLabel>
                                            <Select

                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple

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
                                                {disciplines?.length > 0 ? (
                                                    disciplines.map((item: any) => (
                                                        <MenuItem
                                                            key={item.id}
                                                            value={item.name}
                                                            style={getStyles(item.name, discipline, theme)}
                                                        >
                                                            <Checkbox checked={discipline.indexOf(item.name) > -1} />
                                                            <ListItemText primary={item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} />
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <p>Cargando disciplinas...</p>
                                                )}

                                            </Select>
                                            {touched.disciplines && errors.disciplines ?
                                                <Typography color="error" variant="caption" >
                                                    {/* {errors.disciplines} */}
                                                </Typography> : <span> &nbsp; </span>
                                            }
                                        </FormControl>
                                        {/* CATEGORIES */}
                                        <Grid size={12} >
                                            <FormControl fullWidth sx={{ mb: 0, mt: 0 }}>
                                                <InputLabel
                                                    error={touched.category && Boolean(errors.category)}
                                                    id="demo-simple-select-label"
                                                    sx={{
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c", // Ensure label color changes when focused
                                                        },
                                                    }}>Categoria</InputLabel>
                                                <Select


                                                    name="category"
                                                    onBlur={handleBlur}

                                                    sx={{
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: touched.category && errors.category ? "#b71c1c" : undefined,
                                                        },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c", // Change border color when focused
                                                        },
                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c", // Change border color on hover
                                                        },
                                                    }}


                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={values.category} // Bind Formik value
                                                    label="Categoria" // Update label to match the field
                                                    onChange={(event) => {
                                                        handleChange({ target: { name: 'category', value: event.target.value } }); // Correctly update Formik state
                                                    }}

                                                >

                                                    {categories?.length > 0 ? (
                                                        categories.map(({ id, name }) => (
                                                            <MenuItem key={id} value={name}>
                                                                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
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
                                        {/* EMAIL */}
                                        {type !== "minor" ?
                                            <TextField
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
                                            /> : null}

                                        {/* LISTA DE SOCIOS */}
                                        {type === "grouphead" ? (
                                            <FormControl
                                                error={Boolean(touched.familyGroup && errors.familyGroup)}
                                                fullWidth
                                                sx={{ mb: 0, mt: 1 }}
                                            >
                                                <InputLabel
                                                    id="demo-multiple-chip-label"
                                                    sx={{
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c", // Color cuando está enfocado
                                                        },
                                                    }}
                                                >
                                                    Lista de Socios
                                                </InputLabel>
                                                <Select
                                                    name="familyGroup"
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={familyGroupS} // Aquí guardas un array de dni
                                                    onChange={(event) => {
                                                        // event.target.value es un array de dni seleccionados
                                                        handleFamilyGroup(event); // tu función para manejar selección
                                                        handleChange({ target: { name: "familyGroup", value: event.target.value } }); // para Formik u otro form handler
                                                    }}
                                                    onBlur={handleBlur}
                                                    sx={{
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor:
                                                                touched.familyGroup && errors.familyGroup ? "#b71c1c" : undefined,
                                                        },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c",
                                                        },
                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#b71c1c",
                                                        },
                                                    }}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Lista de Socios" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                            {/* selected es un array de dni, buscamos el usuario para mostrar apellido y nombre */}
                                                            {selected.map((dni) => {
                                                                const user = allUsers.find((u) => u.dni === dni);
                                                                return <Chip key={dni} label={user ? `${user.lastName} ${user.name}` : dni} />;
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {allUsers?.length > 0 ? (
                                                        allUsers.map((user: any) => (
                                                            <MenuItem
                                                                key={user.dni}
                                                                value={user.dni} // guardamos el dni
                                                                style={getStyles(user.dni, familyGroupS, theme)} // pasamos dni para estilos
                                                            >
                                                                <Checkbox checked={familyGroupS.indexOf(user.dni) > -1} />
                                                                <ListItemText primary={`${user.lastName} ${user.name}`} />
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <p>Cargando Socios...</p>
                                                    )}
                                                </Select>
                                                {touched.familyGroup && errors.familyGroup ? (
                                                    <Typography color="error" variant="caption">
                                                        Debe seleccionar al menos un socio
                                                    </Typography>
                                                ) : (
                                                    <span> &nbsp; </span>
                                                )}
                                            </FormControl>
                                        ) : null}

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
        </Box >
    );
};

export default SignUpFormUnique;

