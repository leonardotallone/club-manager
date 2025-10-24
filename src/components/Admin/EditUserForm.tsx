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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

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
    birthDate: Dayjs;
    dni: string;
    contactNumber: string;
    avatarURL: string;
    gender: string;
    email: string;
    admin: boolean;
    disciplines: object;
    category: string;
    full: boolean;
    blockade: boolean;
    familyGroup: object;
    applicationDate: Dayjs;
}

type EditUserFormProps = {
    user: any;
    mode?: "admin" | "user";
};

const validationSchema = Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    lastName: Yup.string().required("Campo obligatorio"),
    dni: Yup.string().matches(/^\d+$/, "Solo números").required("Campo obligatorio"),
    contactNumber: Yup.string().required("Campo obligatorio"),
});

const EditUserForm: React.FC<EditUserFormProps> = ({ user, mode = "user" }) => {
    const { categories } = useContext(getAllCategoriesContext);
    const { disciplines } = useContext(getAllDisciplinesContext);
    const { setUpdateUserData, setDocId } = useContext(updateUserProfileContext);
    const { setOpenAdd, setOpenEdit } = useContext(controlModalsContext);

    const [discipline, setDiscipline] = useState<string[]>(user.disciplines || []);
    const [lockUser, setLockUser] = useState<boolean>(user.blockade);
    const [full, setFull] = useState<boolean>(user.full);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const genders = ["Masculino", "Femenino", "Otro"];
    const navigate = useNavigate();
    const isAdmin = mode === "admin";

    useEffect(() => {
        if (user?.id) setDocId(user.id);
    }, [user, setDocId]);

    const handleLockUser = () => {
        setLockUser((prev) => !prev);
        setHasChanges(true);
    };

    const handleDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const { value } = event.target;
        setDiscipline(typeof value === "string" ? value.split(",") : value);
        setHasChanges(true);
    };

    const handleSubmit = (values: SignUpFormValues) => {
        const editedUser = {
            ...values,
            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
            disciplines: discipline,
            blockade: lockUser,
            full,
        };
        setUpdateUserData(editedUser);
        setHasChanges(false);
    };

    const familyGroupNames =
        user.familyGroup?.map((m: any) => `${m.name} ${m.lastName}`).join(", ") || "";

    const uniformMargin = { mt: 2.5 };

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
                height: { xs: "100vh", md: "auto" },     // 📏 ocupa toda la altura solo en mobile
                overflowY: { xs: "auto", md: "visible" }, // ✅ scroll solo en mobile
                WebkitOverflowScrolling: "touch",         // 🧭 scroll fluido iOS
                py: { xs: 3, md: 5 },
                px: { xs: 2, md: 0 },
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    pb: { xs: 10, md: 5 }, // 📱 más margen inferior en mobile
                    pt: { xs: 1, md: 2 },
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 4,
                        fontWeight: 700,
                        textAlign: "center",
                        color: "#333",
                        letterSpacing: 0.5,
                    }}
                >
                    Edición de Usuario
                </Typography>

                <Formik<SignUpFormValues>
                    enableReinitialize
                    initialValues={{
                        name: user.name || "",
                        lastName: user.lastName || "",
                        address: user.address || "",
                        birthDate: user.birthDate?.seconds
                            ? dayjs(user.birthDate.seconds * 1000)
                            : dayjs(),
                        dni: user.dni || "",
                        contactNumber: user.contactNumber || "",
                        avatarURL: user.avatarURL || "",
                        gender: user.gender || "",
                        email: user.email || "",
                        admin: user.admin || false,
                        disciplines: user.disciplines || {},
                        category:
                            categories?.find((c: any) => c.name === user.category)?.name || "",
                        full: user.full,
                        blockade: lockUser,
                        familyGroup: familyGroupNames,
                        applicationDate: user.applicationDate?.seconds
                            ? dayjs(user.applicationDate.seconds * 1000)
                            : dayjs(),
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched }) => (
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
                                            onChange={(newValue) =>
                                                handleChange({
                                                    target: { name: "birthDate", value: newValue },
                                                })
                                            }
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

                                    <FormControl
                                        variant="standard"
                                        fullWidth
                                        sx={{
                                            mt: 2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    >
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

                                    <FormControl
                                        fullWidth
                                        variant="standard"
                                        sx={{
                                            mt: 2.5,
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                            "& .MuiSelect-icon": { color: "green" },
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                        }}
                                    >
                                        <InputLabel id="discipline-label">Disciplinas</InputLabel>
                                        <Select
                                            labelId="discipline-label"
                                            multiple
                                            value={discipline}
                                            onChange={handleDiscipline}
                                            renderValue={(selected) => (
                                                <Box sx={{
                                                    display: "flex", flexWrap: "wrap", gap: 1, 
                                                    "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                                }}>
                                                    {(selected as string[]).map((v) => (
                                                        <Chip key={v} label={v} />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            {disciplines?.length > 0 ? (
                                                disciplines.map((item: any) => (
                                                    <MenuItem key={item.id} value={item.name}>
                                                        <Checkbox checked={discipline.indexOf(item.name) > -1} />
                                                        <ListItemText primary={item.name} />
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>Cargando...</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>

                            {/* Botonera */}
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() =>
                                            navigate(isAdmin ? "/admin-users-list" : "/user-dashboard")
                                        }
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
                                        disabled={!hasChanges}
                                        sx={{
                                            backgroundColor: hasChanges ? "green" : "lightgrey",
                                            "&:hover": {
                                                backgroundColor: hasChanges ? "darkred" : "lightgrey",
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
