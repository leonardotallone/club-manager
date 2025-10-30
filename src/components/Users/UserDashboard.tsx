import React, { useContext, useState, useEffect } from "react";
import {
  Fade,
  Box,
  Typography,
  Avatar,
  Divider,
  Stack,
  Chip,
  IconButton,
  Button,
  useMediaQuery,
  Modal,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { FeesContext } from "../../Context/FeesContext";
import { getAllUsersContext } from "../../Context/GetAllUsersContext";
import { updateUserProfileContext } from "../../Context/UpdateUserProfileContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material/styles";
import type { PieLabelRenderProps } from "recharts";

import DigitalCard from "./DigitalCard";
import EditUserForm from "../Admin/EditUserForm";
import AddFamilyForm from "./AddFamilyForm";
import EditFamilyForm from "./EditFamilyForm";


const UserDashboard = () => {
  const { loguedUserInformation } = useContext(getAllUsersContext);
  console.log(loguedUserInformation)
  const { setDocId } = useContext(updateUserProfileContext);

  const { breakdown } = useContext(FeesContext);

  const [openCard, setOpenCard] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditFamilyForm, setOpenEditFamilyForm] = useState(false)
 
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<any>(null);



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  useEffect(() => {
    if (loguedUserInformation?.id) {
      setDocId(loguedUserInformation.id);
    }
  }, [loguedUserInformation, setDocId]);


  if (!loguedUserInformation || !breakdown) return null;


  const palette = {
    primary: "#2E7D32",
    text: "#111",
  };

  const colors = [
    "#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b",
    "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2",
  ];

  const hasFamily =
    Array.isArray(loguedUserInformation.familyGroup) &&
    loguedUserInformation.familyGroup.length > 0;

  const norm = (s: any) => (s ?? "").toString().toLowerCase().trim();

  const getMemberFee = (member: any, idx: number): number => {
    if (member?.dni) {
      const byDni = breakdown.familiares.find((x: any) => x.dni === member.dni);
      if (byDni) return byDni.fee ?? 0;
    }
    const byName = breakdown.familiares.find(
      (x: any) => norm(x.name) === norm(member?.name)
    );
    if (byName) return byName.fee ?? 0;
    const byIndex = breakdown.familiares[idx];
    if (byIndex) return byIndex.fee ?? 0;
    return 0;
  };

  const chartData = [
    {
      name: `${loguedUserInformation.name} ${loguedUserInformation.lastName}`,
      value: breakdown.titular.fee,
    },
    ...(hasFamily
      ? loguedUserInformation.familyGroup.map((fm: any, idx: number) => ({
        name:
          `${fm.name ?? ""} ${fm.lastName ?? ""}`.trim() ||
          `Familiar ${idx + 1}`,
        value: getMemberFee(fm, idx),
      }))
      : []),
  ];

  const handleOpenCard = (userOrFamily: any) => {
    const isTitular =
      userOrFamily?.dni === loguedUserInformation.dni ||
      norm(userOrFamily?.name) === norm(loguedUserInformation.name);

    const fullData = isTitular
      ? loguedUserInformation
      : loguedUserInformation.familyGroup?.find(
        (f: any) =>
          f.dni === userOrFamily?.dni || norm(f.name) === norm(userOrFamily?.name)
      );

    const userToShow = fullData || loguedUserInformation;
    setSelectedUser(userToShow);
    setOpenCard(true);
  };

  const handleCloseCard = () => setOpenCard(false);

  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const handleOpenEditFamilyForm = (member: any) => {
    setSelectedFamilyMember(member);
    setOpenEditFamilyForm(true);
  };

  const handleCloseEditFamilyForm = () => setOpenEditFamilyForm(false)

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          mt: -5,
          px: { xs: 2, md: 8 },
          py: { xs: 3, md: 6 },
          color: palette.text,
          fontFamily: '"Outfit", sans-serif',
        }}
      >
        {/* 🧍 Titular */}
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="space-between"
          spacing={isMobile ? 3 : 5}
          sx={{ mb: isMobile ? 5 : 8 }}
        >
          <Stack
            direction={isMobile ? "column" : "row"}
            alignItems="center"
            spacing={isMobile ? 2 : 3}
            textAlign={isMobile ? "center" : "left"}
          >
            <Avatar
              src={
                loguedUserInformation.avatarURL ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              sx={{
                width: isMobile ? 80 : 96,
                height: isMobile ? 80 : 96,
                border: `2px solid ${palette.primary}`,
              }}
            />
            <Box>
              <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600 }}>
                {loguedUserInformation.name} {loguedUserInformation.lastName}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                DNI {loguedUserInformation.dni} • {loguedUserInformation.gender}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {loguedUserInformation.address}
              </Typography>
              <Stack
                direction="row"
                justifyContent={isMobile ? "center" : "flex-start"}
                spacing={1}
                sx={{ mt: 1 }}
              >
                <Chip
                  label={loguedUserInformation.category}
                  color="success"
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
                {loguedUserInformation.full && (
                  <Chip
                    label="PLENO"
                    variant="outlined"
                    sx={{
                      borderColor: palette.primary,
                      color: palette.primary,
                      fontWeight: 700,
                    }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>

          {/* Botones del titular */}
          <Stack direction="row" spacing={1.2} justifyContent="center" flexWrap="wrap">
            <IconButton
              onClick={() => handleOpenCard(loguedUserInformation)}
              sx={{
                color: "#444",
                border: "1px solid #444",
                borderRadius: "12px",
                p: 1.2,
                "&:hover": { bgcolor: palette.primary, color: "#fff" },
              }}
            >
              <BadgeOutlinedIcon fontSize={isMobile ? "medium" : "large"} />
            </IconButton>
            <IconButton
              onClick={handleOpenEditForm}
              sx={{
                color: "#444",
                border: "1px solid #444",
                borderRadius: "12px",
                p: 1.2,
                "&:hover": { bgcolor: palette.primary, color: "#fff" },
              }}
            >
              <EditRoundedIcon fontSize={isMobile ? "medium" : "large"} />
            </IconButton>
            <IconButton
              onClick={() =>
                console.log("🗑️ Eliminar titular y grupo familiar completo")
              }
              sx={{
                color: "#444",
                border: "1px solid #444",
                borderRadius: "12px",
                p: 1.2,
                "&:hover": { bgcolor: "#b71c1c", color: "#fff" },
              }}
            >
              <DeleteOutlineRoundedIcon fontSize={isMobile ? "medium" : "large"} />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ mb: isMobile ? 4 : 6 }} />

        {/* 👨‍👩‍👧 Grupo familiar + 📊 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 3 : 6,
          }}
        >
          {/* 👨‍👩‍👧 Grupo Familiar */}
          <Box sx={{ flex: isMobile ? "none" : "0 0 40%", width: "100%" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ fontWeight: 600, textAlign: "left" }}
              >
                Grupo Familiar
              </Typography>

              {/* ➕ Botón Agregar familiar */}
              <IconButton
                onClick={() => handleOpenAddForm()}
                sx={{
                  color: palette.primary,
                  border: `1px solid ${palette.primary}`,
                  borderRadius: "12px",
                  p: 1,
                  "&:hover": { bgcolor: palette.primary, color: "#fff" },
                }}
              >
                <PersonAddAltRoundedIcon />
              </IconButton>
            </Stack>

            {hasFamily ? (
              <Stack spacing={isMobile ? 1.5 : 2}>
                {loguedUserInformation.familyGroup.map((member: any, idx: number) => {
                  const fee = getMemberFee(member, idx);
                  return (
                    <Stack
                      key={member?.dni || member?.name || idx}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ borderBottom: "1px solid #e0e0e0", pb: 1.5 }}
                    >
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {member?.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#555" }}>
                          {member?.category}
                          {member?.full && (
                            <Typography
                              component="span"
                              sx={{ fontWeight: 700, color: palette.primary, ml: 0.5 }}
                            >
                              PLENO
                            </Typography>
                          )}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#777" }}>
                          {member?.disciplines?.join(", ") || "Sin disciplinas"}
                        </Typography>
                      </Box>

                      <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Typography
                          variant={isMobile ? "body1" : "h6"}
                          sx={{ fontWeight: 600, color: "#333" }}
                        >
                          ${fee.toLocaleString()}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => handleOpenCard(member)}
                          sx={{
                            color: "#444",
                            "&:hover": { bgcolor: "#f1f8f1", color: palette.primary },
                          }}
                        >
                          <BadgeOutlinedIcon fontSize="medium" />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditFamilyForm(member)}
                          sx={{
                            color: "#444",
                            "&:hover": { bgcolor: "#f1f8f1", color: palette.primary },
                          }}
                        >
                          <EditRoundedIcon fontSize="medium" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => console.log(`🗑️ Eliminar ${member?.name}`)}
                          sx={{
                            color: "#444",
                            "&:hover": { bgcolor: "#fbeaea", color: "#b71c1c" },
                          }}
                        >
                          <DeleteOutlineRoundedIcon fontSize="medium" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            ) : (
              <Box textAlign={isMobile ? "center" : "left"} mt={2}>
                <Typography variant="body1" sx={{ color: "#555", mb: 2, fontWeight: 500 }}>
                  Aún no se registraron familiares
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonAddAltRoundedIcon />}
                  sx={{
                    bgcolor: palette.primary,
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "12px",
                    px: 3,
                    py: 1,
                    "&:hover": { bgcolor: "#1B5E20" },
                  }}
                  onClick={() => handleOpenAddForm()}
                >
                  Registrar familiar
                </Button>
              </Box>
            )}
          </Box>

          {/* 📊 Donut */}
          <Box sx={{ flex: isMobile ? "none" : "0 0 55%", width: "100%" }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ fontWeight: 600, color: palette.text, mb: 1 }}
            >
              Distribución de Cuotas
            </Typography>
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={chartData}
                  innerRadius={isMobile ? 55 : 80}
                  outerRadius={isMobile ? 110 : 120}
                  labelLine={false}
                  label={(props: PieLabelRenderProps) => {
                    const percent =
                      typeof props.percent === "number" ? props.percent * 100 : 0;
                    return `${percent.toFixed(0)}%`;
                  }}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* 🧾 Leyenda */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection:
                  chartData.length <= 3
                    ? "row"
                    : isMobile
                      ? "column"
                      : chartData.length > 6
                        ? "column"
                        : "row",
                flexWrap: chartData.length > 3 ? "wrap" : "nowrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.2,
                textAlign: "center",
              }}
            >
              {chartData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    minWidth:
                      chartData.length > 6
                        ? "45%"
                        : chartData.length > 3
                          ? "30%"
                          : "auto",
                    justifyContent: chartData.length > 3 ? "flex-start" : "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: colors[index % colors.length],
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mt: 2, textAlign: "center" }}
            >
              Total: ${breakdown.total.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 🪪 Modal carnet */}
      <Modal
        open={openCard}
        onClose={handleCloseCard}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.55)",
          p: 2,
        }}
      >
        <Fade in={openCard} timeout={{ enter: 1000, exit: 500 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 740,
              borderRadius: isMobile ? "24px" : "20px",
              overflow: "hidden",
            }}
          >
            <DigitalCard
              key={selectedUser?.dni || selectedUser?.name}
              user={selectedUser}
            />
          </Box>
        </Fade>
      </Modal>

      {/* 📝 Modal Edit Form */}
      <Modal
        open={openEditForm}
        onClose={handleCloseEditForm}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.55)",
          p: 2,
        }}
      >
        <Fade in={openEditForm} timeout={{ enter: 1000, exit: 500 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 740,
              borderRadius: isMobile ? "24px" : "20px",
              overflow: "hidden",
            }}
          >
            <EditUserForm user={loguedUserInformation} onClose={handleCloseEditForm} />
          </Box>
        </Fade>
      </Modal>

      {/* 📝 Modal Add Family Form */}
      <Modal
        open={openAddForm}
        onClose={handleCloseAddForm}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.55)",
          p: 2,
        }}
      >
        <Fade in={openAddForm} timeout={{ enter: 1000, exit: 500 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 740,
              borderRadius: isMobile ? "24px" : "20px",
              overflow: "hidden",
            }}
          >
            <AddFamilyForm onClose={handleCloseAddForm} />
          </Box>
        </Fade>
      </Modal>

      {/* 📝 Modal Edit Family Form */}
      <Modal
        open={openEditFamilyForm}
        onClose={handleCloseEditFamilyForm}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.55)",
          p: 2,
        }}
      >
        <Fade in={openEditFamilyForm} timeout={{ enter: 1000, exit: 500 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 740,
              borderRadius: isMobile ? "24px" : "20px",
              overflow: "hidden",
            }}
          >
           
            <EditFamilyForm user={selectedFamilyMember}
              onClose={handleCloseEditFamilyForm} />

          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UserDashboard;
