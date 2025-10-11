import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Modal, FormControlLabel, Switch, Avatar, Box, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getAllCategoriesContext } from "../../Context/GetAllCategoriesContext"
import { getAllDisciplinesContext } from "../../Context/GetAllDisciplinesContext"
import { updateUserProfileContext } from "../../Context/UpdateUserProfileContext"
import { controlModalsContext } from '../../Context/ControModalsContext';


function getStyles(name: string, discipline: readonly string[], theme: Theme) {
    return {
        fontWeight: discipline.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface AddFamilyFormValues {
    name: string,
    lastName: string,
    birthDate: Dayjs
    dni: string,
    avatarURL: string,
    gender: string
    disciplines: object,
    category: string,
    full: boolean,
    applicationDate: Dayjs,
}


// Validación con Yup Family
const validationSchemaFamily = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
        .required("El campo es obligatorio"),
    lastName: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
        .required("El campo es obligatorio"),
    birthDate: Yup.date()
        .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
        .required("El campo es obligatorio"),
    dni: Yup.string()
        .matches(/^\d+$/, "El DNI debe contener solo números")
        .test(
            "longitud-dni",
            "El DNI debe tener entre 7 y 8 dígitos",
            (value) => value && value.length >= 7 && value.length <= 8
        )
        .required("El campo es obligatorio"),
    // category: Yup.string()
    //     .required("El campo es obligatorio"),
});

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddFamilyModal: React.FC = () => {

    const location = useLocation();
    const user = location.state;


    const { categories } = useContext(getAllCategoriesContext)
    const { disciplines } = useContext(getAllDisciplinesContext)
    const { setDocId, setFamilyUser } = useContext(updateUserProfileContext)
    const { openAdd, setOpenAdd } = useContext(controlModalsContext)

    const [discipline, setDiscipline] = React.useState<string[]>([]);
    const [disciplineFamily, setDisciplineFamily] = React.useState<string[]>([]);
    const [editMode] = React.useState<boolean>(true);

    const [full, setFull] = useState<boolean>(user.full); // Estado del toggle

    const handleOpenAdd = () => setOpenAdd((prevOpen: any) => !prevOpen);

    const genders = ["Masculino", "Femenino", "Otro"]

    useEffect(() => {
        if (user && user.id) {
            setDocId(user.id)
        }
    }, [user, setDocId])

    const theme = useTheme();

    useEffect(() => {
        if (user && user.disciplines) {
            setDiscipline(user.disciplines);
        }
    }, [user]);

    const handleToggleFull = () => {
        setFull(prev => !prev);
        console.log(full)
    }

    const handleFamilyDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const {
            target: { value },
        } = event;
        setDisciplineFamily(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmitFamily = (
        values: AddFamilyFormValues,
    ) => {
        const familyUser = {
            avatarURL: "",
            name: values.name,
            lastName: values.lastName,
            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
            dni: values.dni,
            gender: values.gender,
            disciplines: disciplineFamily,
            category: values.category,
            full: full,
            applicationDate: values.applicationDate ? dayjs(values.applicationDate).toDate() : null,
        };
        setFamilyUser(familyUser)
        // setEditMode(false);
        // console.log("FamilyUser", familyUser);
        // navigate("/home");
    };

    return (

        <Modal
            open={openAdd}
            onClose={handleOpenAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyle}>
                <Formik<AddFamilyFormValues>
                    // enableReinitialize={true}
                    initialValues={{
                        name: "",
                        lastName: "",
                        birthDate: null,
                        dni: "",
                        avatarURL: user.avatarURL || "",
                        gender: "",
                        disciplines: {},
                        category: "",
                        full: user.full,
                        applicationDate: dayjs(),
                    }}

                    validationSchema={validationSchemaFamily}
                    onSubmit={handleSubmitFamily}
                >
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form>
                            <Grid container columnSpacing={2} direction="row" size={12}>

                                {/* AVATAR */}
                                {/* <Box
                                                component={Card}
                                                elevation={1}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                    borderRadius: 1,
                                                    border: '1px solid rgba(240, 8, 8, 0.5)',
                                                    height: '39%',
                                                    mb: 3,
                                                    mt: 1
                                                }}
                                            >
                                                <Avatar alt="Avatar" src={user.avatar} sx={{ width: 120, height: 120, ml: 3, boxShadow: 1 }} />
                                            </Box> */}
                                {/* NAME */}
                                <TextField
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
                                    helperText={touched.name && errors.name ? errors.name : " "} // 
                                    sx={{ mt: 1 }}
                                    slotProps={{
                                        input: {
                                            sx: !editMode
                                                ? {} // No aplicar estilos si está deshabilitado
                                                : {
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                },
                                        },
                                        inputLabel: {
                                            sx: !editMode
                                                ? {}
                                                : {
                                                    "&.Mui-focused": {
                                                        color: "#b71c1c",
                                                    },
                                                },
                                        },
                                    }}
                                />
                                {/* LASTNAME */}
                                <TextField
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
                                            sx: !editMode
                                                ? {} // Si está deshabilitado, no aplica estilos de focus/hover
                                                : {
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                },
                                        },
                                        inputLabel: {
                                            sx: !editMode
                                                ? {}
                                                : {
                                                    "&.Mui-focused": {
                                                        color: "#b71c1c",
                                                    },
                                                },
                                        },
                                    }}
                                />
                                {/* BIRTHDATE */}
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']} sx={{ width: '100%' }} >
                                        {/* <DatePicker
                                            format="DD/MM/YYYY"
                                            sx={editMode ? {
                                                width: '100%',
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
                                            } : {
                                                width: '100%',
                                                "& .MuiInputLabel-root": {
                                                    color: "rgba(0, 0, 0, 0.38)", // Color típico para label deshabilitado
                                                },
                                            }}
                                            label="Fecha de Nacimiento"
                                            value={values.birthDate}
                                            onChange={(newValue) => {
                                                handleChange({ target: { name: 'birthDate', value: newValue } });
                                            }}
                                        /> */}
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            label="Fecha de Nacimiento"
                                            value={values.birthDate}
                                            onChange={(newValue) => {
                                                handleChange({ target: { name: 'birthDate', value: newValue } });

                                                if (newValue) {
                                                    const today = dayjs();
                                                    const age = today.diff(dayjs(newValue), 'year'); // calcula edad exacta

                                                    // Definimos la categoría según edad
                                                    const newCategory = age < 18 ? "Menor" : "Activo Adherente";

                                                    // Actualizamos el campo 'category' en Formik
                                                    setFieldValue("category", newCategory);
                                                } else {
                                                    setFieldValue("category", ""); // Si se borra la fecha, se limpia
                                                }
                                            }}
                                            sx={editMode ? {
                                                width: '100%',
                                                "& .MuiInputLabel-root": {
                                                    "&.Mui-focused": { color: "#b71c1c" },
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#b71c1c" },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#b71c1c" },
                                                },
                                            } : {
                                                width: '100%',
                                                "& .MuiInputLabel-root": { color: "rgba(0, 0, 0, 0.38)" },
                                            }}
                                        />



                                    </DemoContainer>
                                    {touched.birthDate && errors.birthDate ?
                                        <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                            {errors.birthDate as string}
                                        </Typography> : <span> &nbsp; </span>
                                    }
                                </LocalizationProvider>

                                <Grid container size={12}>
                                    {/* DNI */}
                                    <Grid size={6} >
                                        <TextField
                                            disabled={!editMode}
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
                                            sx={{ mt: 0 }}
                                            slotProps={{
                                                input: {
                                                    sx: editMode
                                                        ? {
                                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#b71c1c",
                                                            },
                                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#b71c1c",
                                                            },
                                                        }
                                                        : {},
                                                },
                                                inputLabel: {
                                                    sx: editMode
                                                        ? {
                                                            "&.Mui-focused": {
                                                                color: "#b71c1c",
                                                            },
                                                        }
                                                        : {},
                                                },
                                            }}
                                        />
                                    </Grid>
                                    {/* GENDER */}
                                    <Grid size={6} >
                                        <FormControl fullWidth sx={{ mb: 0, mt: 0 }}>
                                            <InputLabel
                                                id="demo-simple-select-label"
                                                error={touched.gender && Boolean(errors.gender)}
                                                sx={{
                                                    color: !editMode ? 'rgba(0, 0, 0, 0.38)' : undefined,
                                                    '&.Mui-focused': {
                                                        color: '#b71c1c',
                                                    },
                                                }}>Genero</InputLabel>
                                            <Select
                                                disabled={!editMode}
                                                labelId="gender-label"
                                                id="gender"
                                                name="gender"
                                                value={values.gender}
                                                onChange={(event) => {
                                                    handleChange({ target: { name: 'gender', value: event.target.value } }); // Correctly update Formik state
                                                }}
                                                onBlur={handleBlur}
                                                label="Género"
                                                sx={editMode ? {
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: touched.gender && errors.gender ? "#b71c1c" : undefined,
                                                    },
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c", // Change border color when focused
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c", // Change border color on hover
                                                    },
                                                } : null}

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
                                {/* DISCIPLINE */}
                                <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
                                    <InputLabel
                                        id="discipline-label"
                                        shrink={true}
                                        sx={{
                                            color: !editMode ? 'rgba(0, 0, 0, 0.38)' : undefined,
                                            '&.Mui-focused': {
                                                color: '#b71c1c',
                                            },
                                        }}
                                    >
                                        Disciplinas
                                    </InputLabel>
                                    <Select
                                        labelId="discipline-label"
                                        id="discipline-select"
                                        multiple
                                        disabled={!editMode}
                                        value={disciplineFamily}
                                        onChange={(event) => {
                                            handleFamilyDiscipline(event);
                                            handleChange({ target: { name: 'discipline', value: event.target.value } });
                                        }}
                                        sx={editMode ? {
                                            height: '56px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: !editMode ? 'rgba(0, 0, 0, 0.12)' : undefined,
                                            },
                                            '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(0, 0, 0, 0.12)',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#b71c1c',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#b71c1c',
                                            },
                                        } : { height: '56px' }}
                                        input={<OutlinedInput label="Disciplinas" id="discipline-select" notched={true} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {(selected as string[]).map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    // MenuProps={MenuProps}
                                    >
                                        {disciplines?.length > 0 ? (
                                            disciplines.map((item: any) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.name}
                                                    style={getStyles(item.name, disciplineFamily, theme)}
                                                >
                                                    <Checkbox checked={disciplineFamily.indexOf(item.name) > -1} />
                                                    <ListItemText primary={item.name || ""} />
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <p>Cargando disciplinas...</p>
                                        )}
                                    </Select>

                                </FormControl>

                                {/* CATEGORY */}
                                {/* <FormControl fullWidth variant="outlined" sx={{ mb: 0, mt: 4 }}>
                                    <InputLabel
                                        id="category-label"
                                        shrink={true}
                                        sx={{
                                            color: !editMode ? 'rgba(0, 0, 0, 0.38)' : undefined,
                                            '&.Mui-focused': { color: '#b71c1c' },
                                        }}
                                    >
                                        Categoria
                                    </InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category-select"
                                        value={values.category}
                                        label="Categoria"
                                        disabled={!editMode}
                                        onChange={(event) => {
                                            handleChange({ target: { name: 'category', value: event.target.value } });
                                        }}
                                        input={<OutlinedInput label="Categoria" notched={true} />}
                                        sx={
                                            editMode
                                                ? {
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#b71c1c',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#b71c1c',
                                                    },
                                                }
                                                : {}
                                        }
                                    >
                                        {categories?.length > 0 ? (
                                            categories.map(({ id, name }) => (
                                                <MenuItem key={id} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <p>Cargando Categorias...</p>
                                        )}
                                    </Select>
                                </FormControl> */}
                                <Grid container size={12}>
                                    <Grid display="flex" size={6} alignItems="center"  sx={{ mt: 3, mb: 0 }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Categoría"
                                                value={values.category + (full ? " - Pleno" : "")}
                                                slotProps={{
                                                    htmlInput: {
                                                        readOnly: true,
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid display="flex" size={6} alignItems="center"  sx={{ mt: 3, mb: 0 }}>
                                        <FormControlLabel
                                            control={<Switch checked={full} onChange={handleToggleFull} />}
                                            label="Pleno"
                                        />
                                    </Grid>
                                </Grid>

                                {/* BOTONES */}
                                <Grid container size={12}>
                                    <Grid size={6}>
                                        <Button onClick={handleOpenAdd}
                                            variant="contained" fullWidth sx={{
                                                mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                                '&:hover': {
                                                    backgroundColor: 'darkgrey', // Color al pasar el mouse
                                                },
                                            }}>
                                            CANCELAR
                                        </Button>
                                    </Grid>
                                    <Grid size={6}>
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
                                            GUARDAR SOCIO
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>

    );
};

export default AddFamilyModal;




