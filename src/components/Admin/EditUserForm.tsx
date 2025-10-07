import React, { useEffect,  useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Avatar, Box, Paper, Card, Container, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';

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
import { removeUserContext } from "../../Context/RemoveUserContext"




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

    name: string,
    lastName: string,
    address: string,
    birthDate: Dayjs
    dni: string,
    contactNumber: string,
    avatarURL: string,
    gender: string
    email: string,
    admin: boolean,
    disciplines: object,
    category: string,
    blockade: boolean,
    familyGroup: object,
    applicationDate: Dayjs,
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
    applicationDate: Dayjs,
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
    // category: Yup.string()
    //     .required("El campo es obligatorio"),
});

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



const EditUserForm: React.FC = () => {

    const location = useLocation();
    const user = location.state;

    console.log("IN EDITON USER", user)
    const { categories } = useContext(getAllCategoriesContext)
    const { disciplines } = useContext(getAllDisciplinesContext)
    const { setUpdateUserData, setDocId, setFamilyUser } = useContext(updateUserProfileContext)
    const { setUserConsent } = useContext(removeUserContext)

    const [discipline, setDiscipline] = React.useState<string[]>([]);
    const [disciplineFamily, setDisciplineFamily] = React.useState<string[]>([]);
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [lockUser, setLockUser] = React.useState<boolean>(user.blockade);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const genders = ["Masculino", "Femenino", "Otro"]

    const familyGroupNames = user.familyGroup
        .map((member: { name: any; lastName: any; }) => `${member.name} ${member.lastName}`)
        .join(", ");


    useEffect(() => {
        if (user && user.id) {
            setDocId(user.id)
        }
    }, [user, setDocId])

    const theme = useTheme();
    const navigate = useNavigate();

    const handleEditMode = () => {
        setEditMode(prevEditMode => !prevEditMode);
    }
    const handleLockUser = (event: any) => {
        event.preventDefault();
        setLockUser(prevEditMode => !prevEditMode);
    }

    const handleRemoveUser = () => {
        setUserConsent(true);
    }

    useEffect(() => {
        if (user && user.disciplines) {
            setDiscipline(user.disciplines);
        }
    }, [user]);


    const handleDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const {
            target: { value },
        } = event;
        setDiscipline(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleFamilyDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const {
            target: { value },
        } = event;
        setDisciplineFamily(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (
        values: SignUpFormValues,
    ) => {
        const editedUser = {
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
            blockade: lockUser,

            familyGroup: values.familyGroup,
            applicationDate: values.applicationDate ? dayjs(values.applicationDate).toDate() : null,

        };
        setUpdateUserData(editedUser)
        // setEditMode(false);
        console.log("SUBMITED USER", editedUser);
        // navigate("/home");
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
            applicationDate: values.applicationDate ? dayjs(values.applicationDate).toDate() : null,
        };
        setFamilyUser(familyUser)
        // setEditMode(false);
        // console.log("FamilyUser", familyUser);
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
                py: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width: "100%",
                height: "auto",
            }}
        >


            <Container maxWidth="xl"  >

                <Formik<SignUpFormValues>
                    enableReinitialize={true}
                    initialValues={{
                        name: user.name || "",
                        lastName: user.lastName || "",
                        address: user.address || "",
                        birthDate: user.birthDate?.seconds ? dayjs(user.birthDate.seconds * 1000) : dayjs(),
                        dni: user.dni || "",
                        contactNumber: user.contactNumber || "",
                        avatarURL: user.avatarURL || "",
                        gender: user.gender || "",
                        email: user.email || "",
                        admin: false,
                        disciplines: user.disciplines || {},
                        category: categories?.find((c: { name: string }) => c.name === user.category)?.name || "",

                        blockade: lockUser,
                        familyGroup: familyGroupNames || [],
                        applicationDate: user.applicationDate?.seconds ? dayjs(user.applicationDate.seconds * 1000) : dayjs(),
                    }}

                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, }) => (
                        <Form>
                            <Grid container columnSpacing={2} direction="row" size={12}>
                                {/* Columna IZQUIERDA */}
                                <Grid container direction="column" size={4}>
                                    <Grid size={12} >
                                        {/* AVATAR */}
                                        <Box
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
                                        </Box>
                                        {/* NAME */}
                                        <TextField
                                            disabled={!editMode}
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
                                            disabled={!editMode}
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
                                    </Grid>
                                </Grid>
                                {/* Columna CENTRO */}
                                <Grid container direction="column" size={4}>
                                    <Grid container >
                                        {/* BIRTHDATE */}
                                        <Grid size={6} >
                                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                <DemoContainer components={['DatePicker']} sx={{ width: '100%' }} >
                                                    <DatePicker
                                                        disabled={!editMode}
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

                                    {/* DNI */}
                                    <TextField
                                        // margin="none"
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
                                        sx={{ mt: -2.8 }}
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

                                    {/* ADDRESS */}
                                    <TextField
                                        disabled={!editMode}
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
                                    {/* CONTACT NUMBER */}
                                    <TextField
                                        // margin="normal"
                                        disabled={!editMode}

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
                                {/* Columna DERECHA */}
                                <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                    <Grid container size={12} >
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
                                                value={discipline}
                                                onChange={(event) => {
                                                    handleDiscipline(event);
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
                                                            {/* <ListItemText primary={item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} /> */}
                                                            <ListItemText primary={item.name || ""} />
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <p>Cargando disciplinas...</p>
                                                )}
                                            </Select>
                                            {touched.disciplines && errors.disciplines ? (
                                                <Typography color="error" variant="caption">
                                                    {typeof errors.disciplines === "string" ? errors.disciplines : JSON.stringify(errors.disciplines)}
                                                </Typography>
                                            ) : (
                                                <span>&nbsp;</span>
                                            )}
                                        </FormControl>

                                        <Grid size={12} >
                                            {/* CATEGORY */}
                                            <FormControl fullWidth sx={{ mb: 0, mt: -0.8 }}>
                                                <InputLabel
                                                    id="demo-simple-select-label"
                                                    shrink={true} // Forzar que el label esté siempre flotando
                                                    sx={{
                                                        color: !editMode ? 'rgba(0, 0, 0, 0.38)' : undefined, // Color gris claro cuando está deshabilitado
                                                        '&.Mui-focused': {
                                                            color: '#b71c1c', // Color rojo cuando está enfocado
                                                        },
                                                    }}
                                                >
                                                    Categoria
                                                </InputLabel>
                                                <Select
                                                    disabled={!editMode}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={values.category}
                                                    label="Categoria" // Importante para que el notch y label funcionen bien
                                                    onChange={(event) => {
                                                        handleChange({ target: { name: 'category', value: event.target.value } });
                                                    }}

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
                                                {touched.category && errors.category ? (
                                                    <Typography color="error" variant="caption">
                                                        {errors.category}
                                                    </Typography>
                                                ) : (
                                                    <span> &nbsp; </span>
                                                )}
                                            </FormControl>
                                            {/* EMAIL */}
                                            <TextField
                                                disabled
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
                                                sx={{ mt: 0.85 }}
                                                slotProps={editMode ? {
                                                    input: {
                                                        sx: editMode
                                                            ? {
                                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                    borderColor: "#b71c1c",
                                                                },
                                                            }
                                                            : {},
                                                    },
                                                    inputLabel: {
                                                        sx: !editMode
                                                            ? {
                                                                "&.Mui-focused": {
                                                                    color: "#b71c1c",
                                                                },
                                                            }
                                                            : {},
                                                    },
                                                } : null}
                                            />



                                            {/* FAMILY GROUP */}
                                            <TextField
                                                disabled
                                                fullWidth
                                                id="familyGroup"
                                                label="Grupo Familiar"
                                                name="familyGroup"
                                                autoComplete="familyGroup"
                                                value={values.familyGroup}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email ? errors.email : " "} // 
                                                sx={{ mt: 0.85 }}
                                                slotProps={editMode ? {
                                                    input: {
                                                        sx: editMode
                                                            ? {
                                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                    borderColor: "#b71c1c",
                                                                },
                                                            }
                                                            : {},
                                                    },
                                                    inputLabel: {
                                                        sx: !editMode
                                                            ? {
                                                                "&.Mui-focused": {
                                                                    color: "#b71c1c",
                                                                },
                                                            }
                                                            : {},
                                                    },
                                                } : null}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* BOTONES */}
                                <Grid size={4}>
                                    {user.admition === false ?
                                        <Button href="/admin-applications" variant="contained" fullWidth sx={{
                                            mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                            '&:hover': {
                                                backgroundColor: 'darkgrey', // Color al pasar el mouse
                                            },
                                        }}>
                                            VOLVER
                                        </Button> :
                                        <Button href="/admin-users-list" variant="contained" fullWidth sx={{
                                            mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                            '&:hover': {
                                                backgroundColor: 'darkgrey', // Color al pasar el mouse
                                            },
                                        }}>
                                            CANCELAR
                                        </Button>}
                                </Grid>


                                <Grid container size={4}>
                                    <Grid size={6}>
                                        {user.blockade === false ?
                                            <Button href="/dashboard-admin-screen" variant="contained" fullWidth sx={{
                                                mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo gris
                                                '&:hover': {
                                                    backgroundColor: 'darkred', // Color al pasar el mouse
                                                },
                                            }}
                                                onClick={handleLockUser}
                                                disabled={!editMode}
                                            >
                                                BLOQUEAR SOCIO
                                            </Button> :
                                            <Button href="/dashboard-admin-screen" variant="contained" fullWidth sx={{
                                                mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                                '&:hover': {
                                                    backgroundColor: 'darkgrey', // Color al pasar el mouse
                                                },
                                            }}
                                                onClick={handleLockUser}
                                                disabled={!editMode}
                                            >
                                                DESBLOQUEAR SOCIO
                                            </Button>}
                                    </Grid>
                                    <Grid size={6}>
                                        <Button variant="contained" fullWidth sx={{
                                            mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo gris
                                            '&:hover': {
                                                backgroundColor: 'darkred', // Color al pasar el mouse
                                            },
                                        }}
                                            startIcon={<DeleteIcon sx={{ fontSize: 1, color: "grey" }} />}
                                            onClick={handleRemoveUser}
                                            disabled={!editMode}
                                        >

                                            <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none', mr: 1 }}>
                                                ELIMINAR SOCIO
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>



                                <Grid size={4}>

                                    {!editMode ?
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo rojo
                                                '&:hover': {
                                                    backgroundColor: 'darkgrey', // Color al pasar el mouse
                                                },
                                            }}
                                            onClick={handleEditMode}

                                        >
                                            EDITAR SOCIO
                                        </Button> : null}
                                    {editMode ? <>
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
                                        // onClick={handleEditMode}
                                        >
                                            GUARDAR CAMBIOS
                                        </Button>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={handleOpen}
                                            sx={{
                                                mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo rojo
                                                '&:hover': {
                                                    backgroundColor: 'darkred', // Color al pasar el mouse
                                                },
                                            }}>AGREGAR SOCIO</Button>
                                    </> : null}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>



            <Modal
                open={open}
                onClose={handleClose}
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
                            applicationDate: dayjs(),
                        }}

                        validationSchema={validationSchemaFamily}
                        onSubmit={handleSubmitFamily}
                    >
                        {({ handleChange, handleBlur, values, errors, touched, }) => (
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
                                        disabled={!editMode}
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
                                        disabled={!editMode}
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
                                            <DatePicker
                                                disabled={!editMode}
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
                                            MenuProps={MenuProps}
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
                                    <FormControl fullWidth variant="outlined" sx={{ mb: 0, mt: 4 }}>
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
                                    </FormControl>

                                    {/* BOTONES */}
                                    <Grid container size={12}>
                                        <Grid size={6}>
                                            <Button onClick={handleClose}
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




        </Box >
    );
};

export default EditUserForm;




