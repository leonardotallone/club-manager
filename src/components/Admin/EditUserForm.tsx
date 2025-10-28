import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    SelectChangeEvent,
    Chip,
    ListItemText,
    Checkbox,
    Tooltip,
    IconButton,
    Switch,
    FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getAllCategoriesContext } from "../../Context/GetAllCategoriesContext";
import { getAllDisciplinesContext } from "../../Context/GetAllDisciplinesContext";
import { updateUserProfileContext } from "../../Context/UpdateUserProfileContext";
import { controlModalsContext } from "../../Context/ControModalsContext";

interface SignUpFormValues {
    name: string;
    lastName: string;
    address: string;
    birthDate: Dayjs | null;
    dni: string;
    contactNumber: string;
    avatarURL: string;
    gender: string;
    email: string;
    admin: boolean;
    disciplines: string[];
    category: string;
    full: boolean;
    blockade: boolean;
    familyGroup: string;
    applicationDate: Dayjs | null;
}

type EditUserFormProps = {
    user: any;
    mode?: "admin" | "user";
    onClose?: () => void;
};

const validationSchema = Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    lastName: Yup.string().required("Campo obligatorio"),
    dni: Yup.string().matches(/^\d+$/, "Solo números").required("Campo obligatorio"),
    contactNumber: Yup.string().required("Campo obligatorio"),
});

const ensureStringArray = (v: any): string[] =>
    Array.isArray(v) ? v : typeof v === "string" ? [v] : [];

const EditUserForm: React.FC<EditUserFormProps> = ({ user, mode = "user", onClose }) => {
    const { categories } = useContext(getAllCategoriesContext);
    const { disciplines } = useContext(getAllDisciplinesContext);
    const { setUpdateUserData, setDocId } = useContext(updateUserProfileContext);
    const { setOpenAdd, setOpenEdit } = useContext(controlModalsContext);

    const navigate = useNavigate();
    const isAdmin = mode === "admin";

    const [discipline, setDiscipline] = useState<string[]>(ensureStringArray(user?.disciplines));
    const [lockUser, setLockUser] = useState<boolean>(!!user?.blockade);
    const [full, setFull] = useState<boolean>(!!user?.full);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const genders = ["Masculino", "Femenino", "Otro"];

    useEffect(() => {
        if (user?.id) setDocId(user.id);
    }, [user, setDocId]);

    const handleLockUser = () => {
        if (!isAdmin) return;
        setLockUser((prev) => !prev);
        setHasChanges(true);
    };

    //   const handleDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
    //     const { value } = event.target;
    //     const next = typeof value === "string" ? value.split(",") : (value as string[]);
    //     setDiscipline(next);
    //     setHasChanges(true);
    //   };

    const familyGroupNames = Array.isArray(user?.familyGroup)
        ? user.familyGroup.map((m: any) => `${m?.name ?? ""} ${m?.lastName ?? ""}`.trim()).join(", ")
        : "";



    const handleSubmit = (values: SignUpFormValues) => {
        const base: any = {
            ...values,
            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
            applicationDate: values.applicationDate ? dayjs(values.applicationDate).toDate() : null,
            disciplines: discipline,
            address: values.address,
            contactNumber: values.contactNumber,
            avatarURL: values.avatarURL,
            gender: values.gender,
        };

        if (isAdmin) {
            base.blockade = lockUser;                 // admin puede bloquear
            base.full = user?.full ?? false;          // admin NO modifica "full"
            base.category = values.category;          // admin puede cambiar categoría
            // base.admin: eliminado (no se toca)
        } else {
            base.blockade = user?.blockade ?? false;  // user no modifica bloqueo
            base.full = full;                          // user SÍ modifica "full"
            base.category = user?.category ?? values.category; // user no cambia categoría
            // base.admin: eliminado (no se toca)
        }

        setUpdateUserData(base);
        setHasChanges(false);
        if (onClose) onClose();
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: { xs: "flex-start", md: "center" },
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                borderRadius: { xs: 0, md: 3 },
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                width: "100%",
                height: { xs: "100vh", md: "auto" },
                overflowY: { xs: "auto", md: "visible" },
                WebkitOverflowScrolling: "touch",
                py: { xs: 3, md: 5 },
                px: { xs: 2, md: 0 },
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    pb: { xs: 10, md: 5 },
                    pt: { xs: 1, md: 2 },
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        textAlign: "center",
                        color: "#333",
                        letterSpacing: 0.5,
                    }}
                >
                    Edición de Usuario
                </Typography>

                {/* Controles superiores */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
                    {/* Solo admin: bloquear/desbloquear */}
                    {isAdmin && (
                        <Tooltip title={lockUser ? "Desbloquear usuario" : "Bloquear usuario"}>
                            <IconButton
                                onClick={handleLockUser}
                                sx={{
                                    border: `1px solid ${lockUser ? "crimson" : "green"}`,
                                    color: lockUser ? "crimson" : "green",
                                    borderRadius: "12px",
                                    p: 1,
                                    "&:hover": { bgcolor: lockUser ? "rgba(220,20,60,0.08)" : "rgba(0,128,0,0.08)" },
                                }}
                            >
                                {lockUser ? <LockRoundedIcon /> : <LockOpenRoundedIcon />}
                            </IconButton>
                        </Tooltip>
                    )}

                    {/* Solo usuario: toggle de Pleno */}
                    {!isAdmin && (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={full}
                                    onChange={(e) => {
                                        setFull(e.target.checked);
                                        setHasChanges(true);
                                    }}
                                />
                            }
                            label="Pleno"
                        />
                    )}
                </Box>

                <Formik<SignUpFormValues>
                    enableReinitialize
                    initialValues={{
                        name: user?.name ?? "",
                        lastName: user?.lastName ?? "",
                        address: user?.address ?? "",
                        birthDate: user?.birthDate?.seconds ? dayjs(user.birthDate.seconds * 1000) : null,
                        dni: user?.dni ?? "",
                        contactNumber: user?.contactNumber ?? "",
                        avatarURL: user?.avatarURL ?? "",
                        gender: user?.gender ?? "",
                        email: user?.email ?? "",
                        admin: !!user?.admin,
                        disciplines: ensureStringArray(user?.disciplines),
                        category:
                            categories?.find((c: any) => c?.name === user?.category)?.name ?? user?.category ?? "",
                        full: !!user?.full,
                        blockade: !!user?.blockade,
                        familyGroup: familyGroupNames,
                        applicationDate: user?.applicationDate?.seconds ? dayjs(user.applicationDate.seconds * 1000) : null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, dirty, isValid, setFieldValue }) => (
                        <Form onChange={() => !hasChanges && setHasChanges(true)}>
                            <Grid container spacing={4}>
                                {/* COLUMNA IZQUIERDA */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="name"
                                        label="Nombre"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name ? errors.name : " "}
                                        sx={{
                                            mb: -2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="lastName"
                                        label="Apellido/s"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName ? errors.lastName : " "}
                                        sx={{
                                            mt: 2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            label="Fecha de Nacimiento"
                                            value={values.birthDate}
                                            onChange={(newValue) => setFieldValue("birthDate", newValue)}
                                            slotProps={{
                                                textField: {
                                                    variant: "standard",
                                                    fullWidth: true,
                                                    sx: {
                                                        "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                                    },
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>

                                    <FormControl variant="standard" fullWidth sx={{ mt: 2.5 }}>
                                        <InputLabel id="gender-label">Género</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            name="gender"
                                            value={values.gender}
                                            onChange={handleChange}
                                        >
                                            {genders.map((g) => (
                                                <MenuItem key={g} value={g}>
                                                    {g}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        disabled
                                        name="email"
                                        label="Correo Electrónico"
                                        value={values.email}
                                        sx={{
                                            mt: 2.5,
                                            mb: -1.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />
                                </Grid>

                                {/* COLUMNA DERECHA */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="dni"
                                        label="DNI"
                                        value={values.dni}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.dni && Boolean(errors.dni)}
                                        helperText={touched.dni && errors.dni ? errors.dni : " "}
                                        sx={{
                                            mb: -2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="contactNumber"
                                        label="Teléfono"
                                        value={values.contactNumber}
                                        onChange={handleChange}
                                        sx={{
                                            mt: 2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="address"
                                        label="Domicilio"
                                        value={values.address}
                                        onChange={handleChange}
                                        sx={{
                                            mt: 2.8,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    {/* Disciplinas */}
                                    <FormControl variant="standard" fullWidth sx={{ mt: 2.5 }}>
                                        <InputLabel id="discipline-label">Disciplinas</InputLabel>
                                        <Select
                                            labelId="discipline-label"
                                            multiple
                                            value={values.disciplines}
                                            onChange={(event) => {
                                                const { value } = event.target;
                                                const next = typeof value === "string" ? value.split(",") : (value as string[]);
                                                setFieldValue("disciplines", next);
                                                setDiscipline(next);
                                            }}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                    {ensureStringArray(selected).map((v) => (
                                                        <Chip key={v} label={v} />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            {disciplines?.length ? (
                                                disciplines.map((item: any) => {
                                                    const label = item?.name ?? "";
                                                    return (
                                                        <MenuItem key={item?.id ?? label} value={label}>
                                                            <Checkbox checked={ensureStringArray(values.disciplines).includes(label)} />
                                                            <ListItemText primary={label} />
                                                        </MenuItem>
                                                    );
                                                })
                                            ) : (
                                                <MenuItem disabled>Cargando...</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    {/* SOLO ADMIN */}
                                    {isAdmin && (
                                        <>
                                            <FormControl variant="standard" fullWidth sx={{ mt: 2.5 }}>
                                                <InputLabel id="category-label">Categoría</InputLabel>
                                                <Select
                                                    labelId="category-label"
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                >
                                                    {categories?.map((c: any) => (
                                                        <MenuItem key={c.id} value={c.name}>
                                                            {c.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                variant="standard"
                                                fullWidth
                                                name="familyGroup"
                                                label="Grupo familiar (solo lectura)"
                                                value={values.familyGroup}
                                                disabled
                                                sx={{
                                                    mt: 2.5,
                                                    "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                                }}
                                            />
                                        </>
                                    )}

                                    {/* SOLO USER: resumen de estado */}
                                    {!isAdmin && (
                                        <>
                                            <TextField
                                                variant="standard"
                                                fullWidth
                                                name="category"
                                                label="Categoría"
                                                value={values.category}
                                                disabled
                                                sx={{
                                                    mt: 2.5,
                                                    "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                                }}
                                            />
                                            <TextField
                                                variant="standard"
                                                fullWidth
                                                name="blockade"
                                                label="Bloqueado"
                                                value={user?.blockade ? "Sí" : "No"}
                                                disabled
                                                sx={{
                                                    mt: 2.5,
                                                    "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                                }}
                                            />
                                        </>
                                    )}
                                </Grid>
                            </Grid>

                            {/* Botonera */}
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => onClose && onClose()}
                                        sx={{
                                            backgroundColor: "grey",
                                            "&:hover": { backgroundColor: "darkgrey" },
                                        }}
                                    >
                                        SALIR SIN CAMBIOS
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        disabled={!isValid || (!dirty && !hasChanges)}
                                        sx={{
                                            backgroundColor: isValid && (dirty || hasChanges) ? "green" : "lightgrey",
                                            "&:hover": {
                                                backgroundColor:
                                                    isValid && (dirty || hasChanges) ? "darkgreen" : "lightgrey",
                                            },
                                        }}
                                    >
                                        GUARDAR CAMBIOS
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

export default EditUserForm;
